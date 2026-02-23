<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SesiQrSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('sesi_qrs')->insert([
            [
                'id_jadwal' => 1,
                'waktu_mulai' => '2026-02-21 08:00:00',
                'waktu_berakhir' => '2026-02-21 08:30:00',
                'qr_token' => 'abcdefg'
            ],
            [
                'id_jadwal' => 1,
                'waktu_mulai' => '2026-02-21 08:00:00',
                'waktu_berakhir' => '2026-02-21 08:00:00',
                'qr_token' => 'abcdefg'
            ],
            [
                'id_jadwal' => 2,
                'waktu_mulai' => '2026-02-21 10:00:00',
                'waktu_berakhir' => '2026-02-21 10:30:00',
                'qr_token' => 'abcdefg'
            ],
            [
                'id_jadwal' => 2,
                'waktu_mulai' => '2026-02-21 10:00:00',
                'waktu_berakhir' => '2026-02-21 10:30:00',
                'qr_token' => 'abcdefg'
            ],
        ]);
    }
}
