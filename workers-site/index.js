addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  try {
    if (request.method === 'POST') {
      const data = await request.json()
      const responseMessage = `Recebi sua mensagem: ${data.message || 'vazio'}`
      return new Response(JSON.stringify({ reply: responseMessage }), {
        headers: { 'Content-Type': 'application/json' },
        status: 200
      })
    } else if (request.method === 'GET') {
      const html = await getIndexHtml()
      return new Response(html, {
        headers: { 'Content-Type': 'text/html' },
        status: 200
      })
    } else {
      return new Response('Método não suportado', { status: 405 })
    }
  } catch (err) {
    return new Response(`Erro: ${err.message}`, { status: 500 })
  }
}

async function getIndexHtml() {
  return `<!DOCTYPE html>
  <html lang="pt-BR">
    <head>
      <meta charset="UTF-8" />
      <title>Bem-vindo ao Code-TIC</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; }
        header { background-color: #333; color: white; padding: 10px 0; text-align: center; }
        main { padding: 20px; }
        footer { background-color: #333; color: white; text-align: center; padding: 10px 0; position: fixed; width: 100%; bottom: 0; }
      </style>
    </head>
    <body>
      <header>
        <h1>Bem-vindo ao Code-TIC</h1>
      </header>
      <main>
        <p>Este é o seu site hospedado no Cloudflare Workers.</p>
        <p>Você pode enviar requisições POST com JSON para interagir com o bot.</p>
      </main>
      <footer>
        <p>&copy; 2025 Code-TIC</p>
      </footer>
    </body>
  </html>`
}
