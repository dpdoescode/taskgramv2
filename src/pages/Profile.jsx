import React from 'react'
import { useParams } from 'react-router-dom';


const Profile = () => {
    const { id } = useParams()
    
    
    
    return (
        <div>
            <h2>User Profile</h2>
            <p>User ID: {id}</p>
            <p>Profile page coming soon 🚧</p>

        </div>
    );                                                                                                                                                                                                                                                                                                                                                                         
}



export default Profile