<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Role;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Seed Users
        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@gmail.com',
            'role' => 'Admin',
            'password' => bcrypt(value: 'admin123')
        ]);
        // Seed Roles
        Role::factory()->create([
            'name' => 'Admin',
        ]);
    }
}
