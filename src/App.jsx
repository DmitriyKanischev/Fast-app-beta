import React from 'react';

import { useState } from "react"
import api from "./api"
import Pagination from "./components/Pagination"
import { SearchStatus } from './components/SearchStatus';

export function App() {
    const [users, setUsers] = useState(api.users.fetchAll())
    
    const handleDelete = (userId) =>{
        setUsers(users.filter((user) => user._id !== userId))
    }
    const count = users.length
    const pageSize = 4;
    const handlePageChange = (pageIndex) =>{
        console.log("page: ", pageIndex)
    }


    const qualitiyClass = "badge mx-1 text-bg-"             //User


    return(
        <>
            <SearchStatus length={count}/>
            {count > 0 &&
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
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.qualities.map(item =><span className={qualitiyClass+item.color} key={item._id}>{item.name}</span>)}</td>
                            <td>{user.profession.name}</td>
                            <td>{user.completedMeetings}</td>
                            <td>{user.rate}</td>
                            <td><button type="button" className="btn btn-danger" onClick={()=>handleDelete(user._id)}>Удалить</button></td>
                        </tr>
                    ))}
                </tbody>
            </table> }
            <Pagination itemsCount={count} pageSize={pageSize} onPageChange={handlePageChange}/>
        </>
    )
}