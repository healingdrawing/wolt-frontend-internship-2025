import { dformat } from "./debug"

const valid_api_endpoints = [
  "https://consumer-api.development.dev.woltapi.com/home-assignment-api/v1/venues/home-assignment-venue-helsinki/static",
  "https://consumer-api.development.dev.woltapi.com/home-assignment-api/v1/venues/home-assignment-venue-helsinki/dynamic",
  "https://consumer-api.development.dev.woltapi.com/home-assignment-api/v1/venues/home-assignment-venue-tallinn/static",
  "https://consumer-api.development.dev.woltapi.com/home-assignment-api/v1/venues/home-assignment-venue-tallinn/dynamic",
]

/** try tocut http://localhost... prefix */
const trim_dev_prefix = (raw:string, prefix:string):string => raw.indexOf(server.url.toString()) === 0 ? raw.slice(prefix.length) : raw

/** dev server to fetch data from external API */
const server = Bun.serve({
  port: 5000,
  async fetch(req) {

    const endpoint = trim_dev_prefix(req.url, server.url.toString())
    const url = new URL(endpoint)
    console.log("url.pathname",url.pathname)
    console.log("endpoint",endpoint)

    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET",
      "Access-Control-Allow-Headers": "Content-Type",
    }

    
    
    // Check if the request is for one of the API endpoints
    if (valid_api_endpoints.includes(endpoint)) {
      console.log(dformat("fetching data from dev api", endpoint))
      try {
        const apiResponse = await fetch(endpoint);
        if (!apiResponse.ok) {
          return new Response("Error fetching data from API", {
            status: apiResponse.status,
            headers: headers,
          })
        }
        const data = await apiResponse.json();
        return new Response(JSON.stringify(data), {
          headers: headers,
        })
      } catch (error) {
        console.error("Development server fetch error:", error);
        return new Response("Error fetching data from API", {
          status: 500,
          headers: headers,
        })
      }
    }

    // Handle 404 for other routes
    return new Response("Not Found", {
      status: 404,
      headers: headers,
    })
  },
})

console.log(`Development Server Listening on ${server.url}`)
