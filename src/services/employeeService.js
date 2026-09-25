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

// calls the employees API and returns the list of all employees
async function getEmployees() {
    const response = await fetch(`${BASE_URL}/employees/`)
    return response.json()
}

// calls the employees API and returns a single employee by id
async function getEmployeeById(id) {
    const response = await fetch(`${BASE_URL}/employees/${id}`)
    return response.json()
}

// calls the employees API and returns the list of employees with state and education names included
async function getEmployeeDetails() {
    const response = await fetch(`${BASE_URL}/employees/details`)
    return response.json()
}

// calls the employees API to update an existing employee
async function updateEmployee(id, employee) {
    const response = await fetch(`${BASE_URL}/employees/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(employee)
    })
    return response.json()
}

// calls the employees API to delete an employee, the API returns no content on success
async function deleteEmployee(id) {
    await fetch(`${BASE_URL}/employees/${id}`, {
        method: 'DELETE'
    })
}

export default { addEmployee, getEmployees, getEmployeeById, getEmployeeDetails, updateEmployee, deleteEmployee }
