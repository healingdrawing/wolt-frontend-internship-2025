import { describe, it, expect } from 'bun:test';
import { calculate_distance } from './distance'; // Adjust the import path accordingly

describe('Distance Calculation', () => {
  it('calculates the distance between two coordinates correctly', () => {
    // coordinates for Helsinki from static api provided for assignment. The API returns longitude as first param instead of expected latitude(sorted alphabetically in case of named parameters).
    const venue_latitude = 60.17012143
    const venue_longitude = 24.92813512

    // coordinates of user from https://github.com/woltapp/frontend-internship-2025?tab=readme-ov-file#example
    const user_latitude = 60.17094
    const user_longitude = 24.93087

    // Expected output from https://github.com/woltapp/frontend-internship-2025?tab=readme-ov-file#example
    const expected_distance = 177

    // Calculate distance
    const calculated_distance = calculate_distance(
      user_latitude, user_longitude,
      venue_latitude, venue_longitude,
    )

    // Compare the output with the expected result
    expect(calculated_distance).toBe(expected_distance)
  })
})
