<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $orders = Order::with('items.product')
            ->where('user_id', $request->user()->id)
            ->latest()
            ->get();

        return response()->json($orders);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|integer|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        try {
            $order = DB::transaction(function () use ($validated, $request) {

                $total = 0;
                $orderItems = [];

                foreach ($validated['items'] as $item) {

                    $product = Product::findOrFail($item['product_id']);

                    if ($product->stock < $item['quantity']) {
                        abort(
                            422,
                            "Stock insuffisant pour le produit : {$product->name}"
                        );
                    }

                    $price = $product->price;
                    $quantity = $item['quantity'];

                    $total += $price * $quantity;

                    $orderItems[] = [
                        'product_id' => $product->id,
                        'quantity' => $quantity,
                        'price' => $price,
                    ];

                    $product->decrement('stock', $quantity);
                }

                $order = Order::create([
                    'user_id' => $request->user()->id,
                    'total' => $total,
                    'status' => 'pending',
                ]);

                foreach ($orderItems as $item) {
                    $order->items()->create($item);
                }

                return $order;
            });

            return response()->json([
                'message' => 'Commande créée avec succès',
                'order' => $order->load('items.product'),
            ], 201);

        } catch (\Exception $e) {

            return response()->json([
                'message' => 'Impossible de créer la commande',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function show(Request $request, $id)
{
    $order = Order::with('items.product')
        ->where('user_id', $request->user()->id)
        ->findOrFail($id);

    return response()->json($order);
}

public function adminIndex()
{
    $orders = Order::with(['user', 'items.product'])
        ->latest()
        ->get();

    return response()->json($orders);
}

public function updateStatus(Request $request, $id)
{
    $validated = $request->validate([
        'status' => 'required|in:pending,shipped,delivered,cancelled',
    ]);

    $order = Order::findOrFail($id);

    $order->update([
        'status' => $validated['status'],
    ]);

    return response()->json([
        'message' => 'Statut de la commande mis à jour avec succès',
        'order' => $order->load(['user', 'items.product']),
    ]);
}
}