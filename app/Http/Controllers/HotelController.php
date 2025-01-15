<?php

namespace App\Http\Controllers;

use App\Models\Hotel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HotelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $hotels = Hotel::all(); // Ambil semua hotel
        return Inertia::render('Admin/Hotel/HotelList', [
            'hotels' => $hotels
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Hotel/CreateHotel');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nama_hotel' => 'required|string|max:255',
            'lokasi_hotel' => 'required|string|max:255',
            'deskripsi_hotel' => 'required|string',
            'rating_hotel' => 'nullable|numeric|min:1|max:5',
            'gambar_hotel' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        try {
            if ($request->hasFile('gambar_hotel')) {
                $image = $request->file('gambar_hotel');
                $imageName = time() . '.' . $image->getClientOriginalExtension();
                $image->move(public_path('uploads/hotels'), $imageName);
                $validatedData['gambar_hotel'] = 'uploads/hotels/' . $imageName;
            }

            $hotel = Hotel::create($validatedData);

            return redirect()->route('admin.hotels.list')->with('success', 'Hotel berhasil dibuat');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Gagal membuat hotel: ' . $e->getMessage()]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Hotel $hotel)
    {
        return Inertia::render('Admin/Hotel/ShowHotel', [
            'hotel' => $hotel
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Hotel $hotel)
    {
        return Inertia::render('Admin/Hotel/EditHotel', [
            'hotel' => $hotel
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Hotel $hotel)
    {
        $validatedData = $request->validate([
            'nama_hotel' => 'required|string|max:255',
            'lokasi_hotel' => 'required|string|max:255',
            'deskripsi_hotel' => 'required|string',
            'rating_hotel' => 'nullable|numeric|min:1|max:5',
            'gambar_hotel' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        try {
            if ($request->hasFile('gambar_hotel')) {
                // Hapus gambar lama jika ada
                if ($hotel->gambar_hotel && file_exists(public_path($hotel->gambar_hotel))) {
                    unlink(public_path($hotel->gambar_hotel));
                }

                $image = $request->file('gambar_hotel');
                $imageName = time() . '.' . $image->getClientOriginalExtension();
                $image->move(public_path('uploads/hotels'), $imageName);
                $validatedData['gambar_hotel'] = 'uploads/hotels/' . $imageName;
            }

            // Update hotel
            $hotel->update($validatedData);

            return redirect()->route('admin.hotels.list')->with('success', 'Hotel berhasil diupdate');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Gagal mengupdate hotel: ' . $e->getMessage()]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Hotel $hotel)
    {
        try {
            // Hapus gambar jika ada
            if ($hotel->gambar_hotel && file_exists(public_path($hotel->gambar_hotel))) {
                unlink(public_path($hotel->gambar_hotel));
            }

            // Hapus hotel
            $hotel->delete();

            return redirect()->route('admin.hotels.list')->with('success', 'Hotel berhasil dihapus');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Gagal menghapus hotel: ' . $e->getMessage()]);
        }
    }
}
