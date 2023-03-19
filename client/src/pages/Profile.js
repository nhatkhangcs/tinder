import React from 'react';

const Profile = ({ matches = [], groups = [] }) => {
    const user = {
        first_name: 'John',
        dob_day: '15',
        dob_month: 'July',
        dob_year: '1990',
        gender_identity: 'Male',
        url: 'https://i.imgur.com/oPj4A8u.jpeg',
        about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis posuere blandit lacus, ac consequat velit ultrices quis.',
        matches: [],
        major: 'Computer Science',
        location: 'San Francisco, CA',
        university: 'Stanford University',
        academicLevel: 'Bachelor',
        interests: ['Programming', 'Machine Learning', 'Data Science'],
        rating: '4.5',
    };

    return (
        <div className="profile">
            <div className="profile-header">
                <img src={user.url} alt={`photo of ${user.first_name}`} />
                <h3>{user.first_name}</h3>
            </div>
            <div class="profile-info">
                <ul>
                    <li>Born on</li>
                    <li>{user.dob_month} {user.dob_day}, {user.dob_year}</li>
                    <li>Gender</li>
                    <li>{user.gender_identity}</li>
                    <li>Major</li>
                    <li>{user.major}</li>
                    <li>Interests</li>
                    <li>{user.interests.join(", ")}</li>
                    <li>About</li>
                    <li>{user.about}</li>
                </ul>
            </div>

            <div className="profile-matches-container">
                <div className="profile-matches">
                    <h4>Matched Users</h4>
                    {matches.length > 0 ? (
                        <ul>
                            {matches.map((match) => (
                                <li key={match.id}>
                                    <img src={match.url} alt={`photo of ${match.first_name}`} />
                                    <h5>{match.first_name}</h5>
                                    <p>{match.about}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No matched users yet.</p>
                    )}
                </div>
                <div className="profile-groups">
                    <h4>Groups</h4>
                    {groups.length > 0 ? (
                        <ul>
                            {groups.map((group) => (
                                <li key={group.id}>
                                    <h5>{group.name}</h5>
                                    <p>{group.description}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No groups joined yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
