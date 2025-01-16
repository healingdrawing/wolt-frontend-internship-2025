import React, { useEffect } from 'react'
import { simulate_tab_event } from '../utils/tab'
import { custom_alert_for_input } from "../utils/alert"

const VenueSlugSelector: React.FC = () => {
  // Dummy fetch venue slug tails, as cities
  const fetch_slug_tails = (): string[] => {
      // Simulated local JSON string
      const jsonString = '["Helsinki", "Tallin", "Helsinki", "Tallin"]'
      return JSON.parse(jsonString) // JSON string into an string array
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

  const check_input_value = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.value = slug_tails.find(tail =>
      tail.toLocaleLowerCase() === e.target.value.toLocaleLowerCase()
    ) || ''
    custom_alert_for_input(e)
  }

  const handle_key_up = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      simulate_tab_event(e.currentTarget)
    }
  }

  // fill datalist when the component mounts, using slag_tails dummy data
  useEffect(() => { fill_datalist_tag() }, [])

  return (
    <div>
      <label htmlFor='venue-slug'>Select Venue Slug:</label>
      <input
        type='text'
        id='venue-slug'
        list='venue-options'
        placeholder='Start typing...'
        data-test-id='venue-slug-input' // Set data-test-id for testing
        onKeyUp={handle_key_up}
        onBlur={check_input_value}
      />
      <datalist id='venue-options' />
    </div>
  );
};

export default VenueSlugSelector
