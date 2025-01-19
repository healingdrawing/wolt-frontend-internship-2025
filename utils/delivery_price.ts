import { calculate_distance } from "./distance"
import type { Delivery_Price_Result, Dynamic_Venue_Data, Static_Venue_Data } from "./types"

export const calculate_delivery_price = (
  static_data: Static_Venue_Data,
  dynamic_data: Dynamic_Venue_Data,
  cart_value: number,
  user_latitude: number,
  user_longitude: number
):Delivery_Price_Result => {
  const venue_coordinates = static_data.coordinates
  const delivery_distance = calculate_distance(user_latitude, user_longitude, venue_coordinates[1], venue_coordinates[0])

  // check for too long distance
  for (const range of dynamic_data.distance_ranges) {
    if (delivery_distance >= range.min && range.max === 0) return {
      cart_value: cart_value.toFixed(2),
      small_order_surcharge: 'N/A',
      delivery_fee: 'N/A',
      delivery_distance: delivery_distance.toString(),
      total_price: 'N/A',
      error: "Delivery is not available for this distance.",
    }      
  }

  let delivery_fee = dynamic_data.base_price/100 //because cents from api
  let small_order_surcharge = Math.max(0, dynamic_data.order_minimum_no_surcharge/100 - cart_value)
  
  let distance_fee = 0
  for (const range of dynamic_data.distance_ranges) {
    if (delivery_distance >= range.min && (range.max === 0 || delivery_distance < range.max)) {
      distance_fee = range.a + (range.b * delivery_distance / 10)
      break
    }
  }

  delivery_fee += distance_fee
  const total_price = (cart_value + small_order_surcharge + delivery_fee).toFixed(2)

  return {
    cart_value: cart_value.toFixed(2),
    small_order_surcharge: small_order_surcharge.toFixed(2),
    delivery_fee: delivery_fee.toFixed(2),
    delivery_distance: delivery_distance.toString(),
    total_price
  }
}
