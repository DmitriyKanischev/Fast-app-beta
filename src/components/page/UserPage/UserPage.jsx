import React, {useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import PropTypes from "prop-types";
import api from "../../../api"
import QualitiesList from '../../ui/qualities/qualitiesList';

const UserPage = ({userId}) => {
    const navigate = useNavigate()
    const [user, setUser] = useState();

    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data))
    }, []);

    const handleBack = () => {
        navigate(-1)
    }

    if(user) {
        return (
            <div>
                <h1>{user.name}</h1>
                <h2>Профессия: {user.profession.name}</h2>
                <QualitiesList qualities={user.qualities} />
                <h3>Встретился раз: {user.completedMeetings}</h3>
                <h3>Оценка: {user.rate}</h3>
                <button onClick={handleBack}>Все пользователи</button>
            </div>
        )
    } else {
        return <Navigate to='/404'/>            
    }
}
UserPage.propTypes = {
    userId:PropTypes.string.isRequired
}
 
export default UserPage;