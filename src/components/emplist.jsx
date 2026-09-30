import './style.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import employeeService from '../services/employeeService'
import formatDate from '../utils/formatDate'

function EmpList()
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
    Employee List
   </div>
  <div class="card-body text-center border">
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>Emp Id</th>
          <th>First Name</th>
          <th>Surname</th>
          <th>Job</th>
          <th>Phone No</th>
          <th>Email Id</th>
          <th>Education</th>
          <th>State</th>
          <th>DOB</th>
          <th>Join Date</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((emp) => (
          <tr key={emp.EmpId}>
            <td>{emp.EmpId}</td>
            <td>{emp.firstname}</td>
            <td>{emp.surname}</td>
            <td>{emp.job}</td>
            <td>{emp.phoneno}</td>
            <td>{emp.emailId}</td>
            <td>{emp.education}</td>
            <td>{emp.state}</td>
            <td>{formatDate(emp.dob)}</td>
            <td>{formatDate(emp.joindate)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  <div class="card-footer text-body-secondary">
    <input type="button" class="btn btn-warning" value="Close" onClick={handleClose}></input>
  </div>
</div>

}

export default EmpList
