<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EnrollmentDosenSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('enrollment_dosens')->insert([
            [
                'id_mata_kuliah' => 1,
                'id_dosen' => 1,
                'id_tahun_ajaran' => 4
            ],
            [
                'id_mata_kuliah' => 2,
                'id_dosen' => 2,
                'id_tahun_ajaran' => 4
            ],
            [
                'id_mata_kuliah' => 3,
                'id_dosen' => 3,
                'id_tahun_ajaran' => 4
            ],
        ]);
    }
    
}
