<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\Dosen\DashboardController as DosenDashboardController;
use App\Http\Controllers\Dosen\JadwalController as DosenJadwalController;
use App\Http\Controllers\PresensiController;
use App\Http\Controllers\Mahasiswa\DashboardController as MahasiswaDashboardController;
use App\Http\Controllers\Mahasiswa\JadwalController as MahasiswaJadwalController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect("/login");
});

Route::middleware("guest")->group(function () {
    Route::get('/login', [AuthController::class, "show_login"])->name("login");
    Route::post('/login', [AuthController::class, "login"]);
});

Route::middleware("auth")->group(function () {
    // Dosen route
    Route::middleware(['role:dosen'])->prefix('dosen')->group(function () {
        Route::get('/dashboard', [DosenDashboardController::class, "show_dashboard"])->name("dashboard");
        Route::get('/jadwal', [DosenJadwalController::class, "show_jadwal_kuliah"]);

        Route::get('/jadwal/{jadwal}/presensi', [PresensiController::class, "show_presensi"]);
        Route::post('/jadwal/{jadwal}/presensi', [PresensiController::class, "generate_qr_code"]);
    });

    // Mahasiswa route
    Route::middleware(['role:mahasiswa'])->prefix('mahasiswa')->group(function () {
        Route::get('/dashboard', [MahasiswaDashboardController::class, "show_dashboard"])->name("dashboard");
        Route::get('/jadwal', [MahasiswaJadwalController::class, "show_jadwal_kuliah"]);
        Route::get('/mahasiswa/presensi/token/{token}', [PresensiController::class, "scan_qr_code"]);
    });

    Route::post('/logout', [AuthController::class, "logout"]);
});
