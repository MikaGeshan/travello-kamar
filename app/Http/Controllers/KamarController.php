<?php

namespace App\Http\Controllers;

use App\Models\Kamar;
use Illuminate\Http\Request;
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
        return Inertia::render('Admin/Rooms/CreateRoom');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'jenis_kamar' => 'required|in:Standard Room,Deluxe Room,Suite Room',
            'harga' => 'required|numeric|min:0',
            'status' => 'nullable|in:Available,Booked,Not Available',
            'gambar_kamar' => 'required|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        try {
            $gambarPath = null;

            // Cek dan simpan gambar jika ada
            if ($request->hasFile('gambar_kamar')) {
                $gambarPath = $request->file('gambar_kamar')->store('gambar_kamar', 'public');
            }

            // Simpan data ke database
            $kamar = new Kamar();
            $kamar->jenis_kamar = $validatedData['jenis_kamar'];
            $kamar->harga = $validatedData['harga'];
            $kamar->status = $validatedData['status'] ?? 'Available';
            $kamar->gambar_kamar = $gambarPath;
            $kamar->save();

            return response()->json([
                'message' => 'Data kamar berhasil disimpan.',
                'data' => $kamar,
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Terjadi kesalahan saat menyimpan data kamar.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Kamar $kamar)
    {
        // Menampilkan data detail kamar
        $kamar->gambar_kamar = asset('storage/' . $kamar->gambar_kamar);

        return response()->json([
            'data' => $kamar,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Kamar $kamar)
    {
        return Inertia::render('Admin/Rooms/EditRoom', [
            'room' => [
                'id' => $kamar->id,
                'jenis_kamar' => $kamar->jenis_kamar,
                'harga' => $kamar->harga,
                'status' => $kamar->status,
                'gambar_kamar' => asset('storage/' . $kamar->gambar_kamar),
            ],
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Kamar $kamar)
    {
        $validatedData = $request->validate([
            'jenis_kamar' => 'required|in:Standard Room,Deluxe Room,Suite Room',
            'harga' => 'required|numeric|min:0',
            'status' => 'nullable|in:Available,Booked,Not Available',
            'gambar_kamar' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        try {
            if ($request->hasFile('gambar_kamar')) {
                $gambarPath = $request->file('gambar_kamar')->store('gambar_kamar', 'public');
                $kamar->gambar_kamar = $gambarPath;
            }

            $kamar->jenis_kamar = $validatedData['jenis_kamar'];
            $kamar->harga = $validatedData['harga'];
            $kamar->status = $validatedData['status'] ?? $kamar->status;
            $kamar->save();

            return response()->json([
                'message' => 'Data kamar berhasil diperbarui.',
                'data' => $kamar,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Terjadi kesalahan saat memperbarui data kamar.',
                'error' => $e->getMessage(),
            ], 500);
        }
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
}
