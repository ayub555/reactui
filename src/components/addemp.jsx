import './style.css'
import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import stateService from '../services/stateService'
import educationService from '../services/educationService'
import employeeService from '../services/employeeService'

function AddEmp()
{
    const today = new Date().toISOString().split('T')[0]

    //Close button logic start
    const navigate = useNavigate()

    function handleClose()
    {
        navigate('/')
    }
    
    //States list
    // holds the list of states fetched from the API
    const [states, setStates] = useState([])

    // fetch the states once when the page loads
    useEffect(() => {
        stateService.getStates()
            .then((data) => setStates(data))
            .catch((error) => console.error('Failed to load states:', error))
    }, [])

    //Education List
    // holds the list of education options fetched from the API
    const [educations, setEducations] = useState([])

    // fetch the education options once when the page loads
    useEffect(() => {
        educationService.getEducations()
            .then((data) => setEducations(data))
            .catch((error) => console.error('Failed to load education options:', error))
    }, [])

    //Binding the data to input fields
    // refs to read the value of each mandatory field
    const firstNameRef = useRef(null)
    const surnameRef = useRef(null)
    const jobRef = useRef(null)
    const phoneNoRef = useRef(null)
    const emailIdRef = useRef(null)
    const stateRef = useRef(null)
    const educationRef = useRef(null)
    const dobRef = useRef(null)
    const joiningDateRef = useRef(null)

    // holds the error message for each field, empty string means no error
    const [errors, setErrors] = useState({})

    // holds the success message shown in the footer after saving
    const [successMessage, setSuccessMessage] = useState('')

    //Validations & Save the data
    function handleSave()
    {
        const newErrors = {}

        if (!firstNameRef.current.value.trim()) {
            newErrors.firstName1 = 'First Name is required.'
        }
        if (!surnameRef.current.value.trim()) {
            newErrors.surname = 'Surname is mandatory'
        }
        if (!phoneNoRef.current.value.trim()) {
            newErrors.phoneNo = 'Phone No is mandatory'
        }
        if (!emailIdRef.current.value.trim()) {
            newErrors.emailId = 'Email Id is mandatory'
        }
        if (!educationRef.current.value.trim()) {
            newErrors.education = 'Education is mandatory'
        }
        if (!dobRef.current.value.trim()) {
            newErrors.dob = 'Date of Birth is mandatory'
        }
        if (!joiningDateRef.current.value.trim()) {
            newErrors.joiningDate = 'Joining Date is mandatory'
        }

        setErrors(newErrors)

        //Call addEmploye API
        // if there are no errors, the form is valid and can be saved
        if (Object.keys(newErrors).length === 0) {

          //Prepare JSON Object
            const employee = {
                firstname: firstNameRef.current.value,
                surname: surnameRef.current.value,
                job: jobRef.current.value,
                phoneno: phoneNoRef.current.value,
                emailId: emailIdRef.current.value,
                education: Number(educationRef.current.value),
                state: Number(stateRef.current.value),
                dob: dobRef.current.value,
                joindate: joiningDateRef.current.value
            }

            employeeService.addEmployee(employee).then(() => {
                setSuccessMessage('New employee1 added successfully.')
            })
        }
    }

    return <div class="card card-home">
  <div class="card-header text-left">
    New Employee
   </div>
  <div class="card-body text-center border">
    <div class="row mb-3 align-items-center">
      <div class="col-2"></div>
      <div class="col-3 col-form-label text-start">
        <label for="firstName" >First Name</label>
      </div>
      <div class="col-5">
        <input type="text" class="form-control" id="firstName" placeholder="Enter first name" ref={firstNameRef}></input>
        {errors.firstName1 && <div class="text-danger text-start">{errors.firstName1}</div>}
      </div>
      <div class="col-2"></div>
    </div>
    <div class="row mb-3 align-items-center">
      <div class="col-2"></div>
      <label for="surname" class="col-3 col-form-label text-start">Surname</label>
      <div class="col-5">
        <input type="text" class="form-control" id="surname" placeholder="Enter surname" ref={surnameRef}></input>
        {errors.surname && <div class="text-danger text-start">{errors.surname}</div>}
      </div>
      <div class="col-2"></div>
    </div>
    <div class="row mb-3 align-items-center">
      <div class="col-2"></div>
      <label for="job" class="col-3 col-form-label text-start">Job</label>
      <div class="col-5">
        <input type="text" class="form-control" id="job" placeholder="Enter job title" ref={jobRef}></input>
      </div>
      <div class="col-2"></div>
    </div>
    <div class="row mb-3 align-items-center">
      <div class="col-2"></div>
      <label for="phoneNo" class="col-3 col-form-label text-start">Phone No</label>
      <div class="col-5">
        <input type="tel" class="form-control" id="phoneNo" placeholder="Enter phone number" ref={phoneNoRef}></input>
        {errors.phoneNo && <div class="text-danger text-start">{errors.phoneNo}</div>}
      </div>
      <div class="col-2"></div>
    </div>
    <div class="row mb-3 align-items-center">
      <div class="col-2"></div>
      <label for="emailId" class="col-3 col-form-label text-start">Email Id</label>
      <div class="col-5">
        <input type="email" class="form-control" id="emailId" placeholder="Enter email id" ref={emailIdRef}></input>
        {errors.emailId && <div class="text-danger text-start">{errors.emailId}</div>}
      </div>
      <div class="col-2"></div>
    </div>
    <div class="row mb-3 align-items-center">
      <div class="col-2"></div>
      <label for="state" class="col-3 col-form-label text-start">State</label>
      <div class="col-5">
        <select class="form-select" id="state" ref={stateRef}>
          <option value="">--Select State--</option>
          {states.map((state) => (
            <option key={state.stateid} value={state.stateid}>{state.statename}</option>
          ))}
        </select>
      </div>
      <div class="col-2"></div>
    </div>
    <div class="row mb-3 align-items-center">
      <div class="col-2"></div>
      <label for="education" class="col-3 col-form-label text-start">Education</label>
      <div class="col-5">
        <select class="form-select" id="education" ref={educationRef}>
          <option value="">--Select Education--</option>
          {educations.map((edu) => (
            <option key={edu.eduId} value={edu.eduId}>{edu.education}</option>
          ))}
        </select>
        {errors.education && <div class="text-danger text-start">{errors.education}</div>}
      </div>
      <div class="col-2"></div>
    </div>
    <div class="row mb-3 align-items-center">
      <div class="col-2"></div>
      <label for="dob" class="col-3 col-form-label text-start">Date of Birth</label>
      <div class="col-5">
        <input type="date" class="form-control" id="dob" ref={dobRef}></input>
        {errors.dob && <div class="text-danger text-start">{errors.dob}</div>}
      </div>
      <div class="col-2"></div>
    </div>
    <div class="row mb-3 align-items-center">
      <div class="col-2"></div>
      <label for="joiningDate" class="col-3 col-form-label text-start">Joining Date</label>
      <div class="col-5">
        <input type="date" class="form-control" id="joiningDate" defaultValue={today} ref={joiningDateRef}></input>
        {errors.joiningDate && <div class="text-danger text-start">{errors.joiningDate}</div>}
      </div>
      <div class="col-2"></div>
    </div>
  </div>
  <div class="card-footer text-body-secondary">
    <div class="row">
      <div class="col-md-6">
        {successMessage && <div class="text-success mt-2">{successMessage}</div>}
      </div>
      <div class="col-md-6 align-items-left">
        <input type="button" class="btn btn-primary me-2" value="Save" onClick={handleSave}></input>
        <input type="button" class="btn btn-warning" value="Close" onClick={handleClose}></input>
      </div>
    </div>
    
  </div>
</div>

}

export default AddEmp