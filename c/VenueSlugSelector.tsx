import React, { useEffect, useRef, useState } from 'react'
import { simulate_tab_event } from '../utils/tab'
import { custom_alert_for_slug_select } from "../utils/alert"
import { useAtom } from 'jotai'
import { type Static_Venue_Data, type Dynamic_Venue_Data, type Distance_Range_Original } from '../utils/types'
import { fetch_static_data, fetch_dynamic_data } from '../utils/fetch_data'
import { static_data_atom, dynamic_data_atom, selected_slug_atom } from '../utils/atoms'

const VenueSlugSelector: React.FC = () => {
  const [, set_selected_slug] = useAtom(selected_slug_atom)
  const [static_data_map, set_static_data_map] = useAtom(static_data_atom)
  const [dynamic_data_obj, set_dynamic_data_obj] = useAtom(dynamic_data_atom)
  const [static_data_fetched, set_static_data_fetched] = useState(false);
  const [dynamic_data_fetched, set_dynamic_data_fetched] = useState(false);
  const input_ref = useRef<HTMLInputElement>(null)
  
  /** Dummy fetch venue slug tails, as cities */
  const fetch_slug_tails = (): string[] => {
      // Simulated local JSON string
      const json_string = '["Helsinki", "Tallinn"]'
      return JSON.parse(json_string) // JSON string into an string array
  }
  const slug_tails: string[] = fetch_slug_tails()

  const fill_datalist_tag = (): void => {
    const datalist = document.querySelector('#venue-options') as HTMLDataListElement
    
    slug_tails.forEach(tail => {
      const option = document.createElement('option')
      option.value = tail // Set the value of the option
      option.setAttribute('data-raw-value', tail) // Set data-raw-value for testing
      datalist.appendChild(option)
    })
  }

  const check_slug = (slug:string) => slug_tails.find(tail =>
    tail.toLocaleLowerCase() === slug.toLocaleLowerCase()
  ) || ''

  /** set @param danger true, to extra check the value of @param raw_slug_tail */
  const fetch_data = async (raw_slug_tail:string, danger:boolean = false) => {
    const slug_tail = danger?check_slug(raw_slug_tail):raw_slug_tail
    if (slug_tail === '') return

    // Check if static data is already fetched
    if (!static_data_map.has(slug_tail)) {
      try {
        const raw = await fetch_static_data(slug_tail)
        const coordinates = raw.venue_raw.location.coordinates
        const staticData: Static_Venue_Data = { coordinates }
        const remap = new Map(static_data_map)
        remap.set(slug_tail, staticData)
        set_static_data_map(remap)
        set_static_data_fetched(true)
      } catch (error) {
        console.log('Error fetching static data:', error)
        set_static_data_fetched(false)
        if (input_ref.current) input_ref.current.value = ''
      }
    } else set_static_data_fetched(true)

    if (dynamic_data_fetched) return
    try {
      const raw = await fetch_dynamic_data(slug_tail)
      const order_minimum_no_surcharge = raw.venue_raw.delivery_specs.order_minimum_no_surcharge
      const base_price = raw.venue_raw.delivery_specs.delivery_pricing.base_price
      const distance_ranges = raw.venue_raw.delivery_specs.delivery_pricing.distance_ranges.map((item: Distance_Range_Original) => {
        const { flag, ...rest } = item
        return rest
      })

      const dynamic_data:Dynamic_Venue_Data = {
        order_minimum_no_surcharge, base_price,
        distance_ranges
      }
      set_dynamic_data_obj(dynamic_data)
      set_dynamic_data_fetched(true)
    } catch (error) {
      console.error('Error fetching dynamic data:', error)
      //todo yes, it is not perfect(not needed), but it is not a time for adventures
      set_dynamic_data_fetched(false)
    }
  }

  const check_input_value = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter' || e.currentTarget.value === '') return
    const slug_tail = check_slug(e.currentTarget.value)
    
    e.currentTarget.value = slug_tail
    custom_alert_for_slug_select(e)
    
    if (slug_tail !== '') {
      set_selected_slug(slug_tail)
      await fetch_data(slug_tail)
    } else {
      set_selected_slug(null)
      set_dynamic_data_obj(null)
      set_static_data_fetched(false)
      set_dynamic_data_fetched(false)
    }
  }

  /** when user interacts with input, extra check needed, to prevent, jump without refetch dynamic data */
  const require_fetch_data = (e: React.ChangeEvent<HTMLInputElement>) => {
    // set_static_data_fetched(false) // checked by key in map
    set_dynamic_data_fetched(false)
  }

  const handle_jump = async (e: React.FocusEvent<HTMLInputElement>) => {
    if (
      !static_data_map.has(e.target.value)
      || !dynamic_data_fetched
    ){
      e.target.focus()
      await fetch_data(e.target.value, true)
    }
  }

  // fill datalist when the component mounts, using slug_tails dummy data
  useEffect(() => {
    fill_datalist_tag()
    if (input_ref.current) input_ref.current.focus()
  }, [])

  useEffect(() => {
    if (static_data_fetched && dynamic_data_fetched) {
      const current_element: HTMLElement | null = input_ref.current
      if (current_element) simulate_tab_event(current_element)
      // set_static_data_fetched(false)
      // set_dynamic_data_fetched(false)
    }
  }, [static_data_fetched, dynamic_data_fetched]);

  useEffect(() => {
    console.log("Current static data map:", static_data_map)
  }, [static_data_map])

  useEffect(() => {
    console.log("Current dynamic data obj:", dynamic_data_obj)
  }, [dynamic_data_obj])

  return (
    <div>
      <label htmlFor='venue-slug'>Choose Venue Slug:</label>
      <input
        type='text'
        title='start typing and select'
        id='venue-slug'
        list='venue-options'
        placeholder='Start typing...'
        data-test-id='venue-slug-input' // Set data-test-id for testing
        onChange={require_fetch_data}
        onKeyUp={check_input_value}
        onBlur={handle_jump}
        ref={input_ref}
      />
      <datalist id='venue-options' />
    </div>
  )
}

export default VenueSlugSelector
