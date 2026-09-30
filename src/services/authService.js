const USERNAME_KEY = 'username'

// stores the authenticated username in the session
function login(username) {
    sessionStorage.setItem(USERNAME_KEY, username)
}

function logout() {
    sessionStorage.removeItem(USERNAME_KEY)
}

function getUsername() {
    return sessionStorage.getItem(USERNAME_KEY)
}

function isAuthenticated() {
    return !!getUsername()
}

export default { login, logout, getUsername, isAuthenticated }
