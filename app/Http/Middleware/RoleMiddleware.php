<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string $role): Response
    {
        $pengguna = Auth::user();
        $redirect_path = $pengguna->jenis_role === "mahasiswa" ? "/mahasiswa" : "/dosen";

        if ($pengguna->jenis_role !== $role) {
            return redirect("{$redirect_path}/dashboard");
        }

        return $next($request);
    }
}
