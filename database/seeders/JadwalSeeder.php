<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class JadwalSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('jadwals')->insert([
            [
                'id_enrollment_dosen' => 1,
                'hari' => 2,
                'jam_mulai' => '12:30:00',
                'jam_selesai' => '13:30:00',
                'ruangan' => "SB II / 03",
                'kelas' => 'TI-2B'
            ],
            [
                'id_enrollment_dosen' => 2,
                'hari' => 3,
                'jam_mulai' => '12:30:00',
                'jam_selesai' => '13:30:00',
                'ruangan' => "SB II / 03",
                'kelas' => 'TI-1B'
            ],
            [
                'id_enrollment_dosen' => 3,
                'hari' => 4,
                'jam_mulai' => '12:30:00',
                'jam_selesai' => '13:30:00',
                'ruangan' => "SB II / 03",
                'kelas' => 'TI-3B'
            ],
            [
                'id_enrollment_dosen' => 1,
                'hari' => 7,
                'jam_mulai' => '12:00:00',
                'jam_selesai' => '13:30:00',
                'ruangan' => "SB II / 03",
                'kelas' => 'IK-2B'
            ],
        ]);
    }
}
