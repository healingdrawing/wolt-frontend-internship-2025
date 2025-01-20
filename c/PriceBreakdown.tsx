import React, { useEffect, useState } from 'react'
import { useAtomValue } from 'jotai'
import {selected_slug_atom, static_data_atom, dynamic_data_atom, cart_value_atom, user_coordinates_atom } from '../utils/atoms'
import { type Delivery_Price_Result } from '../utils/types'
import { calculate_delivery_price } from '../utils/delivery_price'

const DeliveryPrice: React.FC = () => {

  const [result, setResult] = useState<Delivery_Price_Result>(); // Adjust the type as necessary
  const slug = useAtomValue(selected_slug_atom)
  const static_data = useAtomValue(static_data_atom)
  const dynamic_data = useAtomValue(dynamic_data_atom)
  const cart_value = useAtomValue(cart_value_atom)
  const user_coordinates = useAtomValue(user_coordinates_atom)

  useEffect(() => {
    
    if (slug && static_data.has(slug)
      && dynamic_data_atom !== null
      && cart_value !== null
      && user_coordinates.latitude !== ''
      && user_coordinates.longitude !== ''
    ) {
      const slug_static_data = static_data.get(slug) !== undefined?static_data.get(slug):null
      if (!slug_static_data || !dynamic_data) return
      const deliveryPriceResult = calculate_delivery_price(
        slug_static_data,
        dynamic_data,
        cart_value,
        parseFloat(user_coordinates.latitude),
        parseFloat(user_coordinates.longitude)
      )
      setResult(deliveryPriceResult)
    }
  }, [ slug, static_data, dynamic_data, cart_value, user_coordinates ])

  return (
    <div>
      { result?.error ? (
        <div>
          <h2>Price breakdown</h2>
          <p>Cart Value: {result.cart_value} EUR</p>
          <p>Delivery Distance: {result.delivery_distance} m</p>
          <p>{result.error}</p>
        </div>
      ) : (
        <div>
          <h2>Price breakdown</h2>
          {result !== undefined && (
          <>
          <p>Cart Value: {result.cart_value} EUR</p>
          <p>Small Order Surcharge: {result.small_order_surcharge} EUR</p>
          <p>Delivery Fee: {result.delivery_fee} EUR</p>
          <p>Delivery Distance: {result.delivery_distance} m</p>
          <p>Total Price: {result.total_price} EUR</p>
          </>
        )}
        </div>
      )}
    </div>
  )
}

export default DeliveryPrice