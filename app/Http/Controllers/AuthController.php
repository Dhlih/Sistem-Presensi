<?php

namespace App\Http\Controllers;

use App\Models\Pengguna;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function show_login()
    {
        return Inertia::render("Login");
    }
    public function login(Request $request)
    {
        $request->validate([
            "username" => "string",
            "password" => "string"
        ]);

        $username = $request->username;
        $password = $request->password;

        // dd($username, $password);

        $pengguna = Pengguna::where("username", $username)->first();

        if ($pengguna && Hash::check($password, $pengguna->password)) {
            Auth::login($pengguna);
            $request->session()->regenerate();

            return redirect("/dashboard");
        }
        return back()->with("error", "Username atau password salah");
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect("/login");
    }
}
