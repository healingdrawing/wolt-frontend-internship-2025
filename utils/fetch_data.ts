
export const fetch_static_data = async (slug: string): Promise<any> => {
  const safe_slug = encodeURIComponent(slug.toLocaleLowerCase())
  const url = process.env.TARGET === 'pro'?
  `https://consumer-api.development.dev.woltapi.com/home-assignment-api/v1/venues/home-assignment-venue-${safe_slug}/static`
  :`http://localhost:5000/https://consumer-api.development.dev.woltapi.com/home-assignment-api/v1/venues/home-assignment-venue-${safe_slug}/static`

  const response = await fetch(url)
  
  if (!response.ok) throw new Error('Failed to fetch static data')
  
  return response.json()
}

export const fetch_dynamic_data = async (slug: string): Promise<any> => {
  const safe_slug = encodeURIComponent(slug.toLocaleLowerCase())
  const url = process.env.TARGET === 'pro'?
  `https://consumer-api.development.dev.woltapi.com/home-assignment-api/v1/venues/home-assignment-venue-${safe_slug}/dynamic`
  :`http://localhost:5000/https://consumer-api.development.dev.woltapi.com/home-assignment-api/v1/venues/home-assignment-venue-${safe_slug}/dynamic`

  const response = await fetch(url)
  if (!response.ok) throw new Error('Failed to fetch dynamic data')
  const json = await response.json()
  console.log(json, "dynamic json")
  return json
}
