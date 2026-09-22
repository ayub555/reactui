import './home.css'

import { useNavigate } from 'react-router-dom';

function Aboutus()
{
  const navigate = useNavigate();

  function handleSubmit() {
    // ...do login logic
    navigate('/');
  }

  function contactUs() {
    // ...do login logic
    navigate('/contact-us');
  }

    return <div class="card card-home">
  <div class="card-header text-left">
    About Us
  </div>
  <div class="card-body text-center">
    <h1>I am About us Page</h1>
  </div>
  <div class="card-footer text-body-secondary">
    <input type="button" class="btn btn-primary" value="Contact Us Page" onClick={contactUs}></input>
    &nbsp;<input type="button" class="btn btn-warning" value="Close" onClick={handleSubmit}></input>
  </div>
</div>

}

export default Aboutus