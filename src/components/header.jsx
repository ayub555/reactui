function Header()
{
    return <div>
        <nav class="navbar navbar-dark bg-primary navbar-expand-lg">
          <div class="container-fluid">
            <a class="navbar-brand" href="#">Riyan App</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="/">Home</a>
                </li>
                <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Employee
                  </a>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="/new-emp">Add Employee</a></li>
                    <li><a class="dropdown-item" href="/emp-list">Employee List</a></li>
                    <li><a class="dropdown-item" href="/emp-grid">Employee Grid</a></li>
                    <li><a class="dropdown-item" href="/emp-advance-grid">Employee Advance Grid</a></li>
                  </ul>
                </li>
                <li class="nav-item">
                  <a class="nav-link" aria-disabled="true" href="/about-us">About Us</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" aria-disabled="true" href="/contact-us">Contact Us</a>
                </li>
              </ul>
              <div class="d-flex align-items-center text-white">
                <span class="me-3">Welcome: Ayub Pathan</span>
                <a href="/logout" class="text-white" title="Logout">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
                    <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </nav>
    </div>
}

export default Header