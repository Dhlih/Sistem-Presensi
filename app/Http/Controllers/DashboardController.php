<?php

namespace App\Http\Controllers;

use App\Models\EnrollmentMahasiswa;
use App\Models\TahunAjaran;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function show_dashboard(Request $request)
    {
        $pengguna = Auth::user()->load("mahasiswa");
        $tahun_ajaran  = TahunAjaran::latest()->first();
        $enrollments = EnrollmentMahasiswa::with("mata_kuliah")->where("id_tahun_ajaran", $tahun_ajaran->id_tahun_ajaran)->where("id_mahasiswa", $pengguna->mahasiswa->id_mahasiswa)->get();

        $jumlah_sks = $enrollments->map(function ($enrollment) {
            return $enrollment->mata_kuliah->sks ?? 0;
        })->sum();
        $jumlah_mata_kuliah = $enrollments->count();

        return Inertia::render("Dashboard", ["data" => [
            "jumlah_mata_kuliah" => $jumlah_mata_kuliah,
            "jumlah_sks" => $jumlah_sks,
            "tahun_ajaran" => $tahun_ajaran->tahun,
            "semester" => $tahun_ajaran->semester
        ]]);
    }
}
