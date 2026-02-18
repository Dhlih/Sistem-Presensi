<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Dosen extends Model
{
    protected $primaryKey = 'id_dosen';

    protected $fillable = ["id_dosen", "id_pengguna", "nama", "nip"];
    
    public function pengguna()
    {
        return $this->belongsTo(Pengguna::class, 'id_pengguna');
    }

    public function enrollment_dosen()
    {
        return $this->hasMany(EnrollmentDosen::class, 'id_dosen');
    }
}
