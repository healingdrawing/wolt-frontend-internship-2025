import React, { useEffect, useState } from 'react'
import { useAtomValue } from 'jotai'
import {selected_slug_atom, static_data_atom, dynamic_data_atom, cart_value_atom, user_coordinates_atom } from '../utils/atoms'
import { type Delivery_Price_Result } from '../utils/types'
import { calculate_delivery_price } from '../utils/delivery_price'
// import { dformat } from '../debug/debug' // uncomment for monitoring


const DeliveryPrice: React.FC = () => {

  const [result, setResult] = useState<Delivery_Price_Result>(); // Adjust the type as necessary
  const slug = useAtomValue(selected_slug_atom)
  const static_data = useAtomValue(static_data_atom)
  const dynamic_data = useAtomValue(dynamic_data_atom)
  const cart_value = useAtomValue(cart_value_atom)
  const user_coordinates = useAtomValue(user_coordinates_atom)

  useEffect(() => {
    
    if (dynamic_data_atom !== null
      && cart_value !== null
      && user_coordinates.latitude !== ''
      && user_coordinates.longitude !== ''
    ) {
      
      const slug_static_data = static_data.get(slug)
      if (!dynamic_data || slug_static_data === undefined) return
      
      /** delivery price result */
      const dpr = calculate_delivery_price(
        slug_static_data,
        dynamic_data,
        cart_value,
        parseFloat(user_coordinates.latitude),
        parseFloat(user_coordinates.longitude)
      )
      // uncomment for monitoring
      // console.log(dformat( `Price for slug ${slug}`, `${dpr.delivery_distance} m`, `lat:${user_coordinates.latitude} lon:${user_coordinates.longitude}` ))
      setResult(dpr)
    }
  }, [ slug, static_data, dynamic_data, cart_value, user_coordinates ])

  return (
    <>
      <div>
        <h2 className='header'>Price breakdown</h2>
        { result?.error ? (
          <>
            <div className='x3columns'>
              <div>
                <span className='start'>Cart Value:</span>
                <span className='underline'></span>
                <span className='baloo-semibold'>{result.cart_value}</span>
                <span className='baloo-medium'>&nbsp;(EUR)</span>
              </div>
              <div>
                <span className='start'>Delivery Distance:</span>
                <span className='underline'></span>
                <span className='baloo-semibold'>{result.delivery_distance}</span>
                <span className='end baloo-medium'>&nbsp;(m)</span>
              </div>
            </div>
              <p>{result.error}</p>
          </>
        ) : (
          <>
            {result !== undefined && (
            <div className='x3columns'>
              <div>
                <span className='start'>Cart Value:</span>
                <span className='underline'></span>
                <span className='baloo-semibold'>{result.cart_value}</span>
                <span className='baloo-medium'>&nbsp;(EUR)</span>
              </div>
              <div>
                <span className='start'>Small Order Surcharge:</span>
                <span className='underline'></span>
                <span className='end baloo-semibold'>{result.small_order_surcharge}</span>
                <span className='end baloo-medium'>&nbsp;(EUR)</span>
              </div>
              <div>
                <span className='start'>Delivery Fee:</span>
                <span className='underline'></span>
                <span className='baloo-semibold'>{result.delivery_fee}</span>
                <span className='end baloo-medium'>&nbsp;(EUR)</span>
              </div>
              <div>
                <span className='start'>Delivery Distance:</span>
                <span className='underline'></span>
                <span className='baloo-semibold'>{result.delivery_distance}</span>
                <span className='end baloo-medium'>&nbsp;(m)</span>
              </div>
              <div>
                <span className='start'>Total Price:</span>
                <span className='underline'></span>
                <span className='baloo-semibold'>{result.total_price}</span>
                <span className='end baloo-medium'>&nbsp;(EUR)</span>
              </div>
            </div>
          )}
          </>
        )}

        {cart_value !== null && cart_value >= 1000000 && cart_value < 99999999999999?
        (
          <>
            <p>Please consider contacting customer service. It may be beneficial for us to provide you with a personalized delivery service.</p>
          </>
        ) : (
          <></>
        )}

        {cart_value != null && cart_value >= 99999999999999 ?
        (
          <>
            <p>Please consider contacting customer service. If you are the owner of this part of the planet, would you like, after paying for the order, to consider opportunity to accept as a gift the construction of a personal palace on this planet, at our expense?</p>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  )
}

export default DeliveryPrice