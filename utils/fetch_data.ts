
export const fetch_static_data = async (slug: string): Promise<any> => {
  const safe_slug = encodeURIComponent(slug.toLocaleLowerCase())
  const url = process.env.TARGET === 'pro'?
  `https://consumer-api.development.dev.woltapi.com/home-assignment-api/v1/venues/home-assignment-venue-${safe_slug}/static`
  :`http://localhost:5000/https://consumer-api.development.dev.woltapi.com/home-assignment-api/v1/venues/home-assignment-venue-${safe_slug}/static`

  try {
    const response = await fetch(url);

    if (!response.ok) {
      const errorMessage = `Error: ${response.status} - ${response.statusText}`;
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      alert('An error occurred while fetching static data.\nPlease try again later or contact support.\n\n'+ error.toString())
    } else {
      alert('Fetching static data: An unexpected error occurred. Please try again later.')
    }

    throw error
  }
}

export const fetch_dynamic_data = async (slug: string): Promise<any> => {
  const safe_slug = encodeURIComponent(slug.toLocaleLowerCase())
  const url = process.env.TARGET === 'pro'?
  `https://consumer-api.development.dev.woltapi.com/home-assignment-api/v1/venues/home-assignment-venue-${safe_slug}/dynamic`
  :`http://localhost:5000/https://consumer-api.development.dev.woltapi.com/home-assignment-api/v1/venues/home-assignment-venue-${safe_slug}/dynamic`

  try {
    const response = await fetch(url);

    if (!response.ok) {
      const errorMessage = `Error: ${response.status} - ${response.statusText}`;
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      alert('An error occurred while fetching dynamic data.\nPlease try again later or contact support.\n\n'+ error.toString())
    } else {
      alert('Fetching dynamic data: An unexpected error occurred. Please try again later.')
    }

    throw error
  }
}
