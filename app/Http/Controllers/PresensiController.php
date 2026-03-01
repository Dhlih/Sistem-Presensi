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
    // Dosen
    public function show_presensi(Jadwal $jadwal)
    {
        $sesi_aktif = $jadwal->sesi_qr()
            ->where('waktu_berakhir', '>', now())
            ->orderBy('waktu_mulai', 'desc')
            ->first();

        $mata_kuliah = $jadwal->enrollment_dosen->mata_kuliah->nama;
        // dd($sesi_aktif->toArray());

        $enrollments = EnrollmentMahasiswa::with(['mahasiswa', 'riwayat_scan' => function ($query) use ($sesi_aktif) {
            if ($sesi_aktif) {
                // Hanya ambil riwayat scan yang id_sesi_qr nya sama dengan sesi yang aktif
                $query->where('id_sesi_qr', $sesi_aktif->id_sesi_qr);
            } else {
                // Jika tidak ada sesi aktif, buat query yang menghasilkan kosong
                $query->whereRaw('1 = 0');
            }
        }])
            ->where('id_enrollment_dosen', $jadwal->id_enrollment_dosen)
            ->whereHas('mahasiswa', function ($query) use ($jadwal) {
                $query->where('kelas', $jadwal->kelas);
            })
            ->get();


        $daftar_mahasiswa = $enrollments->map(function ($enrollment) {
            $mahasiswa = $enrollment->mahasiswa;
            // Ambil data scan pertama (karena filter di atas sudah menjamin ini sesi aktif)
            $scan = $enrollment->riwayat_scan->first();
            return [
                "id_mahasiswa" => $mahasiswa->id_mahasiswa,
                "nim"          => $mahasiswa->nim,
                "nama"         => $mahasiswa->nama,
                "kelas"        => $mahasiswa->kelas,
                // Jika sudah scan tampilkan jamnya, jika belum tampilkan null/strip
                "waktu_scan"   => $scan ? $scan->created_at->format('H:i:s') : null,
                "status"       => $scan ? "Hadir" : "Belum Absen"
            ];
        });

        // dd($daftar_mahasiswa->toArray());
        return Inertia::render("Dosen/Presensi", ["data" => [
            "sesi_aktif" => $sesi_aktif,
            "daftar_mahasiswa" => $daftar_mahasiswa,
            "mata_kuliah" => $mata_kuliah,
            "kelas" => $jadwal->kelas
        ]]);
    }

    public function generate_qr_code(Request $request, Jadwal $jadwal)
    {
        // $request->validate([
        //     "waktu_mulai" => "string",
        //     "waktu_berakhir" => "string"
        // ]);
        $waktu_sekarang = now()->toTimeString();
        $kode_boleh_dibuat = $waktu_sekarang >= $jadwal->jam_mulai
            && $waktu_sekarang <= $jadwal->jam_selesai;

        if (!$kode_boleh_dibuat) {
            return back()->with("error", "Jam mulai jadwal tidak sesuai!");
        }

        SesiQr::create([
            "id_jadwal" => $jadwal->id_jadwal,
            'waktu_mulai' => now(),
            'waktu_berakhir' => now()->addMinutes(15),
            'qr_token' => Str::random(40),
        ]);

        return redirect("/dosen/jadwal/{$jadwal->id_jadwal}/presensi");
    }

    // Mahasiswa
    public function scan_qr_code(Request $request, $token)
    {
        $sesi_qr = SesiQr::with("jadwal")->where("qr_token", $token)->first();
        $pengguna = Auth::user()->load("mahasiswa");

        if (!$sesi_qr) {
            return back()->with("error", "Token tidak valid!");
        }

        if ($pengguna->mahasiswa->kelas !== $sesi_qr->jadwal->kelas) {
            return back()->with("error", "Kelas Anda tidak sesuai");
        }

        $enrollment = EnrollmentMahasiswa::where('id_mahasiswa', $pengguna->mahasiswa->id_mahasiswa)
            ->where('id_enrollment_dosen', $sesi_qr->jadwal->id_enrollment_dosen)
            ->firstOrFail();

        $sudah_scan = $sesi_qr->riwayat_scan()->where("id_enrollment_mahasiswa", $enrollment->id_enrollment_mahasiswa)->exists();

        if ($sudah_scan) {
            return back()->with("error", "Anda sudah melakukan scan kode!");
        }

        if ($sesi_qr->waktu_berakhir >= now()) {
            RiwayatScan::create([
                "id_sesi_qr" => $sesi_qr->id_sesi_qr,
                "id_enrollment_mahasiswa" => $enrollment->id_enrollment_mahasiswa,
                "waktu_scan" => now(),
                "status_kehadiran" => "Hadir"
            ]);

            return redirect("/mahasiswa/jadwal");
        }

        if ($sesi_qr->waktu_berakhir < now()) {
            RiwayatScan::create([
                "id_sesi_qr" => $sesi_qr->id_sesi_qr,
                "id_enrollment_mahasiswa" => $enrollment->id_enrollment_mahasiswa,
                "waktu_scan" => now(),
                "status_kehadiran" => "Terlambat"
            ]);

            return redirect("/mahasiswa/jadwal");
        }
    }
}
