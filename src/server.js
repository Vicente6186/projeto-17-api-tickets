import http from "http";
import { parseBody, parseRoute } from "./middlewares/parserMiddlewares.js";
import { routes } from "./routes/routes.js";

http.createServer(async (request, response) => {
  try {
    await parseBody(request)

    const route = parseRoute({routes, request, response})

    if(route) route.handler(request, response);
    else response.writeHead(404).end()
  } catch (error) {
    console.log('Erro', error)
  }
}).listen(3000);

