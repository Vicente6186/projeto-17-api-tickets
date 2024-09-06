async function parseBody(request) {
    let body = ''
    
    for await (const chunk of request) {
        body += chunk
    }

    request.body = body ? JSON.parse(body) : null
}

function parseRoute({routes, request, response}) {
    return routes.find(route => {
        if(request.method !== route.method) return false

        let [requestPath, requestQuery] = request.url.split('?')
        const requestPathParts = requestPath.split('/').filter(Boolean)
        const routePathParts = route.path.split('/').filter(Boolean)

        if(requestPathParts.length !== routePathParts.length) return false
        
        const requestParams = {}
        for (const index in routePathParts) {
            if(routePathParts[index].includes(':')) {
                const key = routePathParts[index].replace(':', '')
                requestParams[key] = requestPathParts[index]
            } else if(requestPathParts[index] !== routePathParts[index]) return false
        }

        request.params = requestParams
        
        if(requestQuery) {
            requestQuery = requestQuery.split('&').reduce((prev, current)=> {
                const [key, value] = current.split('=')
                return {...prev, [key]: value}
            }, {})
        }

        request.query = requestQuery

        return true
    })
}

export { parseBody, parseRoute }