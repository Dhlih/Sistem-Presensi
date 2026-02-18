<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect("/login");
});

Route::middleware("guest")->group(function () {
    Route::get('/login', [AuthController::class, "show_login"])->name("login");
    Route::post('/login', [AuthController::class, "login"]);
});

Route::middleware("auth")->group(function () {
    Route::get('/dashboard', [DashboardController::class, "show_dashboard"])->name("dashboard");
    Route::post('/logout', [AuthController::class, "logout"]);
});
