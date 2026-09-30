const BASE_URL = 'http://127.0.0.1:8000'

// calls the authenticateuser API to validate a username and password, returns true/false
async function authenticateUser(username, password) {
    const response = await fetch(`${BASE_URL}/authenticateuser`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    return response.json()
}

export default { authenticateUser }
