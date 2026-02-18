<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TahunAjaranSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('tahun_ajarans')->insert([
            [
                'tahun' => '2024/2025',
                'semester' => "Ganjil",
                'created_at' => '2024-07-01 00:00:00'
            ],
            [
                'tahun' => '2024/2025',
                'semester' => "Genap",
                'created_at' => '2025-01-01 00:00:00'
            ],
            [
                'tahun' => '2025/2026',
                'semester' => "Ganjil",
                'created_at' => '2025-07-01 00:00:00'
            ],
            [
                'tahun' => '2025/2026',
                'semester' => "Genap",
                'created_at' => '2026-01-01 00:00:00'
            ]
        ]);
    }
}
