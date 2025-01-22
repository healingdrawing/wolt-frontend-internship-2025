import { describe, it, expect, beforeEach, mock } from 'bun:test'
import { render, fireEvent, waitFor } from '@testing-library/react'
import VenueSlugSelector from './VenueSlugSelector'


// mocking the fetch functions, we do not need internet dependencies in automation testing time
const mock_fetch_static_data = mock(async () => {
  return {
    venue_raw: { location: { coordinates: [60.1695, 24.9354] } }
  }
})

const mock_fetch_dynamic_data = mock(async () => {
  return {
    venue_raw: {
      delivery_specs: {
        order_minimum_no_surcharge: 10,
        delivery_pricing: {
          base_price: 5,
          distance_ranges: [],
        },
      },
    },
  }
})

mock.module("../../utils/fetch_data", () => ({
  fetch_static_data: mock_fetch_static_data,
  fetch_dynamic_data: mock_fetch_dynamic_data
}))


describe('VenueSlugSelector Component', () => {
  beforeEach(() => {
    mock_fetch_static_data.mockClear()
    mock_fetch_dynamic_data.mockClear()
  })

  it('renders the input and datalist', () => {
    const { getByPlaceholderText } = render(<VenueSlugSelector />)
    expect(getByPlaceholderText('Type or select venue slug')).toBeDefined()
    expect(document.getElementById('venue-slug-input-list')).toBeDefined()
  })

  it('fetches static data on input blur', async () => {
    const { getByPlaceholderText } = render(<VenueSlugSelector />)
    const input = getByPlaceholderText('Type or select venue slug') as HTMLInputElement

    fireEvent.change(input, { target: { value: 'Helsinki' } })
    fireEvent.blur(input)

    mock_fetch_static_data.mockResolvedValueOnce({
      venue_raw: { location: { coordinates: [60.1695, 24.9354] } },
    })

    await waitFor(() => {
      expect(mock_fetch_static_data).toHaveBeenCalledWith('Helsinki')
    })
  })

  it('handles errors during static data fetching', async () => {
    const { getByPlaceholderText } = render(<VenueSlugSelector />)
    const input = getByPlaceholderText('Type or select venue slug') as HTMLInputElement

    fireEvent.change(input, { target: { value: 'Helsinki' } })
    fireEvent.blur(input)

    mock_fetch_static_data.mockImplementationOnce(() => {
      return Promise.reject(new Error('Fetch error'))
    })

    await waitFor(() => {
      /* since static implementation checks the data presence, before fetch, the function will not be executed, since data already fetched in previous case, and key is already present in the map */
      expect(mock_fetch_static_data).not.toHaveBeenCalledWith('Helsinki')
      expect(input.value).toBe('Helsinki')
      expect(document.activeElement).toBe(input) //still focused since implementation returns focus back if onblur failed to fetch
    })
  })

  it('fetches dynamic data on Enter key press', async () => {
    const { getByPlaceholderText } = render(<VenueSlugSelector />)
    const input = getByPlaceholderText('Type or select venue slug') as HTMLInputElement

    fireEvent.change(input, { target: { value: 'Helsinki' } })
    fireEvent.keyUp(input, { key: 'Enter' })

    mock_fetch_dynamic_data.mockResolvedValueOnce({
      venue_raw: {
        delivery_specs: {
          order_minimum_no_surcharge: 10,
          delivery_pricing: {
            base_price: 5,
            distance_ranges: [],
          },
        },
      },
    })

    await waitFor(() => {
      expect(mock_fetch_dynamic_data).toHaveBeenCalledWith('Helsinki')
      expect(input.value).toBe('Helsinki')
    })
  })

  it('handles errors during dynamic data fetching', async () => {
    const { getByPlaceholderText } = render(<VenueSlugSelector />)
    const input = getByPlaceholderText('Type or select venue slug') as HTMLInputElement

    fireEvent.change(input, { target: { value: 'Helsinki' } })
    fireEvent.keyUp(input, { key: 'Enter' })

    mock_fetch_dynamic_data.mockImplementationOnce(() => {
      return Promise.reject(new Error('Fetch error'))
    })

    await waitFor(() => {
      /** dynamic data fetched anyways, so behavior is different vs static case */
      expect(mock_fetch_dynamic_data).toHaveBeenCalledWith('Helsinki')
      expect(input.value).toBe('Helsinki')
      expect(document.activeElement).toBe(input)
    })
  })
})
