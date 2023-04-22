import React from 'react';
import { User } from './User';

export function Users({users, handleDelete}) {
    return (
        <table className="table">
        <thead>
            <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился раз</th>
            <th scope="col">Оценка</th>
            <th/>
            </tr>
        </thead>
        <tbody>
            {users.map((user)=>(
                <User user={user} handleDelete={handleDelete}/>
            ))}
        </tbody>
    </table>

    )
}