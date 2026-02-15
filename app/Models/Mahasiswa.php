<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Mahasiswa extends Model
{
    protected $fillable = ["id_mahasiswa", "id_pengguna", "nama", "nim"];

    public function pengguna()
    {
        return $this->belongsTo(Pengguna::class, 'id_pengguna');
    }

    public function enrollment_mahasiswa()
    {
        return $this->hasMany(EnrollmentMahasiswa::class, 'id_mahasiswa');
    }
}
