<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\Dosen\DashboardController as DosenDashboardController;
use App\Http\Controllers\Mahasiswa\DashboardController as MahasiswaDashboardController;
use App\Http\Controllers\Mahasiswa\JadwalController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect("/login");
});

Route::middleware("guest")->group(function () {
    Route::get('/login', [AuthController::class, "show_login"])->name("login");
    Route::post('/login', [AuthController::class, "login"]);
});

Route::middleware("auth")->group(function () {
    Route::post('/logout', [AuthController::class, "logout"]);
    
    // Dosen route
    Route::middleware(['role:dosen'])->prefix('dosen')->group(function () {
        Route::get('/dashboard', [DosenDashboardController::class, "show_dashboard"])->name("dashboard");
        Route::get('/jadwal', [JadwalController::class, "show_jadwal_kuliah"]);
    });

    // Mahasiswa route
    Route::middleware(['role:mahasiswa'])->prefix('mahasiswa')->group(function () {
        Route::get('/dashboard', [MahasiswaDashboardController::class, "show_dashboard"])->name("dashboard");
        Route::get('/jadwal', [JadwalController::class, "show_jadwal_kuliah"]);
    });
});
