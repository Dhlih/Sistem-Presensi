<?php

namespace App\Http\Controllers\Mahasiswa;

use App\Http\Controllers\Controller;
use App\Models\EnrollmentMahasiswa;
use App\Models\TahunAjaran;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class RiwayatController extends Controller
{
    public function show_riwayat_presensi()
    {
        $pengguna = Auth::user()->load("mahasiswa");
        $tahun_ajaran = TahunAjaran::latest()->first();

        $enrollments = EnrollmentMahasiswa::with(["riwayat_scan.sesi_qr.jadwal.enrollment_dosen", "enrollment_dosen.mata_kuliah"])->where("id_mahasiswa", $pengguna->mahasiswa->id_mahasiswa)->where("id_tahun_ajaran", $tahun_ajaran->id_tahun_ajaran)->get();
        $riwayat_presensi = $enrollments->flatMap(function ($enrollment) {
            return $enrollment->riwayat_scan->map(function ($riwayat_scan) use ($enrollment) {     
                return [
                    "mata_kuliah" => $enrollment->enrollment_dosen->mata_kuliah->nama,
                    "status_kehadiran" => $riwayat_scan->status_kehadiran,
                    "tanggal" => $riwayat_scan->created_at->translatedFormat('d M Y'),
                    "jam" => $riwayat_scan->created_at->format('H:i'),
                    "ruangan" => $riwayat_scan->sesi_qr->jadwal->ruangan
                ];
            });
        })->sortByDesc('tanggal')->values(); // Urutkan agar yang terbaru di atas;

        // dd($enrollments->toArray());

        return Inertia::render("Mahasiswa/RiwayatPresensi", ["data" => ["riwayat_presensi" => $riwayat_presensi]]);
    }
}
