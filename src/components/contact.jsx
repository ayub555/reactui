import './style.css'
import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import emailService from '../services/emailService'

function ContactUs()
{
    const navigate = useNavigate()

    function handleClose()
    {
        navigate('/')
    }

    // refs to read the value of each mandatory field
    const firstNameRef = useRef(null)
    const lastNameRef = useRef(null)
    const countryRef = useRef(null)
    const emailIdRef = useRef(null)
    const messageRef = useRef(null)

    // holds the error message for each field, empty string means no error
    const [errors, setErrors] = useState({})

    // holds the success/failure message shown in the footer after sending
    const [statusMessage, setStatusMessage] = useState('')

    function handleSend()
    {
        const newErrors = {}

        if (!firstNameRef.current.value.trim()) {
            newErrors.firstName = 'First Name is mandatory'
        }
        if (!lastNameRef.current.value.trim()) {
            newErrors.lastName = 'Last Name is mandatory'
        }
        if (!countryRef.current.value.trim()) {
            newErrors.country = 'Country is mandatory'
        }
        if (!emailIdRef.current.value.trim()) {
            newErrors.emailId = 'Email Id is mandatory'
        }
        if (!messageRef.current.value.trim()) {
            newErrors.message = 'Message is mandatory'
        }

        setErrors(newErrors)

        // if there are no errors, the form is valid and the email can be sent
        if (Object.keys(newErrors).length === 0) {
            const contact = {
                firstName: firstNameRef.current.value,
                lastName: lastNameRef.current.value,
                country: countryRef.current.value,
                email: emailIdRef.current.value,
                message: messageRef.current.value
            }

            emailService.sendContactEmail(contact)
                .then(() => {
                    setStatusMessage('Your message has been sent successfully.')
                })
                .catch((error) => {
                    console.error('Failed to send message:', error)
                    setStatusMessage('Something went wrong while sending your message. Please try again.')
                })
        }
    }

    return <div class="card card-home">
  <div class="card-header text-left">
    Contact Us
   </div>
  <div class="card-body text-center border">
    <div class="row mb-3 align-items-center">
      <div class="col-2"></div>
      <label for="firstName" class="col-3 col-form-label text-start">First Name</label>
      <div class="col-5">
        <input type="text" class="form-control" id="firstName" placeholder="Enter first name" ref={firstNameRef}></input>
        {errors.firstName && <div class="text-danger text-start">{errors.firstName}</div>}
      </div>
      <div class="col-2"></div>
    </div>
    <div class="row mb-3 align-items-center">
      <div class="col-2"></div>
      <label for="lastName" class="col-3 col-form-label text-start">Last Name</label>
      <div class="col-5">
        <input type="text" class="form-control" id="lastName" placeholder="Enter last name" ref={lastNameRef}></input>
        {errors.lastName && <div class="text-danger text-start">{errors.lastName}</div>}
      </div>
      <div class="col-2"></div>
    </div>
    <div class="row mb-3 align-items-center">
      <div class="col-2"></div>
      <label for="country" class="col-3 col-form-label text-start">Country</label>
      <div class="col-5">
        <input type="text" class="form-control" id="country" placeholder="Enter country" ref={countryRef}></input>
        {errors.country && <div class="text-danger text-start">{errors.country}</div>}
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
      <label for="message" class="col-3 col-form-label text-start">Message</label>
      <div class="col-5">
        <textarea class="form-control" id="message" rows="4" placeholder="Enter your message" ref={messageRef}></textarea>
        {errors.message && <div class="text-danger text-start">{errors.message}</div>}
      </div>
      <div class="col-2"></div>
    </div>
  </div>
  <div class="card-footer text-body-secondary">
    <div class="row">
      <div class="col-md-6">
        {statusMessage && <div class="text-success mt-2">{statusMessage}</div>}
      </div>
      <div class="col-md-6 align-items-left">
        <input type="button" class="btn btn-primary me-2" value="Send" onClick={handleSend}></input>
        <input type="button" class="btn btn-warning" value="Close" onClick={handleClose}></input>
      </div>
    </div>
  </div>
</div>

}

export default ContactUs
