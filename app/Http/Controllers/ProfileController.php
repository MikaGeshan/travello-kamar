<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function showProfile()
    {
        return Inertia::render('Profile/Profile');
    }
    public function updateProfile(Request $request)
    {
        $user = Auth::guard('customer')->user();

        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:customers,email,' . $user->id,
            'jeniskelamin' => 'nullable|string|in:Laki-Laki,Perempuan',
            'tanggallahir' => 'nullable|date',
        ]);

        $user->update([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'jeniskelamin' => $validatedData['jeniskelamin'],
            'tanggallahir' => $validatedData['tanggallahir'],
        ]);

        return redirect()->back()->with('success', 'Profile Updated.');
    }

    public function updatePassword(Request $request)
    {
        $validatedData = $request->validate([
            'old_password' => 'required',
            'new_password' => 'required|min:8|confirmed',
        ]);

        $user = Auth::guard('customer')->user();

        if (!Hash::check($validatedData['old_password'], $user->password)) {
            return back()->withErrors([
                'old_password' => 'Password lama tidak sesuai'
            ]);
        }

        $user->update([
            'password' => Hash::make($validatedData['new_password']),
        ]);

        return redirect()->back()->with('success', 'Password Successfully Updated.');
    }

    public function deleteAccount(Request $request)
    {
        $user = Auth::guard('customer')->user();

        Auth::guard('customer')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        $user->delete();

        return redirect()->route('login')->with('success', 'Account Successfully Deleted.');
    }
}
