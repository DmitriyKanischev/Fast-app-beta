import React from 'react';
import { useParams } from 'react-router-dom';
import User from '../components/User';
import UsersList from '../components/UsersList';

const Users = () => {
    const params = useParams()
    const {userId} = params
    
    return ( 
        <>
            {userId ? <User userId={userId}/> : <UsersList/>}
        </>
     );
}
 
export default Users;