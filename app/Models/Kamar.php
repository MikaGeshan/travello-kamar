<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Kamar extends Model
{
    //
    protected $fillable = [
        'jenis_kamar',
        'harga',
        'status'

    ];
}
