<?php

namespace App\Http\Controllers;

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
        $rooms = Kamar::all();

        return Inertia::render('Admin/Rooms/RoomList', [
            'rooms' => $rooms,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        #create
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'jenis_kamar' => 'required|in:Standard Room,Deluxe Room,Suite Room',
            'harga' => 'required|numeric|min:0',
            'fasilitas' => 'required|array',
            'status' => 'nullable|in:Available,Booked,Not Available',
        ]);

        $validatedData['fasilitas'] = json_encode($validatedData['fasilitas']);

        try {
            $nomorKamar = $this->generateNomorKamar();

            $kamar = new Kamar();
            $kamar->nomor_kamar = $nomorKamar;
            $kamar->jenis_kamar = $validatedData['jenis_kamar'];
            $kamar->harga = $validatedData['harga'];
            $kamar->fasilitas = $validatedData['fasilitas'];
            $kamar->status = $validatedData['status'] ?? 'Available';
            $kamar->save();

            return redirect()->route('admin.rooms.list')->with('success', 'Kamar berhasil ditambahkan.');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Gagal menambahkan kamar: ' . $e->getMessage()]);
        }
    }

    /**
     * Fungsi untuk generate nomor kamar secara otomatis
     */
    private function generateNomorKamar()
    {
        $lastRoom = Kamar::orderBy('id', 'desc')->first();

        if ($lastRoom && preg_match('/TRV-(\d+)[A-Z]/', $lastRoom->nomor_kamar, $matches)) {
            $newNumber = intval($matches[1]) + 1;
        } else {
            $newNumber = 1;
        }

        $randomChar = 'A';

        return "TRV-{$newNumber}{$randomChar}";
    }

    /**
     * Display the specified resource.
     */
    public function show(Kamar $kamar)
    {
        $rooms = Kamar::all();
        return Inertia::render('Home/Explore', props: [
            'rooms' => $rooms,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Kamar $room)
    {
        return Inertia::render('Admin/Rooms/UpdateRoom', [
            'room' => $room,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $kamar = Kamar::findOrFail($id);

        $validatedData = $request->validate([
            'jenis_kamar' => 'required|in:Standard Room,Deluxe Room,Suite Room',
            'harga' => 'required|numeric|min:0',
            'fasilitas' => 'nullable|max:1000',
            'status' => 'nullable|in:Available,Booked,Not Available',
        ]);

        $kamar->update($validatedData);

        return redirect()->back()->with('success', 'Kamar berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $kamar = Kamar::findOrFail($id);

            $kamar->delete();

            return redirect()->route('admin.rooms.list')->with('success', 'Kamar berhasil dihapus');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Gagal menghapus kamar: ' . $e->getMessage()]);
        }
    }


    public function showComponentKamar($id)
    {
        $kamars = Kamar::findOrfail($id);
        return Inertia::render('Home/PilihKamar', [
            'kamars' => $kamars,
        ]);
    }
}
