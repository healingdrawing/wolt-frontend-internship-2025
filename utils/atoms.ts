import { atom } from 'jotai'
import { type Static_Venue_Data, type Dynamic_Venue_Data } from './types'

// selected slug
export const selected_slug_atom = atom<string | null>(null)

// hold a Map for static data, to prevent refetching
export const static_data_atom = atom<Map<string, Static_Venue_Data>>(new Map())

// dynamic data will be refetched every slug selection event
export const dynamic_data_atom = atom<Dynamic_Venue_Data | null>(null)

/** user latitude and longitude */
export const user_coordinates_atom =
atom<{ latitude: string; longitude: string }>({
  latitude: '',
  longitude: '',
})

export const cart_value_atom = atom<number | null>(null)
