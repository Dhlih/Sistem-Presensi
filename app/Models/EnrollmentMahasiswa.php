<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EnrollmentMahasiswa extends Model
{
    protected $primaryKey = 'id_enrollment_mahasiswa';

    protected $fillable = ["id_enrollment_mahasiswa", "id_mahasiswa", "id_mata_kuliah", "id_tahun_ajaran"];

    public function tahun_ajaran()
    {
        return $this->belongsTo(TahunAjaran::class, 'id_tahun_ajaran');
    }

    public function mata_kuliah()
    {
        return $this->belongsTo(MataKuliah::class, 'id_mata_kuliah');
    }

    public function mahasiswa()
    {
        return $this->belongsTo(Mahasiswa::class, 'id_mahasiswa');
    }

    public function jadwal()
    {
        return $this->hasMany(Jadwal::class, 'id_enrollment_dosen');
    }
}
