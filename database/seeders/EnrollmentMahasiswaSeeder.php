<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EnrollmentMahasiswaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('enrollment_mahasiswas')->insert([
            [
                'id_mahasiswa' => 1,
                'id_mata_kuliah' => 3,
                'id_tahun_ajaran' => 1
            ],
            [
                'id_mahasiswa' => 1,
                'id_mata_kuliah' => 2,
                'id_tahun_ajaran' => 1
            ],
            [
                'id_mahasiswa' => 1,
                'id_mata_kuliah' => 1,
                'id_tahun_ajaran' => 1
            ],
        ]);
    }
}
