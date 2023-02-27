import whiteLogo from '../images/Tinder-Logo-White.png'
import colorLogo from '../images/Tinder-Logo-Colored.png'

const Nav = ({minimal, authToken}) => { 
    return (
        <nav>
            <div className = "logo-container">
                <img className='logo' alt='Tinder-Logo' src={minimal ? colorLogo: whiteLogo} />
            </div>

            {!authToken && !minimal && 
                <button className='nav-button'> Log in</button>}
        </nav>
    )
}

export default Nav