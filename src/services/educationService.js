const BASE_URL = 'http://127.0.0.1:8000'

// calls the education API and returns the list of education options
async function getEducations() {
    const response = await fetch(`${BASE_URL}/education/`)
    return response.json()
}

export default { getEducations }
