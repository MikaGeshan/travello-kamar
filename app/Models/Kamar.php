<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Kamar extends Model
{
    //
    protected $fillable = [
        'nama_kamar',
        'jenis_kamar',
        'fasilitas',
        'harga',
        'gambar_kamar',
        'status'
    ];
}
