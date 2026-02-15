<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pengguna extends Model
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
