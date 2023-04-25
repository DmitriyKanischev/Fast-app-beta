import React, { useState } from 'react';
import { User } from './User';
import Pagination from './Pagination';
import { paginate } from '../utils/paginate';

export function Users({users, handleDelete}) {
    const count = users.length
    const pageSize = 4;
    const [currentPage, setCurrentPage] = useState(1)
    const onPageChange = (pageIndex) =>{
        setCurrentPage(pageIndex)
        console.log("page: ", pageIndex)
    }

    const userCrop = paginate(users, currentPage, pageSize)
    return (
        <>
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
                    {userCrop.map((user)=>(
                        <User user={user} key={user._id} handleDelete={handleDelete}/>
                    ))}
                </tbody>
            </table>
            <Pagination itemsCount={count} currentPage={currentPage} pageSize={pageSize} onPageChange={onPageChange}/>
        </>
    )
}