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
        Schema::create('movielist', function (Blueprint $table) {
            $table->id();
            $table->string('theatreName');
            $table->string('movieName');
            //$table->string('moviePoster');
            $table->string('genre');
            $table->string('language');
            $table->string('duration');
            $table->string('firstShow');
            $table->string('secondShow');
            $table->string('thirdShow');
            $table->string('price');
            $table->string('imgUrl');
            $table->boolean('decision')->default(0);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('movielist');
    }
};
