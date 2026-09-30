import './style.css'

import { useNavigate } from 'react-router-dom';

function Aboutus()
{
  const navigate = useNavigate();

  function handleClose() {
    // ...do login logic
    navigate('/home');
  }

  function contactUs() {
    // ...do login logic
    navigate('/contact-us');
  }

    return <div class="card card-home">
  <div class="card-header text-left">
    About Us
  </div>
  <div class="card-body border">
    <div class="text-center mb-4">
      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="#0d6efd" viewBox="0 0 16 16">
        <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v8A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5m1.886 6.914L15 7.151V12.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5V7.15l6.614 1.764a1.5 1.5 0 0 0 .772 0M1.5 4h13a.5.5 0 0 1 .5.5v1.616L8.129 7.948a.5.5 0 0 1-.258 0L1 6.116V4.5a.5.5 0 0 1 .5-.5"/>
      </svg>
      <h2 class="mt-3">HDFC Bank Employee Portal</h2>
      <p class="text-muted">A simple, single place to manage employee records across the organization.</p>
    </div>

    <div class="row g-4 text-center">
      <div class="col-md-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#198754" viewBox="0 0 16 16">
          <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664zM8.256 14a4.5 4.5 0 0 0 .5-1.5H15c-.001-.246-.154-.986-.832-1.664C13.516 10.68 12.289 10 10 10c-.26 0-.507.009-.742.025.226-.341.365-.73.395-1.161C9.717 8.622 9.855 8.75 10 8.75c1.657 0 3 .672 3 1.5v1.5z"/>
          <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
        </svg>
        <h5 class="mt-2">Manage Employees</h5>
        <p class="text-muted">Add, edit and remove employee records with built-in validation for required fields.</p>
      </div>
      <div class="col-md-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#fd7e14" viewBox="0 0 16 16">
          <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm15 2h-4v3h4zm0 4h-4v3h4zm0 4h-4v3h3a1 1 0 0 0 1-1zm-5 3v-3H6v3zm-5 0v-3H1v2a1 1 0 0 0 1 1zm-4-4h4V8H1zm0-4h4V4H1zm5-3v3h4V4zm4 4H6v3h4z"/>
        </svg>
        <h5 class="mt-2">View &amp; Export Data</h5>
        <p class="text-muted">Browse employees as a list, card grid or sortable, paginated grid — and export to Excel or PDF.</p>
      </div>
      <div class="col-md-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#dc3545" viewBox="0 0 16 16">
          <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/>
        </svg>
        <h5 class="mt-2">Get in Touch</h5>
        <p class="text-muted">Have a question or feedback about the portal? Reach out through the Contact Us page.</p>
      </div>
    </div>
  </div>
  <div class="card-footer text-body-secondary">
    <input type="button" class="btn btn-primary" value="Contact Us Page" onClick={contactUs}></input>
    &nbsp;<input type="button" class="btn btn-warning" value="Close" onClick={handleClose}></input>
  </div>
</div>

}

export default Aboutus