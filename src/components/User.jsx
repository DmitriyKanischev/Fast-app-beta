import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import PropTypes from "prop-types";
import api from "../api"
import QualitiesList from './qualitiesList';

const User = ({userId}) => {
    const navigate = useNavigate()
    const handleBack = () => {
        navigate(-1)
    }

    const user = api.users.getById(userId);
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
User.propTypes = {
    userId:PropTypes.string.isRequired
}
 
export default User;