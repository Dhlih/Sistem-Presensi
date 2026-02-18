<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RiwayatScan extends Model
{
    protected $primaryKey = 'id_riwayat_scan';

    protected $fillable = ["id_riwayat_scan", "id_sesi_qr", "id_enrollment_mahasiswa", "waktu_scan", "status_kehadiran"];

    public function riwayat_scan()
    {

        return $this->hasMany(RiwayatScan::class, 'id_enrollment_mahasiswa');
    }

    public function sesi_qr()
    {
        return $this->belongsTo(SesiQr::class, 'id_sesi_qr');
    }
}
