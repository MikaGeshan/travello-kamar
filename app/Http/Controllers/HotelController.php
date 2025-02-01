<?php

namespace App\Http\Controllers;

use App\Models\Hotel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class HotelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $hotels = Hotel::all();
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
            'deskripsi_hotel' => 'required|string|max:5000',
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
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Hotel $hotel)
    {
        return Inertia::render('Admin/Hotel/UpdateHotel', [
            'hotel' => $hotel
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $hotel = Hotel::findOrFail($id);

        $validatedData = $request->validate([
            'nama_hotel' => 'required|string|max:255',
            'lokasi_hotel' => 'required|string|max:255',
            'deskripsi_hotel' => 'nullable|string|max:5000',
            'rating_hotel' => 'nullable|numeric|min:1|max:5',
            'gambar_hotel' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        if ($request->hasFile('gambar_hotel')) {
            $gambarPath = $request->file('gambar_hotel')->store('uploads/hotels', 'public');
            $validatedData['gambar_hotel'] = $gambarPath;

            if ($hotel->gambar_hotel) {
                Storage::disk('public')->delete($hotel->gambar_hotel);
            }
        } else {
            $validatedData['gambar_hotel'] = $hotel->gambar_hotel;
        }

        $hotel->update($validatedData);

        return redirect()->back()->with('success', 'Hotel berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Hotel $hotel)
    {
        try {
            $hotel = Hotel::findOrFail($hotel->id);

            if ($hotel->gambar_hotel && file_exists(public_path($hotel->gambar_hotel))) {
                unlink(public_path($hotel->gambar_hotel));
            }

            $hotel->delete();

            return redirect()->route('admin.hotels.list')->with('success', 'Hotel berhasil dihapus');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Gagal menghapus hotel: ' . $e->getMessage()]);
        }
    }

    public function showComponentHotel()
    {
        $hotels = Hotel::all();
        return Inertia::render('Home/Explore', [
            'hotels' => $hotels,
        ]);
    }
}
