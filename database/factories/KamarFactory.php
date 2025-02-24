<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Kamar>
 */
class KamarFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nomor_kamar' => 'TRV-' . $this->faker->unique()->numberBetween(100, 999) . 'A',
            'jenis_kamar' => $this->faker->randomElement(['Standard Room', 'Deluxe Room', 'Suite Room']),
            'harga' => $this->faker->numberBetween(500000, 2000000),
            'fasilitas' => json_encode($this->faker->randomElements(
                ['WiFi', 'TV', 'AC', 'Breakfast', 'Mini Bar', 'Hot Shower'],
                rand(2, 4)
            )),
            'status' => $this->faker->randomElement(['Available', 'Booked', 'Not Available']),
        ];
    }
}
