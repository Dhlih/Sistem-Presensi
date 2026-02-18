<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MataKuliah extends Model
{
    protected $primaryKey = 'id_mata_kuliah';
    protected $fillable = ["id_mata_kuliah", "nama", "sks"];

    public function mahasiswa()
    {
        return $this->hasOne(Mahasiswa::class, 'id_mata_kuliah');
    }

    public function dosen()
    {
        return $this->hasOne(EnrollmentMahasiswa::class, 'id_mata_kuliah');
    }
}
