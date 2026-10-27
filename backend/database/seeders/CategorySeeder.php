<?php

namespace Database\Seeders;
use App\Models\Category;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        Category::create([
            'name' => 'Soins des cheveux',
            'description' => 'Produits pour prendre soin des cheveux'
        ]);

        Category::create([
            'name' => 'Soins du corps',
            'description' => 'Produits pour prendre soin du corps'
        ]);

        Category::create([
            'name' => 'Soins de la peau',
            'description' => 'Produits pour prendre soin de la peau'
        ]);
    }
}