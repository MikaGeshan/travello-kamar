<?php

namespace Database\Seeders;

use App\Models\Customer;
use App\Models\Kamar;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@gmail.com',
            'role' => 'Admin',
            'password' => bcrypt('admin123')
        ]);

        Customer::factory(10)->create();
        // Kamar::factory(20)->create();
    }
}
