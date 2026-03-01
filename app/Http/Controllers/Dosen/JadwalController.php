<?php

namespace App\Http\Controllers\Dosen;

use App\Http\Controllers\Controller;
use App\Models\EnrollmentDosen;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class JadwalController extends Controller
{
    public function show_jadwal_kuliah()
    {
        $pengguna = Auth::user()->load("dosen");

        $enrollments = EnrollmentDosen::with([
            "mata_kuliah",
            "jadwal"
        ])->where("id_dosen", $pengguna->dosen->id_dosen)->get();

        $list_hari = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];
        $jadwal_reguler = $enrollments->flatMap(function ($enrollment) use ($list_hari) {
            return $enrollment->jadwal->map(function ($jadwal) use ($enrollment, $list_hari) {
                return [
                    "id_jadwal" => $jadwal->id_jadwal,
                    "hari" => $list_hari[$jadwal->hari - 1],
                    "jam_mulai" => $jadwal->jam_mulai,
                    "jam_selesai" => $jadwal->jam_selesai,
                    "mata_kuliah" => $enrollment->mata_kuliah->nama,
                    "kelas" => $jadwal->kelas,
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
            return $enrollment?->jadwal
                ->where('hari', $hari_ini)
                ->map(function ($jadwal) use ($enrollment, $list_hari) {
                    $kode_sudah_dibuat = $jadwal->sesi_qr->where(fn($sesi) => $sesi->created_at->isToday())->isNotEmpty();
                    return [
                        "id_jadwal" => $jadwal->id_jadwal,
                        "mata_kuliah" => $enrollment->mata_kuliah->nama,
                        "hari" => $list_hari[$jadwal->hari - 1],
                        "ruangan" => $jadwal->ruangan,
                        "kelas" => $jadwal->kelas,
                        "jam_mulai" => $jadwal->jam_mulai,
                        "jam_selesai" => $jadwal->jam_selesai,
                        "kode_sudah_dibuat" => $kode_sudah_dibuat,
                    ];
                });
        });

        return Inertia::render("Dosen/JadwalKuliah", [
            "data" => [
                "jadwal_reguler" => $jadwal_reguler,
                "jadwal_hari_ini" => $jadwal_hari_ini
            ]
        ]);
    }
}
