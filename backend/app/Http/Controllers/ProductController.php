<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    // Afficher tous les produits
    public function index()
    {
        return response()->json(
            Product::with('category')->get()
        );
    }

    // Ajouter un produit
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'image' => 'nullable|string|max:255',
            'category_id' => 'required|exists:categories,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Vérifiez les informations du produit.',
                'errors' => $validator->errors(),
            ], 422);
        }

        $product = Product::create($validator->validated());

        return response()->json([
            'message' => 'Produit ajouté avec succès.',
            'product' => $product->load('category'),
        ], 201);
    }

    // Afficher un seul produit
    public function show(Product $product)
    {
        return response()->json($product->load('category'));
    }

    // Modifier un produit
    public function update(Request $request, Product $product)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|nullable|string',
            'price' => 'sometimes|required|numeric|min:0',
            'stock' => 'sometimes|required|integer|min:0',
            'image' => 'sometimes|nullable|string|max:255',
            'category_id' => 'sometimes|required|exists:categories,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Vérifiez les informations du produit.',
                'errors' => $validator->errors(),
            ], 422);
        }

        $product->update($validator->validated());

        return response()->json([
            'message' => 'Produit modifié avec succès.',
            'product' => $product->load('category'),
        ]);
    }

    // Supprimer un produit
    public function destroy(Product $product)
    {
        $product->delete();

        return response()->json([
            'message' => 'Produit supprimé avec succès.',
        ]);
    }
}
