/** degrees to radians converter */
const deg_to_rad = (deg:number) => deg * Math.PI / 180

/** distance in meters (rounded to nearest integer) between two coordinates (latitude and longitude based). Earth shape is sphere(suitable) */
export const calculate_distance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const r = 6371e3 // Earth's radius in meters
  const l1 = deg_to_rad(lat1)
  const l2 = deg_to_rad(lat2)
  const dlat = deg_to_rad(lat2 - lat1)
  const dlon = deg_to_rad(lon2 - lon1)

  const a = Math.sin(dlat / 2) * Math.sin(dlat / 2) +
            Math.cos(l1) * Math.cos(l2) *
            Math.sin(dlon / 2) * Math.sin(dlon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return Math.round(r * c)
}
