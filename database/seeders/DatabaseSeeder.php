<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            MataKuliahSeeder::class,
            TahunAjaranSeeder::class,
            PenggunaSeeder::class,
            DosenSeeder::class,
            MahasiswaSeeder::class,
            EnrollmentDosenSeeder::class,
            EnrollmentMahasiswaSeeder::class,
            JadwalSeeder::class
        ]);
    }
}
