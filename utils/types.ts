export interface Static_Venue_Data {
  coordinates: number[]  
}

export interface Distance_Range_Original {
  min: number
  max: number
  a: number
  b: number
  flag: null | any // to drop in parsing time
}

interface Distance_Range {
  min: number
  max: number
  a: number
  b: number
}

export interface Dynamic_Venue_Data {
  order_minimum_no_surcharge: number
  base_price: number
  distance_ranges: Distance_Range[]
}
