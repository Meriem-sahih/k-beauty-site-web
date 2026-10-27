
<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\OrderController;

// Produits et catégories : accessibles à tous
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{product}', [ProductController::class, 'show']);

Route::get('/categories', [CategoryController::class, 'index']);

// Authentification
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Routes réservées aux utilisateurs connectés
Route::middleware('auth:sanctum')->group(function () {

    // Commandes du client
    Route::get('/orders', [OrderController::class, 'index']);
    Route::get('/orders/{id}', [OrderController::class, 'show']);
    Route::post('/orders', [OrderController::class, 'store']);

    // Gestion des commandes : Admin uniquement
    Route::middleware('admin')->group(function () {
        Route::get('/admin/orders', [OrderController::class, 'adminIndex']);
        Route::put('/admin/orders/{id}/status', [OrderController::class, 'updateStatus']);

        // Gestion des produits : Admin uniquement
        Route::post('/admin/products', [ProductController::class, 'store']);
        Route::put('/admin/products/{product}', [ProductController::class, 'update']);
        Route::delete('/admin/products/{product}', [ProductController::class, 'destroy']);
    });
});
