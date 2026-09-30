import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './login.css'
import authService from '../services/authService'
import userService from '../services/userService'

function Login() {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [submitting, setSubmitting] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()
        setError('')
        setSubmitting(true)
        try {
            const isValid = await userService.authenticateUser(username, password)
            if (isValid) {
                authService.login(username)
                navigate('/home')
            } else {
                setError('Invalid username or password')
            }
        } catch {
            setError('Unable to reach the server. Please try again.')
        } finally {
            setSubmitting(false)
        }
    }

    return <div className="login-page">
        <div className="login-card">
            <h2 className="login-title">Sign in</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="login-input"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    className="login-input"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="login-btn" disabled={submitting}>{submitting ? 'Signing in...' : 'Sign in'}</button>
                {error && <p className="login-error">{error}</p>}
            </form>
        </div>
    </div>
}

export default Login
