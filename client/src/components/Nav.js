import whiteLogo from '../images/Stundr-logo.png'
import colorLogo from '../images/Stundr-logo.png'

const Nav = ({authToken, minimal, setShowModal, showModal, setIsSignUp}) => { 
    const handleClick = () => {
        setShowModal(true)
        setIsSignUp(false)
    }
    
    return (
        <nav>
            <div className = "logo-container">
                <img className='logo' alt='Tinder-Logo' src={minimal ? colorLogo: whiteLogo} />
            </div>

            {!authToken && !minimal && 
                <button className='nav-button'
                onClick={handleClick}
                disabled={showModal}
            > Log in</button>}
        </nav>
    )
}

export default Nav