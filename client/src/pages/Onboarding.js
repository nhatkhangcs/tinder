import { useState } from 'react'
import Nav from '../components/Nav'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Onboarding = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['user'])
    const [formData, setFormData] = useState({
        user_id: cookies.UserId,
        first_name: '',
        dob_day: '',
        dob_month: '',
        dob_year: '',
        gender_identity: 'man',
        url: '',
        about: '',
        matches: [],
        major: '',
        location: '',
        university: '',
        academicLevel: '',
        interests: [],
        rating: null
    })

    let navigate = useNavigate()

    const handleMajorChange = (event) => {
        setFormData({ ...formData, major: event.target.value })
    }

    const handleLocationChange = (event) => {
        setFormData({ ...formData, location: event.target.value })
    }

    const handleUniversityChange = (event) => {
        setFormData({ ...formData, university: event.target.value })
    }

    const handleAcademicLevelChange = (event) => {
        setFormData({ ...formData, academicLevel: event.target.value })
    }

    const handleInterestChange = (event) => {
        const selectedInterest = event.target.value;
        if (formData.interests.includes(selectedInterest)) {
            // Remove the interest if it was already selected
            setFormData({
                ...formData,
                interests: formData.interests.filter((interest) => interest !== selectedInterest)
            });
        } else {
            // Add the interest to the list
            setFormData({
                ...formData,
                interests: [...formData.interests, selectedInterest]
            });
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.put('http://localhost:8000/user', { formData })
            const success = response.status === 200
            console.log('form Received', formData)
            if (success) navigate('/dashboard')
        } catch (err) {
            console.log(err)
        }
    }

    const handleChange = (e) => {
        console.log('e', e)
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        const name = e.target.name

        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    return (
        <>
            <Nav
                minimal={true}
                setShowModal={() => {

                }}
                showModal={false}
            />
            <div className='onboarding'>
                <h2> CREATE ACCOUNT</h2>

                <form onSubmit={handleSubmit}>
                    <section>
                        <label htmlFor='first_name'>First name</label>
                        <input
                            id='first_name'
                            type='text'
                            name='first_name'
                            placeholder='First name'
                            required={true}
                            value={formData.first_name}
                            onChange={handleChange}
                        />

                        <label>Birthday</label>
                        <div className='multiple-input-container'>
                            <input
                                id='dob_day'
                                type='number'
                                name='dob_day'
                                placeholder='DD'
                                required={true}
                                value={formData.dob_day}
                                onChange={handleChange}
                            />

                            <input
                                id='dob_month'
                                type='number'
                                name='dob_month'
                                placeholder='MM'
                                required={true}
                                value={formData.dob_month}
                                onChange={handleChange}
                            />

                            <input
                                id='dob_year'
                                type='number'
                                name='dob_year'
                                placeholder='YYYY'
                                required={true}
                                value={formData.dob_year}
                                onChange={handleChange}
                            />
                        </div>

                        <label>Gender</label>
                        <div className="multiple-input-container">
                            <input
                                id="man-gender-identity"
                                type="radio"
                                name="gender_identity"
                                value="man"
                                onChange={handleChange}
                                checked={formData.gender_identity === "man"}
                            />
                            <label htmlFor="man-gender-identity">Man</label>
                            <input
                                id="woman-gender-identity"
                                type="radio"
                                name="gender_identity"
                                value="woman"
                                onChange={handleChange}
                                checked={formData.gender_identity === "woman"}
                            />
                            <label htmlFor="woman-gender-identity">Woman</label>
                            <input
                                id="more-gender-identity"
                                type="radio"
                                name="gender_identity"
                                value="more"
                                onChange={handleChange}
                                checked={formData.gender_identity === "more"}
                            />
                            <label htmlFor="more-gender-identity">More</label>
                        </div>

                        <label htmlFor='about'>About me</label>
                        <input
                            id="about"
                            type="text"
                            name="about"
                            required={true}
                            placeholder="I like to walk..."
                            value={formData.about}
                            onChange={handleChange}
                        />

                        <div className="criteria">
                            <div>
                                <label htmlFor="major">MAJOR:</label>
                                <select id="major" onChange={handleMajorChange}>
                                    <option value=""></option>
                                    <option value="Computer Science">Computer Science</option>
                                    <option value="Biology">Biology</option>
                                    <option value="Psychology">Psychology</option>
                                    <option value="History">History</option>
                                </select>
                            </div>
                        </div>

                        <div className="criteria">
                            <div>
                                <label htmlFor="location">LOCATION:</label>
                                <select id="location" onChange={handleLocationChange}>
                                    <option value=""></option>
                                    <option value="District 1">District 1</option>
                                    <option value="District 2">District 2</option>
                                    <option value="District 3">District 3</option>
                                    <option value="District 4">District 4</option>
                                </select>
                            </div>
                        </div>

                        <div className="criteria">
                            <div>
                                <label htmlFor="university">UNIVERSITY:</label>
                                <select id="university" onChange={handleUniversityChange}>
                                    <option value=""></option>
                                    <option value="University of Science, VNU-HCM">University of Science, VNU-HCM</option>
                                    <option value="University of Social Sciences and Humanities, VNU-HCM">University of Social Sciences and Humanities, VNU-HCM</option>
                                    <option value="University of Technology, VNU-HCM">University of Technology, VNU-HCM</option>
                                    <option value="Ho Chi Minh City University of Technology and Education">Ho Chi Minh City University of Technology and Education</option>
                                    <option value="Ho Chi Minh City University of Economics and Finance">Ho Chi Minh City University of Economics and Finance</option>
                                    <option value="International University, VNU-HCM">International University, VNU-HCM</option>
                                </select>
                            </div>
                        </div>

                        <div className="criteria">
                            <div>
                                <label htmlFor="academicLevel">ACADEMIC LEVEL:</label>
                                <select id="academicLevel" onChange={handleAcademicLevelChange}>
                                    <option value=""></option>
                                    <option value="Bachelor">Bachelor</option>
                                    <option value="Master">Master</option>
                                    <option value="Doctorate">Doctorate</option>
                                </select>
                            </div>
                        </div>

                        <div className="criteria">
                            <div>
                                <label htmlFor="interests">INTEREST SUBJECTS/FIELDS:</label>
                                <select id="interests" multiple onChange={handleInterestChange} className="interest">
                                    <option value="Web Development">Web Development</option>
                                    <option value="Data Science">Data Science</option>
                                    <option value="Artificial Intelligence">Artificial Intelligence</option>
                                    <option value="Marketing">Marketing</option>
                                    <option value="Computer Science">Computer Science</option>
                                </select>
                            </div>
                            <div className="interests-container">
                                {formData.interests.map(interest => (
                                    <div key={interest} className="interest-tag">{interest}</div>
                                ))}
                            </div>
                        </div>


                        <input type="submit" />
                    </section>

                    <section>
                        <label htmlFor='url'>Profile</label>
                        <input
                            type="url"
                            name="url"
                            id="url"
                            onChange={handleChange}
                            required={true}
                        />

                        <div className="photo-container">
                            {formData.url && <img src={formData.url} alt='Profile' />}
                        </div>
                    </section>
                </form>
            </div>
        </>
    )
}

export default Onboarding