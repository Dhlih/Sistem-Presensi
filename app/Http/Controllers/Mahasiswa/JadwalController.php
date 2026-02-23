<?php

namespace App\Http\Controllers\Mahasiswa;

use App\Http\Controllers\Controller;
use App\Models\EnrollmentMahasiswa;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class JadwalController extends Controller
{
    public function show_jadwal_kuliah()
    {
        $pengguna = Auth::user()->load("mahasiswa");

        $enrollments = EnrollmentMahasiswa::with([
            "enrollment_dosen.mata_kuliah",
            "enrollment_dosen.dosen",
            "enrollment_dosen.jadwal"
        ])
            ->where("id_mahasiswa", $pengguna->mahasiswa->id_mahasiswa)
            ->get();

        $list_hari = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];
        $jadwal_reguler = $enrollments->flatMap(function ($enrollment) use ($list_hari) {
            return $enrollment->enrollment_dosen->jadwal->map(function ($jadwal) use ($enrollment, $list_hari) {
                return [
                    "hari" => $list_hari[$jadwal->hari - 1],
                    "jam_mulai" => $jadwal->jam_mulai,
                    "jam_selesai" => $jadwal->jam_selesai,
                    "mata_kuliah" => $enrollment->enrollment_dosen->mata_kuliah->nama,
                    "dosen" => $enrollment->enrollment_dosen->dosen->nama,
                    "ruangan" => $jadwal->ruangan,
                ];
            });
        })
            ->sortBy([
                ['hari', 'desc'],
                ['jam_mulai', 'asc'],
            ])
            ->values();

        $hari_ini = now()->dayOfWeekIso;

        $jadwal_hari_ini = $enrollments->flatMap(function ($enrollment) use ($hari_ini, $list_hari) {
            return $enrollment?->enrollment_dosen?->jadwal
                ->where('hari', $hari_ini)
                ->map(function ($jadwal) use ($enrollment, $list_hari) {
                    return [
                        "mata_kuliah" => $enrollment->enrollment_dosen->mata_kuliah->nama,
                        "dosen" => $enrollment->enrollment_dosen->dosen->nama,
                        "hari" => $list_hari[$jadwal->hari - 1],
                        "ruangan" => $jadwal->ruangan,
                        "jam_mulai" => $jadwal->jam_mulai,
                        "jam_selesai" => $jadwal->jam_selesai,
                    ];
                });
        });

        // dd($jadwal_hari_ini->toArray());

        return Inertia::render("Mahasiswa/JadwalKuliah", [
            "data" => [
                "jadwal_reguler" => $jadwal_reguler,
                "jadwal_hari_ini" => $jadwal_hari_ini
            ]
        ]);
    }
}
