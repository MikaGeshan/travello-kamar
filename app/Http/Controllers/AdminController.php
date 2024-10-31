<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Customer;
use App\Models\Role;
use Inertia\Inertia;

class AdminController extends Controller
{
    const SUCCESS_LOGIN_MESSAGE = 'Successfully logged in!';
    const ERROR_LOGIN_MESSAGE = 'The provided credentials do not match our records.';
    const SUCCESS_USER_CREATION_MESSAGE = 'User created successfully.';
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);

        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();


            return redirect()->route('admin.dashboard')->with('success', self::SUCCESS_LOGIN_MESSAGE);
        }

        Log::warning('Failed login attempt', ['email' => $credentials['email']]);

        return back()->withErrors([
            'email' => self::ERROR_LOGIN_MESSAGE,
        ]);
    }

    public function userList()
    {
        $users = User::all();
        return Inertia::render('Admin/Users/UserList', [
            'users' => $users,
        ]);
    }

    public function createUser()
    {
        $roles = Role::all();
        return Inertia::render('Admin/Users/CreateUser', [
            'roles' => $roles,
        ]);
    }

    public function storeUser(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'role' => 'required|string',
        ]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
        ]);

        return redirect()->route('admin.users.list')->with('success', self::SUCCESS_USER_CREATION_MESSAGE);
    }

    public function updateUser(Request $request, User $user)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:8',
            'role' => 'required|string',
        ]);

        $user->name = $request->name;
        $user->email = $request->email;

        if ($request->filled('password')) {
            $user->password = Hash::make($request->password);
        }

        $user->role = $request->role;
        $user->save();

        return redirect()->route('admin.users.list')->with('success', 'User berhasil diperbarui');
    }

    public function destroyUser(User $user)
    {
        $user->delete();
        return redirect()->back()->with('success', 'User berhasil dihapus');
    }

    public function destroySelectedUsers(Request $request)
    {
        $userIds = $request->input('ids');
        User::destroy($userIds);
        return redirect()->back()->with('success', 'User berhasil dihapus');
    }

    public function customerList()
    {
        $customers = Customer::all();
        return Inertia::render('Admin/Users/CustomerList', [
            'customers' => $customers
        ]);
    }

    public function destroyCustomer(Customer $customer)
    {
        $customer->delete();
        return redirect()->back()->with('success', 'Customer berhasil dihapus');
    }

    public function destroySelectedCustomers(Request $request)
    {
        $customerIds = $request->input('ids');
        Customer::destroy($customerIds);
        return redirect()->back()->with('success', 'Customer berhasil dihapus');
    }
}
