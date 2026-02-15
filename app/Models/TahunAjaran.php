<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TahunAjaran extends Model
{
    protected $fillable = ["id_tahun_ajaran", "tahun", "semester"];

    public function enrollment_mahasiswa()
    {
        return $this->hasMany(EnrollmentMahasiswa::class, 'id_enrollment_mahasiswa');
    }

    public function enrollment_dosen()
    {
        return $this->hasMany(EnrollmentDosen::class, 'id_enrollment_dosen');
    }
}
