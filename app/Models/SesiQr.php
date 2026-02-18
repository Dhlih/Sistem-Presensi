<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SesiQr extends Model
{
    protected $primaryKey = 'id_sesi_qr';

    protected $fillable = ["id_sesi_qr", "id_jadwal", "waktu_mulai", "waktu_berakhir", "qr_token"];

    public function riwayat_scan()
    {
        return $this->hasMany(RiwayatScan::class, 'id_sesi_qr');
    }

    public function jadwal()
    {
        return $this->belongsTo(Jadwal::class, 'id_jadwal');
    }
}
