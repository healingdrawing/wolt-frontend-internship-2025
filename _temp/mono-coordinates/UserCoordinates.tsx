import React, { useState, useRef, useEffect } from 'react'
import { useAtom } from 'jotai'
import { user_coordinates_atom } from '../utils/atoms'
import { custom_alert_for_float_input } from '../utils/alert'
import { simulate_tab_event } from '../utils/tab'


const UserCoordinates: React.FC = () => {
  const input_latitude_ref = useRef<HTMLInputElement>(null) //geo/ip -> value
  const input_longitude_ref = useRef<HTMLInputElement>(null)
  const [coordinates, set_coordinates] = useAtom(user_coordinates_atom)
  const [is_ip_location_disabled, set_is_ip_location_disabled] = useState(false)

  /** Regex for validating coordinates during input and so */
  const minus_numbers_period_regex = /^-?(\d+)?(\.)?(\d+)?$/
  /** to allow input, without black magic. -.5 etc */
  const wait_list = ['.','-','-.','.-']

  /** refresh and check both at once on screen, since it is used after geo/ip only */
  const refresh_location_inputs = () => {
    if (
      input_latitude_ref.current && coordinates.latitude
      && input_longitude_ref.current && coordinates.longitude
    ) {
      input_latitude_ref.current.value = coordinates.latitude.toString()
      input_longitude_ref.current.value = coordinates.longitude.toString()
    } else {
      console.error("fetch location from ip error",input_latitude_ref, input_longitude_ref,coordinates)
    }
  }

  /** Function to get coordinates from IP, using remote service */
  const get_coordinates_from_ip = async () => {
    try {
      const response = await fetch('https://ipapi.co/json/')

      if (!response.ok) {
        set_is_ip_location_disabled(true)
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (data.latitude && data.longitude) {
        set_coordinates({
          latitude: data.latitude,
          longitude: data.longitude,
        })
      } else {
        set_is_ip_location_disabled(true)
        throw new Error('Latitude and longitude not found in the response.')
      }
    } catch (error) {
      console.error('Error fetching coordinates:', error)
      set_is_ip_location_disabled(true)
    }
  }

  // handle manually the input change but update atom on blur
  const handle_input_change = (e: React.ChangeEvent<HTMLInputElement>, type: 'latitude' | 'longitude') => {
    const value = e.target.value
    if (minus_numbers_period_regex.test(value) || value === '') {
      if (!wait_list.includes(value)){
        if (type === 'latitude') {
          set_coordinates((prev) => ({ ...prev, latitude: value === '' ? null: value}))
        } else {
          set_coordinates((prev) => ({ ...prev, longitude: value === '' ? null: value}))
        }
      }
    } else {
      if (type === 'latitude') {
        e.target.value = coordinates.latitude === null ? '' : coordinates.latitude.toString()
      } else {
        e.target.value = coordinates.longitude === null ? '' : coordinates.longitude.toString()
      }
    }
  }

  const handle_input_on_blur = (e: React.FocusEvent<HTMLInputElement>, type: 'latitude' | 'longitude') => {
    const value = e.target.value
    if (minus_numbers_period_regex.test(value) && value !== '') {
      if (type === 'latitude') {
        if (!wait_list.includes(value)) set_coordinates((prev) => ({ ...prev, latitude: value === '' ? null: value}));
        else { e.currentTarget.focus() }
        e.target.value = coordinates.latitude === null ? '' : coordinates.latitude.toString()
      } else {
        if (!wait_list.includes(value)) set_coordinates((prev) => ({ ...prev, longitude: value === '' ? null: value}));
        else custom_alert_for_float_input(e)
        e.target.value = coordinates.longitude === null ? '' : coordinates.longitude.toString()
      }
    } else {
      e.target.value = ''
      custom_alert_for_float_input(e)
      console.error('One "-", one ".", numbers "0..9" are allowed')
    }
  };

  const handle_key_up = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      simulate_tab_event(e.currentTarget)
    }
  }

  useEffect(() => {
    if (coordinates.latitude !== null && coordinates.longitude !== null) {
      refresh_location_inputs()
    }
  }, [coordinates])

  return (
    <div>
      <h2>Customer Coordinates</h2>
      <div>
        <button
          title={is_ip_location_disabled ? 'N/A' : ''}
          disabled={is_ip_location_disabled}
          onClick={get_coordinates_from_ip}
        >Get Coordinates from IP</button>
      </div>
      <div className='box-destination'>
        <div className='box-latitude'>
          <label htmlFor='destination-latitude'>destination latitude:</label>
          <input
            type='text'
            title='float or integer number'
            id='destination-latitude'
            placeholder='Enter Latitude'
            pattern={minus_numbers_period_regex.source}
            onChange={(e) => handle_input_change(e, 'latitude')}
            onBlur={(e) => handle_input_on_blur(e, 'latitude')}
            onKeyUp={(e) => handle_key_up(e)}
            ref={input_latitude_ref}
          />
        </div>
        
        <div className='box-longitude'>
          <label htmlFor='destination-longitude'>destination longitude:</label>
          <input
            type='text'
            title='float or integer number'
            id='destination-longitude'
            placeholder='Enter Longitude'
            onChange={(e) => handle_input_change(e, 'longitude')}
            onBlur={(e) => handle_input_on_blur(e, 'longitude')}
            onKeyUp={(e) => handle_key_up(e)}
            ref={input_longitude_ref}
          />
        </div>
      </div>
    </div>
  )
}

export default UserCoordinates
