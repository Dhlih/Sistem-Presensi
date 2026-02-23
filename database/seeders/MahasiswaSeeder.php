<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MahasiswaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('mahasiswas')->insert([
            'id_pengguna' => 1,
            'nama' => "Ifad Yusuf",
            'nim' => 123456,
            'prodi' => 'TRK',
            'kelas' => 'TI-2B'
        ]);
    }
}
