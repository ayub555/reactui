const BASE_URL = 'http://127.0.0.1:8000'

// calls the states API and returns the list of states
async function getStates() {
    const response = await fetch(`${BASE_URL}/states/`)
    return response.json()
}

export default { getStates }
