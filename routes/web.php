<?php

use App\Http\Controllers\AuthController;
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
    Route::get('/dashboard', function () {
        return Inertia::render("Dashboard");
    })->name("dashboard");
    Route::post('/logout', [AuthController::class, "logout"]);
});
