<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;

class Pengguna extends Authenticatable
{
    protected $fillable = ["id_pengguna", "username", "password", "jenis_role"];

    public function mahasiswa()
    {
        return $this->hasOne(Mahasiswa::class, 'id_pengguna');
    }

    public function dosen()
    {
        return $this->hasOne(Dosen::class, 'id_pengguna');
    }
}
