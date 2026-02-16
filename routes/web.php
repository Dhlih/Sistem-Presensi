<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect("/login");
});

// Authentication
Route::get('/login', [AuthController::class, "show_login"]);
Route::post('/login', [AuthController::class, "login"]);
Route::post('/logout', [AuthController::class, "logout"]);

Route::get('/dashboard', function () {
    return Inertia::render("Dashboard");
});
