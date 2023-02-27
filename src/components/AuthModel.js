const AuthModal = ({setShowModal}) => {
    const handleClick = () => {
        setShowModal(false)
    }

    return (
        <div onClick={handleClick}></div>
    )
}

export default AuthModal 