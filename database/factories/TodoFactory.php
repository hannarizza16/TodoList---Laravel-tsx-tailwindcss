<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class TodoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'task' => fake()->sentence(3),
            'completed_at' => fake()->optional()->dateTimeThisMonth(),
            'is_completed' => fake()->boolean(50),
        ];
    }
}
