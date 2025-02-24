<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kamar extends Model
{
    //
    use HasFactory;
    protected $fillable = [
        'nomor_kamar',
        'jenis_kamar',
        'fasilitas',
        'harga',
        'status'
    ];

    protected $casts = [
        'fasilitas' => 'array',
    ];

    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }
}
