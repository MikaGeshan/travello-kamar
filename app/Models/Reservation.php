<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    //
    protected $fillable = [
        'reservation_code',
        'customer_id',
        'room_id',
        'check_in',
        'check_out',
        'guests',
        'total_price',
        'payment_status',
    ];

    public function Customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function Room()
    {
        return $this->belongsTo(Kamar::class);
    }
}
