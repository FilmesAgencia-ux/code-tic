import indexHTML from './index.html?raw';

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
      // Retorna o HTML lido do arquivo
      return new Response(indexHTML, {
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
