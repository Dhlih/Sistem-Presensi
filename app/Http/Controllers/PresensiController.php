<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\EnrollmentMahasiswa;
use App\Models\Jadwal;
use App\Models\RiwayatScan;
use App\Models\SesiQr;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Str;


class PresensiController extends Controller
{
    public function show_presensi(Jadwal $jadwal)
    {
        $sesi_aktif = $jadwal->sesi_qr()
            ->where('waktu_berakhir', '>', now())
            ->orderBy('waktu_mulai', 'desc')
            ->first();

        $mata_kuliah = $jadwal->enrollment_dosen->mata_kuliah->nama;

        $daftar_mahasiswa = $jadwal->enrollment_dosen
            ->enrollment_mahasiswa()
            ->whereHas('mahasiswa', function ($q) use ($jadwal) {
                $q->where('kelas', $jadwal->kelas);
            })
            ->with('mahasiswa')
            ->get();

        return Inertia::render("Dosen/Presensi", ["data" => [
            "sesi_aktif" => $sesi_aktif,
            "daftar_mahasiswa" => $daftar_mahasiswa,
            "mata_kuliah" => $mata_kuliah,
            "kelas" => $jadwal->kelas
        ]]);
    }

    public function generate_qr_code(Request $request, $jadwal)
    {
        // $request->validate([
        //     "waktu_mulai" => "string",
        //     "waktu_berakhir" => "string"
        // ]);

        SesiQr::create([
            "id_jadwal" => intval($jadwal),
            'waktu_mulai' => now(),
            'waktu_berakhir' => now()->addMinutes(15),
            'qr_token' => Str::random(40),
        ]);

        return redirect("/dosen/jadwal/{$jadwal}/presensi");
    }

    public function scan_qr_code(Request $request, $token)
    {
        $sesi_qr = SesiQr::where("qr_token", $token)->first();
        $pengguna = Auth::user()->load("mahasiswa");

        $enrollment = EnrollmentMahasiswa::where('id_mahasiswa', $pengguna->mahasiswa->id_mahasiswa)
            ->where('id_enrollment_dosen', $sesi_qr->jadwal->id_enrollment_dosen)
            ->firstOrFail();
        $sudah_scan = $sesi_qr->riwayat_scan()->where("id_enrollment_mahasiswa", $enrollment->id_enrollment_mahasiswa)->exists();

        if (!$enrollment) {
            return back()->with("error", "Anda tidak terdaftar di kelas ini!");
        }
        
        if (!$sesi_qr) {
            return back()->with("error", "Token tidak valid!");
        }

        if ($sudah_scan) {
            return back()->with("error", "Anda sudah melakukan scan kode!");
        }

        if ($sesi_qr->waktu_berakhir >= now()) {
            RiwayatScan::create([
                "id_sesi_qr" => $sesi_qr->id_sesi_qr,
                "id_enrollment_mahasiswa" => $request->id_enrollment_mahasiswa,
                "waktu_scan" => now(),
                "status_kehadiran" => "Hadir"
            ]);
        }

        if ($sesi_qr->waktu_berakhir < now()) {
            RiwayatScan::create([
                "id_sesi_qr" => $request->id_sesi_qr,
                "id_enrollment_mahasiswa" => $request->id_enrollment_mahasiswa,
                "waktu_scan" => now(),
                "status_kehadiran" => "Terlambat"
            ]);
        }
    }
}
