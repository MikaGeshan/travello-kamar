<?php

namespace App\Http\Controllers;

use App\Models\Hotel;
use App\Models\Kamar;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class KamarController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $rooms = Kamar::all()->map(function ($room) {
            $room->gambar_kamar = asset('storage/' . $room->gambar_kamar);
            return $room;
        });

        return Inertia::render('Admin/Rooms/RoomList', [
            'rooms' => $rooms,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $hotels = Hotel::all();

        return Inertia::render('Admin/Rooms/CreateRoom', [
            'hotels' => $hotels,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nama_kamar' => 'required',
            'jenis_kamar' => 'required|in:Standard Room,Deluxe Room,Suite Room',
            'harga' => 'required|numeric|min:0',
            'fasilitas' => 'nullable|max:1000',
            'status' => 'nullable|in:Available,Booked,Not Available',
            'gambar_kamar' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            'hotel_id' => 'required|exists:hotels,id',
        ]);

        try {
            $gambarPath = null;

            if ($request->hasFile('gambar_kamar')) {
                $gambarPath = $request->file('gambar_kamar')->store('gambar_kamar', 'public');
            }

            $kamar = new Kamar();
            $kamar->nama_kamar = $validatedData['nama_kamar'];
            $kamar->jenis_kamar = $validatedData['jenis_kamar'];
            $kamar->harga = $validatedData['harga'];
            $kamar->fasilitas = $validatedData['fasilitas'];
            $kamar->status = $validatedData['status'] ?? 'Available';
            $kamar->gambar_kamar = $gambarPath;
            $kamar->hotel_id = $validatedData['hotel_id'];
            $kamar->save();

            return redirect()->route('admin.rooms.list')->with('success', 'Kamar berhasil ditambahkan.');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Gagal menambahkan kamar: ' . $e->getMessage()]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Kamar $kamar)
    {
        $kamar->gambar_kamar = asset('storage/' . $kamar->gambar_kamar);

        return response()->json([
            'data' => $kamar,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Kamar $room)
    {
        $hotels = Hotel::all();

        return Inertia::render('Admin/Rooms/UpdateRoom', [
            'room' => $room,
            'hotels' => $hotels,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $kamar = Kamar::findOrFail($id);

        $validatedData = $request->validate([
            'nama_kamar' => 'required',
            'jenis_kamar' => 'required|in:Standard Room,Deluxe Room,Suite Room',
            'harga' => 'required|numeric|min:0',
            'fasilitas' => 'nullable|max:1000',
            'status' => 'nullable|in:Available,Booked,Not Available',
            'gambar_kamar' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        if ($request->hasFile('gambar_kamar')) {
            $gambarPath = $request->file('gambar_kamar')->store('storage/gambar_kamar', options: 'public');
            $validatedData['gambar_hotel'] = $gambarPath;

            if ($kamar->gambar_kamar) {
                Storage::disk('public')->delete($kamar->gambar_kamar);
            }
        } else {
            $validatedData['gambar_kamar'] = $kamar->gambar_kamar;
        }

        $kamar->update($validatedData);

        return redirect()->back()->with('success', 'Hotel berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $kamar = Kamar::findOrFail($id);

            if ($kamar->gambar_kamar && file_exists(storage_path('app/public/' . $kamar->gambar_kamar))) {
                unlink(storage_path('app/public/' . $kamar->gambar_kamar));
            }

            $kamar->delete();

            return redirect()->route('admin.rooms.list')->with('success', 'Kamar berhasil dihapus');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Gagal menghapus kamar: ' . $e->getMessage()]);
        }
    }
    public function showComponentKamar($id)
    {
        $hotel = Hotel::findOrFail($id);

        $kamars = Kamar::where('id', operator: $id)->get();

        return Inertia::render('Home/PilihKamar', [
            'hotel' => $hotel,
            'kamars' => $kamars,
        ]);
    }
}
