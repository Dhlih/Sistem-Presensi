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
        Schema::create('enrollment_dosens', function (Blueprint $table) {
            $table->id("id_enrollment_dosen");
            $table->foreignId("id_dosen");
            $table->foreignId("id_mata_kuliah");
            $table->foreignId("id_tahun_ajaran");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('enrollment_dosens');
    }
};
