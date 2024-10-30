<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\Customer;
use Inertia\Inertia;

class AuthController extends Controller
{

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (Auth::guard('customer')->attempt($request->only('email', 'password'))) {
            $request->session()->regenerate();
            return redirect()->intended('/home');
        }

        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
            'password' => 'The provided password is incorrect.',
        ]);
    }

    public function showRegister()
    {
        return Inertia::render('Auth/Register');
    }

    public function register(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|max:255',
            'email' => 'required|email|unique:customers',
            'password' => 'required|min:8|confirmed',
        ]);

        $customer = Customer::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => Hash::make($validatedData['password']),
        ]);

        Auth::guard('customer')->login($customer);

        return redirect('/')->with('success', 'Successfully Registered. You can now log in.');
    }

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

    public function logout(Request $request)
    {
        Auth::guard('customer')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('login')->with('success', 'Successfully Logged Out.');
    }

    public function updatePassword(Request $request)
    {
        // Validate the incoming request
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
