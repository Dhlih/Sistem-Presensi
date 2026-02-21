<?php

namespace App\Http\Controllers\Dosen;

use App\Http\Controllers\Controller;
use App\Models\EnrollmentDosen;
use App\Models\TahunAjaran;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function show_dashboard(Request $request)
    {
        $pengguna = Auth::user()->load("dosen");
        $tahun_ajaran  = TahunAjaran::latest()->first();
        $enrollments = EnrollmentDosen::with(["jadwal.sesi_qr", "enrollment_mahasiswa"])
            ->where("id_dosen", $pengguna->dosen->id_dosen)
            ->where("id_tahun_ajaran", $tahun_ajaran->id_tahun_ajaran)
            ->get();

        $absen_dibuka = $enrollments
            ->flatMap->jadwal
            ->flatMap->sesi_qr
            ->count();

        $mahasiswa_diajar = $enrollments->flatMap->enrollment_mahasiswa->count();
        $mata_kuliah_diajar = $enrollments->count();
        $kelas_diajar = $enrollments->flatMap->jadwal->pluck("kelas")->unique()->count();

        return Inertia::render("Dosen/Dashboard", ["data" => [
            "tahun_ajaran" => $tahun_ajaran->tahun,
            "semester" => $tahun_ajaran->semester,
            "absen_dibuka" => $absen_dibuka,
            "mahasiswa_diajar" => $mahasiswa_diajar,
            "mata_kuliah_diajar" => $mata_kuliah_diajar,
            "kelas_diajar" => $kelas_diajar
        ]]);
    }
}
