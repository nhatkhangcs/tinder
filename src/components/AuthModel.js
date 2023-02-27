import {useState} from 'react'

const AuthModal = ({setShowModal}) => {
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [error, setError]  = useState(null)

    console.log(email, password, confirmPassword)

    const handleClick = () => {
        setShowModal(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const isSignUp = true

    return (
        <div className="auth-modal">
            <div className = "close-icon" onClick={handleClick}>x</div>
            <h2>{isSignUp ?  'CREATE ACCOUNT' : 'LOG IN'}</h2>
            <p>By clicking Log In, you agree to our terms. Learn how we process your data in our Privacy Policy and Cookie Policy.</p>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder='email'
                    required={true}
                    onChange={(e) => setEmail(e.target.value)} 
                />

                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder='password'
                    required={true}
                    onChange={(e) => setEmail(e.target.value)} 
                />

                <input
                    type="pawwword-check"
                    id="pawwword-check"
                    name="pawwword-check"
                    placeholder='confirm password'
                    required={true}
                    onChange={(e) => setEmail(e.target.value)} 
                />

            </form>

            AUTH-MODAL
        </div>
    )
}

export default AuthModal 