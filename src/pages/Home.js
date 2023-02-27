import { useState } from 'react'
import AuthModal from '../components/AuthModel'
import Nav from '../components/Nav'

const Home = () => {
    const [showModal, setShowModal] = useState(false)
    const authToken = false

    const handleClick = () => {
        console.log("Clicked")
        setShowModal(true)
    }
    return (
        <div className='overlay'>
        <Nav minimal={false} authToken={authToken}/>
        <div className="home">
            <h1>Swipe Right@</h1>
            <button className="primary-button" onClick={handleClick}> 
                {authToken ? 'Signout' : 'Create Account'}
            </button>

            {showModal && (
                <AuthModal setShowModal={setShowModal}/>
            )}
        </div>
        </div>
    )
}

export default Home