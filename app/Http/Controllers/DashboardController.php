<?php

namespace App\Http\Controllers;

use App\Models\Kamar;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    //
    public function index() {
        $totalRooms = Kamar::count();
        $totalReservation = Reservation::count();

        $totalKeuntungan = Reservation::sum("total_price");

        return Inertia::render("Admin/Dashboard", 
        [
            'totalRooms' => $totalRooms,
            'totalReservation'=> $totalReservation,
            'totalKeuntungan' => $totalKeuntungan,
        ]);
    }
    
}


