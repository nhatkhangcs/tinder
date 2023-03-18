import { useState } from 'react'
import { useCookies } from 'react-cookie'
import AuthModal from '../components/AuthModel'
import Nav from '../components/Nav'

const Home = () => {
    const [showModal, setShowModal] = useState(false)
    const [isSignUp, setIsSignUp] = useState(true)
    const [cookies, setCookie, removeCookie] = useCookies(['user'])

    const authToken = cookies.authToken

    const handleClick = () => {
        if(authToken){
            removeCookie('UserId', cookies.userId)
            removeCookie('AuthToken', cookies.authToken)
            window.location.reload()

            return
        }

        setShowModal(true)
        setIsSignUp(true)
    }

    return (
        <div className='overlay'>
            <Nav 
                authToken={authToken}
                minimal={false}
                setShowModal={setShowModal}
                showModal={showModal}
                setIsSignUp={setIsSignUp} />
            <div className="home">
                <h1 className='primary-title'>Swipe Right@</h1>
                <button className="primary-button" onClick={handleClick}>
                    {authToken ? 'Signout' : 'Create Account'}
                </button>

                {showModal && (
                    <AuthModal setShowModal={setShowModal} isSignUp={isSignUp} />
                )}
            </div>
        </div>
    )
}

export default Home