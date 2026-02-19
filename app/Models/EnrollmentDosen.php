<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EnrollmentDosen extends Model
{
    protected $primaryKey = 'id_enrollment_dosen';

    protected $fillable = ["id_enrollment_dosen", "id_dosen", "id_mata_kuliah", "id_tahun_ajaran"];

    public function dosen()
    {
        return $this->belongsTo(Dosen::class, 'id_dosen');
    }

    public function mata_kuliah()
    {
        return $this->belongsTo(MataKuliah::class, 'id_mata_kuliah');
    }

    public function tahun_ajaran()
    {
        return $this->belongsTo(TahunAjaran::class, 'id_tahun_ajaran');
    }

    public function jadwal()
    {
        return $this->hasMany(Jadwal::class, 'id_enrollment_dosen');
    }

    public function enrollment_mahasiswa()
    {
        return $this->hasMany(EnrollmentMahasiswa::class, 'id_enrollment_dosen');
    }
}
