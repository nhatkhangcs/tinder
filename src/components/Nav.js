import whiteLogo from '../images/Tinder-Logo-White.png'
import colorLogo from '../images/Tinder-Logo-Colored.png'

const Nav = ({minimal, authToken, setShowModal, showModal}) => { 
    const handleClick = () => {
        setShowModal(true);
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