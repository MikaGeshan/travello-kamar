<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\ReservationController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\KamarController;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Http\Controllers\RoleController;
use App\Models\Role;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\ProfileController;

// Admin Routes

// Admin Login
Route::get('/admin/login', function () {
    return Inertia::render('Admin/Auth/Login');
});
Route::post('/admin/login', [AdminController::class, 'login']);

// Admin Logout
Route::post('/admin/logout', [AdminController::class, 'logout'])->name('admin.logout');

// Admin Dashboard
Route::middleware(['auth'])->prefix('admin')->group(function () {
    Route::get('/dashboard', function () {
        Log::info('Dashboard route hit');
        return Inertia::render('Admin/Dashboard');
    })->name('admin.dashboard');

    // User Routes
    Route::get('/users/list', function () {
        $users = User::all();
        return Inertia::render('Admin/Users/UserList', [
            'users' => $users,
        ]);
    })->name('admin.users.list');

    Route::get('/users/create', function () {
        $roles = Role::all();
        return Inertia::render('Admin/Users/CreateUser', [
            'roles' => $roles,
        ]);
    })->name('admin.users.create');
    Route::post('/users', [AdminController::class, 'storeUser'])->name('admin.users.store');

    Route::get('/users/{user}/edit', function (User $user) {
        $roles = Role::all();
        return Inertia::render('Admin/Users/UpdateUser', [
            'user' => $user,
            'roles' => $roles,
        ]);
    })->name('admin.users.edit');

    Route::put('/users/{user}', [AdminController::class, 'updateUser'])->name('admin.users.update');

    Route::delete('/users/{user}', [AdminController::class, 'destroyUser'])->name('admin.users.destroy');

    Route::delete('/users', [AdminController::class, 'destroySelectedUsers'])->name('admin.users.destroy.selected');

    // Customer routes
    Route::get('/customers/list', [AdminController::class, 'customerList'])->name('admin.customers.list');
    Route::delete('/customers/{customer}', [AdminController::class, 'destroyCustomer'])->name('admin.customers.destroy');
    Route::delete('/customers', [AdminController::class, 'destroySelectedCustomers'])->name('admin.customers.destroy.selected');

    // Role Routes
    Route::get('/roles/list', [RoleController::class, 'index'])->name('admin.roles.list');

    Route::get('/roles/create', function () {
        return Inertia::render('Admin/Roles/CreateRole');
    })->name('admin.roles.create');
    Route::post('/roles', [RoleController::class, 'store'])->name('admin.roles.store');

    Route::get('/roles/{role}/edit', [RoleController::class, 'edit'])->name('admin.roles.edit');
    Route::put('/roles/{role}', [RoleController::class, 'update'])->name('admin.roles.update');
    Route::delete('/roles/{role}', [RoleController::class, 'destroy'])->name('admin.roles.destroy');

    // Room Routes
    Route::get('/rooms/list', [KamarController::class, 'index'])->name('admin.rooms.list');
    Route::get('/rooms/create', function () {
        return Inertia::render('Admin/Rooms/CreateRoom');
    })->name('admin.rooms.create');
    Route::post('/rooms', [KamarController::class, 'store'])->name('admin.rooms.store');
    Route::get('/rooms/{room}/edit', [KamarController::class, 'edit'])->name('admin.rooms.edit');
    Route::put('/rooms/{room}', [KamarController::class, 'update'])->name('admin.rooms.update');
    Route::delete('/rooms/{room}', [KamarController::class, 'destroy'])->name('admin.rooms.destroy');

    // Reservation Routes
    Route::get('/reservations/list', [ReservationController::class, 'index'])->name('admin.reservations.list');
    Route::get('/reservations/create', [ReservationController::class, 'create'])->name('admin.reservations.create');
    Route::post('/reservations/create', [ReservationController::class, 'store'])->name('admin.reservations.create');
    Route::get('/reservations/{id}/edit', [ReservationController::class, 'edit'])->name('admin.reservations.edit');
    Route::put('/reservations/{id}', [ReservationController::class, 'update'])->name('admin.reservations.update');
    Route::delete('/reservations/{id}', [ReservationController::class, 'destroy'])->name('admin.reservations.destroy');
});



// Client Web Routes

// Welcome Route
Route::get('/', function () {
    return Auth::guard('customer')->check()
        ? redirect('/home')
        : Inertia::render('Welcome');
});

// Authentication Routes
Route::get('/login', fn() => Inertia::render('Auth/Login'))->name('login');
Route::post('/login', [AuthController::class, 'login']);
Route::get('/register', fn() => Inertia::render('Auth/Register'));
Route::post('/register', [AuthController::class, 'register']);
Route::get('/logout', [AuthController::class, 'logout'])->middleware('auth:customer')->name('logout');

Route::middleware('auth:customer')->group(function () {

    // Home Route
    Route::get('/home', function () {
        return Inertia::render('Home/Home', [
            'userName' => Auth::guard('customer')->user()->name,
        ]);
    });

    Route::get('/explore', fn() => Inertia::render('Home/Explore'));

    // Profile Route
    Route::get('/profile', function () {
        $user = Auth::guard('customer')->user();
        return Inertia::render('Profile/Profile', [
            'userName' => $user->name,
            'userEmail' => $user->email,
            'userNomorTelepon' => $user->nomor_telepon,
            'userJenisKelamin' => $user->jeniskelamin,
            'userTanggalLahir' => $user->tanggallahir,
        ]);
    });

    Route::post('/profile/update', [ProfileController::class, 'updateProfile']);
    Route::get('/profile/password', fn() => Inertia::render('Profile/Password'));
    Route::post('/profile/update-password', [ProfileController::class, 'updatePassword']);
    Route::delete('/profile/delete-account', [ProfileController::class, 'deleteAccount']);

    // Booking Route
    Route::get('/booking-details', [ReservationController::class, 'showReservationForm']);
});
