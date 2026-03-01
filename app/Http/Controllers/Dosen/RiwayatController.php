<?php

namespace App\Http\Controllers\Dosen;

use App\Http\Controllers\Controller;
use App\Models\EnrollmentDosen;
use App\Models\TahunAjaran;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class RiwayatController extends Controller
{
    public function show_riwayat_presensi() {
        $pengguna = Auth::user()->load("dosen");
        $tahun_ajaran = TahunAjaran::latest()->first();
        $enrollments = EnrollmentDosen::with(["jadwal.sesi_qr.riwayat_scan", "mata_kuliah"])->where("id_dosen", $pengguna->dosen->id_dosen)->where("id_tahun_ajaran", $tahun_ajaran->id_tahun_ajaran)->get();

        // dd($enrollments->toArray());

        $riwayat_presensi = $enrollments->flatMap(function($enrollment) {
            return $enrollment->jadwal->flatMap(function ($jadwal) use ($enrollment) {
                return $jadwal->sesi_qr->map(function ($sesi_qr) use ($enrollment, $jadwal) {
                    return [
                        "id_presensi"     => $sesi_qr->id_sesi_qr,
                        "mata_kuliah" => $enrollment->mata_kuliah->nama,
                        "jumlah_hadir" => $sesi_qr->riwayat_scan->count() ?? 0,
                        "tanggal"         => $sesi_qr->created_at->translatedFormat('d M Y'), 
                        "jam"             => $sesi_qr->created_at->format('H:i'), 
                        "kelas" => $jadwal->kelas
                    ];
                });
            });
        })->sortByDesc('tanggal')->values(); // Urutkan agar yang terbaru di atas

        // dd($riwayat_presensi->toArray());

        return Inertia::render("Dosen/RiwayatPresensi", ["data" => ["riwayat_presensi" => $riwayat_presensi]]);
    }
}
