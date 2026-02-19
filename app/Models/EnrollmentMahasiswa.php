<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EnrollmentMahasiswa extends Model
{
    protected $primaryKey = 'id_enrollment_mahasiswa';

    protected $fillable = ["id_enrollment_mahasiswa", "id_mahasiswa", "id_enrollment_dosen", "id_tahun_ajaran"];

    public function tahun_ajaran()
    {
        return $this->belongsTo(TahunAjaran::class, 'id_tahun_ajaran');
    }

    public function mahasiswa()
    {
        return $this->belongsTo(Mahasiswa::class, 'id_mahasiswa');
    }

    public function enrollment_dosen()
    {
        return $this->belongsTo(EnrollmentDosen::class, 'id_enrollment_dosen');
    }
}
