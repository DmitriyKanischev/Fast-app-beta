import React, {useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import PropTypes, { func } from "prop-types";
import api from "../../../api"
import QualitiesList from '../../ui/qualities/qualitiesList';

const UserPage = ({userId}) => {
    const navigate = useNavigate()
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(false)

    async function fetchUsers() {
        try {
            setLoading(true)
            await api.users.getById(userId).then((data) => setUser(data))
            setLoading(false)
        } catch (err) {
            setLoading(false)
            console.log(err)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, []);

    const handleBack = () => {
        navigate(-1)
    }

        return (
            <div>
                {loading && <h1>loading...</h1>}
                {user &&
                <>
                    <h1>{user.name}</h1>
                    <h2>Профессия: {user.profession.name}</h2>
                    <QualitiesList qualities={user.qualities} />
                    <h3>Встретился раз: {user.completedMeetings}</h3>
                    <h3>Оценка: {user.rate}</h3>
                    <button onClick={handleBack}>Все пользователи</button> 
                </>}
            </div>
        )
                //need navigate to 404 if !user
}
UserPage.propTypes = {
    userId:PropTypes.string.isRequired
}
 
export default UserPage;