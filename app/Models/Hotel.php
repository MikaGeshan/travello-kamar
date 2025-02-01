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

    public function kamars()
    {
        return $this->hasMany(Kamar::class, 'hotel_id', 'id');
    }
}
