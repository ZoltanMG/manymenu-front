export async function fetchToApi(request) {
    const url = "http://127.0.0.1:5000"
    const headers = { 'Content-Type': 'application/json' }
    const init = request.method === "GET" ?
        {
            method: request.method,
            headers: headers,
        } :
        {
            method: request.method,
            body: request.body,
            headers: headers,
        }
    const response = await fetch(`${url}${request.endpoint}`, init)
    return await response.json()
}