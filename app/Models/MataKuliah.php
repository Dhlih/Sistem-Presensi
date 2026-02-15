<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MataKuliah extends Model
{
    protected $fillable = ["id_mata_kuliah", "nama",];

    public function mahasiswa()
    {
        return $this->hasOne(Mahasiswa::class, 'id_mata_kuliah');
    }

    public function dosen()
    {
        return $this->hasOne(EnrollmentMahasiswa::class, 'id_mata_kuliah');
    }
}
