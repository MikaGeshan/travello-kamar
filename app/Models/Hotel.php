<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Hotel extends Model
{
    //
    protected $fillable = [
        'nama_hotel',
        'deskripsi_hotel',
        'lokasi_hotel',
        'gambar_hotel',
        'rating_hotel'
    ];
} 
