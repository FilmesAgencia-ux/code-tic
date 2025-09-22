addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

/**
 * Função principal para processar as requisições
 * @param {Request} request
 */
async function handleRequest(request) {
  try {
    // Podemos verificar o método da requisição
    if (request.method === 'POST') {
      const data = await request.json()
      
      // Aqui você pode processar os dados e responder
      const responseMessage = `Recebi sua mensagem: ${data.message || 'vazio'}`
      
      return new Response(JSON.stringify({ reply: responseMessage }), {
        headers: { 'Content-Type': 'application/json' },
        status: 200
      })
    } else {
      return new Response('Bot ativo! Envie uma requisição POST com JSON.', {
        status: 200
      })
    }
  } catch (err) {
    return new Response(`Erro: ${err.message}`, { status: 500 })
  }
}
