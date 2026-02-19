<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DosenSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('dosens')->insert([
            [
                'id_pengguna' => 2,
                'nama' => 'Prayitno',
                'nip' => 1234,
                'prodi' => "TRK"
            ],
            [
                'id_pengguna' => 3,
                'nama' => 'Budi',
                'nip' => 4321,
                'prodi' => "TRK"
            ],
            [
                'id_pengguna' => 4,
                'nama' => 'Bambang',
                'nip' => 2345,
                'prodi' => "TRK"
            ],
        ]);
    }
}
