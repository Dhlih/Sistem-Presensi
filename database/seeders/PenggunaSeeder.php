<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class PenggunaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('penggunas')->insert([
            [
                'username' => 'dhlih',
                'password' => Hash::make("password"),
                'jenis_role' => "mahasiswa"
            ],
            [
                'username' => 'prayit',
                'password' => Hash::make("password"),
                'jenis_role' => "dosen"
            ],
        ]);
    }
}
