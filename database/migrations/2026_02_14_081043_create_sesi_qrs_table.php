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
        Schema::create('sesi_qrs', function (Blueprint $table) {
            $table->id("id_sesi_qr");
            $table->foreignId("id_jadwal");
            $table->timestamp("waktu_mulai");
            $table->timestamp("waktu_berakhir");
            $table->string("qr_token");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sesi_qrs');
    }
};
