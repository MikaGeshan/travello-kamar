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
        'hotel_id',
        'status'
    ];

    public function hotel()
    {
        return $this->belongsTo(Hotel::class, 'hotel_id', 'id');
    }
}
