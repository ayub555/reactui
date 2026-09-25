import './style.css'
import { useState, useRef, useEffect } from 'react'
import stateService from '../services/stateService'
import educationService from '../services/educationService'
import employeeService from '../services/employeeService'

function EditEmp({ employee, onClose, onSaved })
{
    // holds the list of states fetched from the API
    const [states, setStates] = useState([])

    // holds the list of education options fetched from the API
    const [educations, setEducations] = useState([])

    // refs to read the value of each mandatory field, pre-filled from the selected employee
    const firstNameRef = useRef(null)
    const surnameRef = useRef(null)
    const jobRef = useRef(null)
    const phoneNoRef = useRef(null)
    const emailIdRef = useRef(null)
    const stateRef = useRef(null)
    const educationRef = useRef(null)
    const dobRef = useRef(null)
    const joiningDateRef = useRef(null)

    // fetch the states once when the popup loads
    useEffect(() => {
        stateService.getStates()
            .then((data) => setStates(data))
            .catch((error) => console.error('Failed to load states:', error))
    }, [])

    // fetch the education options once when the popup loads
    useEffect(() => {
        educationService.getEducations()
            .then((data) => setEducations(data))
            .catch((error) => console.error('Failed to load education options:', error))
    }, [])

    // the state dropdown has no options yet on first render, so select the
    // employee's state only after the options have loaded in
    useEffect(() => {
        if (states.length > 0) {
            stateRef.current.value = employee.state
        }
    }, [states])

    // same reason as above, education options load in after first render
    useEffect(() => {
        if (educations.length > 0) {
            educationRef.current.value = employee.education
        }
    }, [educations])

    // holds the error message for each field, empty string means no error
    const [errors, setErrors] = useState({})

    // holds the success message shown after saving
    const [successMessage, setSuccessMessage] = useState('')

    function handleSave()
    {
        const newErrors = {}

        if (!firstNameRef.current.value.trim()) {
            newErrors.firstName = 'First Name is mandatory'
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

        // if there are no errors, the form is valid and can be saved
        if (Object.keys(newErrors).length === 0) {
            const updatedEmployee = {
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

            employeeService.updateEmployee(employee.EmpId, updatedEmployee).then(() => {
                setSuccessMessage('Employee updated successfully.')
                onSaved()
            })
        }
    }

    return <>
      <div class="modal d-block" tabindex="-1">
        <div class="modal-dialog modal-lg">
          <div class="modal-content card-home">
            <div class="modal-header">
              <h5 class="modal-title">Edit Employee</h5>
              <button type="button" class="btn-close" onClick={onClose}></button>
            </div>
            <div class="modal-body text-center">
              <div class="row mb-3 align-items-center">
                <div class="col-2"></div>
                <label for="firstName" class="col-3 col-form-label text-start">First Name</label>
                <div class="col-5">
                  <input type="text" class="form-control" id="firstName" defaultValue={employee.firstname} ref={firstNameRef}></input>
                  {errors.firstName && <div class="text-danger text-start">{errors.firstName}</div>}
                </div>
                <div class="col-2"></div>
              </div>
              <div class="row mb-3 align-items-center">
                <div class="col-2"></div>
                <label for="surname" class="col-3 col-form-label text-start">Surname</label>
                <div class="col-5">
                  <input type="text" class="form-control" id="surname" defaultValue={employee.surname} ref={surnameRef}></input>
                  {errors.surname && <div class="text-danger text-start">{errors.surname}</div>}
                </div>
                <div class="col-2"></div>
              </div>
              <div class="row mb-3 align-items-center">
                <div class="col-2"></div>
                <label for="job" class="col-3 col-form-label text-start">Job</label>
                <div class="col-5">
                  <input type="text" class="form-control" id="job" defaultValue={employee.job} ref={jobRef}></input>
                </div>
                <div class="col-2"></div>
              </div>
              <div class="row mb-3 align-items-center">
                <div class="col-2"></div>
                <label for="phoneNo" class="col-3 col-form-label text-start">Phone No</label>
                <div class="col-5">
                  <input type="tel" class="form-control" id="phoneNo" defaultValue={employee.phoneno} ref={phoneNoRef}></input>
                  {errors.phoneNo && <div class="text-danger text-start">{errors.phoneNo}</div>}
                </div>
                <div class="col-2"></div>
              </div>
              <div class="row mb-3 align-items-center">
                <div class="col-2"></div>
                <label for="emailId" class="col-3 col-form-label text-start">Email Id</label>
                <div class="col-5">
                  <input type="email" class="form-control" id="emailId" defaultValue={employee.emailId} ref={emailIdRef}></input>
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
                  <input type="date" class="form-control" id="dob" defaultValue={employee.dob} ref={dobRef}></input>
                  {errors.dob && <div class="text-danger text-start">{errors.dob}</div>}
                </div>
                <div class="col-2"></div>
              </div>
              <div class="row mb-3 align-items-center">
                <div class="col-2"></div>
                <label for="joiningDate" class="col-3 col-form-label text-start">Joining Date</label>
                <div class="col-5">
                  <input type="date" class="form-control" id="joiningDate" defaultValue={employee.joindate} ref={joiningDateRef}></input>
                  {errors.joiningDate && <div class="text-danger text-start">{errors.joiningDate}</div>}
                </div>
                <div class="col-2"></div>
              </div>
            </div>
            <div class="modal-footer">
              {successMessage && <div class="text-success me-auto">{successMessage}</div>}
              <input type="button" class="btn btn-primary me-2" value="Save" onClick={handleSave}></input>
              <input type="button" class="btn btn-warning" value="Close" onClick={onClose}></input>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-backdrop show"></div>
    </>
}

export default EditEmp
