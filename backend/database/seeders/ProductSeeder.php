<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        // Soins de la peau
        Product::create([
            'category_id' => 3,
            'name' => 'Anua Heartleaf 77% Soothing Toner',
            'description' => 'Toner apaisant à base de Heartleaf.',
            'price' => 189,
            'stock' => 20,
            'image' => 'anua-toner.jpg',
        ]);

        Product::create([
            'category_id' => 3,
            'name' => 'Anua Heartleaf Cleansing Oil',
            'description' => 'Huile nettoyante douce pour le visage.',
            'price' => 219,
            'stock' => 15,
            'image' => 'anua-cleansing-oil.jpg',
        ]);

        Product::create([
            'category_id' => 3,
            'name' => 'Dr. Althea 345 Relief Cream',
            'description' => 'Crème hydratante et apaisante.',
            'price' => 249,
            'stock' => 12,
            'image' => 'dr-althea-345.jpg',
        ]);

        Product::create([
            'category_id' => 3,
            'name' => 'SKIN1004 Madagascar Centella Ampoule',
            'description' => 'Ampoule apaisante à base de Centella Asiatica.',
            'price' => 199,
            'stock' => 18,
            'image' => 'skin1004-ampoule.jpg',
        ]);

        Product::create([
            'category_id' => 3,
            'name' => 'COSRX Advanced Snail 96 Mucin Essence',
            'description' => 'Essence hydratante à base de mucine d’escargot.',
            'price' => 199,
            'stock' => 25,
            'image' => 'cosrx-snail.jpg',
        ]);

        Product::create([
            'category_id' => 3,
            'name' => 'Beauty of Joseon Relief Sun SPF50+',
            'description' => 'Protection solaire légère SPF50+.',
            'price' => 169,
            'stock' => 30,
            'image' => 'boj-relief-sun.jpg',
        ]);

        Product::create([
            'category_id' => 3,
            'name' => 'numbuzin No.5 Vitamin Concentrated Serum',
            'description' => 'Sérum concentré aux vitamines.',
            'price' => 189,
            'stock' => 16,
            'image' => 'numbuzin-no5.jpg',
        ]);

        Product::create([
            'category_id' => 3,
            'name' => 'medicube Zero Pore Pad',
            'description' => 'Pads pour le soin et le nettoyage de la peau.',
            'price' => 229,
            'stock' => 14,
            'image' => 'medicube-zero-pore.jpg',
        ]);

        // Soins des cheveux
        Product::create([
            'category_id' => 1,
            'name' => 'Shiseido Fino Premium Touch Hair Mask',
            'description' => 'Masque nourrissant pour les cheveux.',
            'price' => 149,
            'stock' => 20,
            'image' => 'fino-hair-mask.jpg',
        ]);

        Product::create([
            'category_id' => 1,
            'name' => 'Shiseido Fino Premium Touch Shampoo',
            'description' => 'Shampooing nourrissant pour les cheveux.',
            'price' => 159,
            'stock' => 18,
            'image' => 'fino-shampoo.jpg',
        ]);

        Product::create([
            'category_id' => 1,
            'name' => 'Hada Labo Hair Treatment',
            'description' => 'Soin hydratant pour les cheveux.',
            'price' => 139,
            'stock' => 15,
            'image' => 'hada-labo-hair.jpg',
        ]);

        // Soins du corps
        Product::create([
            'category_id' => 2,
            'name' => 'APLB Glutathione Niacinamide Body Lotion',
            'description' => 'Lotion hydratante pour le corps.',
            'price' => 129,
            'stock' => 20,
            'image' => 'aplb-body-lotion.jpg',
        ]);

        Product::create([
            'category_id' => 2,
            'name' => 'Beauty of Joseon Apricot Blossom Peeling Gel',
            'description' => 'Gel exfoliant doux pour la peau.',
            'price' => 159,
            'stock' => 17,
            'image' => 'boj-peeling-gel.jpg',
        ]);

        Product::create([
            'category_id' => 2,
            'name' => 'SKIN1004 Centella Body Cream',
            'description' => 'Crème hydratante et apaisante pour le corps.',
            'price' => 149,
            'stock' => 13,
            'image' => 'skin1004-body-cream.jpg',
        ]);
    }
}