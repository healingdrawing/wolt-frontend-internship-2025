/** dev server to manage local json data */
const server = Bun.serve({
  port: 5000,
  async fetch(req) {
    const url = new URL(req.url)
    console.log(url.pathname)
    const filePath = `.${url.pathname}`

    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET",
      "Access-Control-Allow-Headers": "Content-Type",
    }

    try {
      const file = await Bun.file(filePath).json();
      return new Response(JSON.stringify(file), {
        headers: headers
      })
    } catch {
      return new Response("File not found", { 
        status: 404,
        headers: headers
      })
    }
  },
})

console.log(`Listening on ${server.url}`)
