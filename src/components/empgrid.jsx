import './style.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import employeeService from '../services/employeeService'
import formatDate from '../utils/formatDate'

function EmpGrid()
{
    const navigate = useNavigate()

    function handleClose()
    {
        navigate('/home')
    }

    // holds the list of employees fetched from the API
    const [employees, setEmployees] = useState([])

    // fetch the employees once when the page loads
    useEffect(() => {
        employeeService.getEmployees()
            .then((data) => setEmployees(data))
            .catch((error) => console.error('Failed to load employees:', error))
    }, [])

    return <div class="card card-home">
  <div class="card-header text-left">
    Employee Grid
   </div>
  <div class="card-body border">
    <div class="row row-cols-1 row-cols-md-3 g-3">
      {employees.map((emp) => (
        <div class="col" key={emp.EmpId}>
          <div class="card h-100">
            <div class="card-body">
              <h5 class="card-title">{emp.firstname} {emp.surname}</h5>
              <p class="card-text mb-1">Job: {emp.job}</p>
              <p class="card-text mb-1">Phone No: {emp.phoneno}</p>
              <p class="card-text mb-1">Email Id: {emp.emailId}</p>
              <p class="card-text mb-1">Date of Birth: {formatDate(emp.dob)}</p>
              <p class="card-text mb-0">Joining Date: {formatDate(emp.joindate)}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
  <div class="card-footer text-body-secondary">
    <input type="button" class="btn btn-warning" value="Close" onClick={handleClose}></input>
  </div>
</div>

}

export default EmpGrid
