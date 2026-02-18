<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Jadwal extends Model
{
    protected $primaryKey = 'id_jadwal';

    protected $fillable = ["id_jadwal", "id_enrollment_dosen", "hari", "jam_mulai", "jam_selesai"];

    public function enrollment_dosen()
    {
        return $this->belongsTo(EnrollmentDosen::class, 'id_enrollment_dosen');
    }

    public function sesi_qr()
    {
        return $this->hasMany(SesiQr::class, 'id_jadwal');
    }
}
