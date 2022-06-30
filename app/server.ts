import http from 'http'
import fs from 'fs'
import path from 'path'

interface MimeTypes {
  [key: string]: string
}

const PORT = 8125

const server = http.createServer((request, response) => {
  console.log('request', request.url)

  let filePath = `.${request.url}`

  if (filePath === './') {
    filePath = 'public/index.html'
  }

  const extname = String(path.extname(filePath)).toLowerCase()

  const mimeTypes: MimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript'
  }

  const contentType = mimeTypes[extname] || 'application/octet-stream'

  fs.readFile(filePath, (error, content) => {
    if (error && error.code === 'ENOENT') {
      fs.readFile('./404.html', (_error, content) => {
        response.writeHead(404, { 'Content-Type': 'text/html' })
        response.end(content, 'utf-8')
      })
    }

    if (error) {
      response.writeHead(500)
      response.end('Sorry, check with site admin for error: ' + error.code + ' ..\n')
    }

    response.writeHead(200, { 'Content-Type': contentType })
    response.end(content, 'utf-8')
  })
})

server.listen(PORT)
console.log(`Server running at http://127.0.0.1:${PORT}`)
