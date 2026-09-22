const BASE_URL = 'http://127.0.0.1:8000'

// calls the employees API to insert a new employee
async function addEmployee(employee) {
    const response = await fetch(`${BASE_URL}/employees/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(employee)
    })
    return response.json()
}

export default { addEmployee }
