/** degrees to radians converter */
const deg_to_rad = (deg:number) => deg * Math.PI / 180

/** x in power of two shorthand */
const po2 = (x:number) => Math.pow(x, 2)

/** distance in meters (rounded to nearest integer) between two coordinates (latitude and longitude based). Earth shape is sphere(suitable) */
export const calculate_distance = (
  latitude1: number,
  longitude1: number,
  latitude2: number,
  longitude2: number,
): number => {
  const r = 6371e3 // Earth's radius in meters
  const l1 = deg_to_rad(latitude1)
  const l2 = deg_to_rad(latitude2)
  const dlat21 = deg_to_rad(latitude2 - latitude1)
  const dlon21 = deg_to_rad(longitude2 - longitude1)

  const a = po2(Math.sin(dlat21 / 2)) + Math.cos(l1) * Math.cos(l2) * po2(Math.sin(dlon21 / 2))
  

  const aa = Math.sin(dlat21 / 2) * Math.sin(dlat21 / 2) +
            Math.cos(l1) * Math.cos(l2) *
            Math.sin(dlon21 / 2) * Math.sin(dlon21 / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return Math.round(r * c)
}
