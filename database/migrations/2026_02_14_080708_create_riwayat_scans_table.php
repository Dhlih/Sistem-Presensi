<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('riwayat_scans', function (Blueprint $table) {
            $table->id("id_riwayat_scan");
            $table->foreignId("id_sesi_qr");
            $table->foreignId("id_enrollment_mahasiswa");
            $table->string("status_kehadiran");
            $table->timestamp('waktu_scan');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('riwayat_scans');
    }
};
