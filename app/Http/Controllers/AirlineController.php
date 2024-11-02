<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Airline;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AirlineController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $airlines = Airline::all();
        return Inertia::render('Admin/Maskapai/AirlineList', [
            'airlines' => $airlines,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:10',
            'logo' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $logoPath = $request->file('logo')->store('logos', 'public');

        $airline = Airline::create([
            'name' => $request->name,
            'code' => $request->code,
            'logo' => $logoPath,
        ]);

        return redirect()->route('maskapai.airlines.list')->with('success', 'Airline created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // Logika untuk menampilkan detail maskapai
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        // Logika untuk menampilkan form edit maskapai
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // Logika untuk memperbarui maskapai
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // Logika untuk menghapus maskapai
    }
}
