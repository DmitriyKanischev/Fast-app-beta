import React from 'react';

import { useState } from "react"
import api from "./api"
import Pagination from "./components/Pagination"
import { SearchStatus } from './components/SearchStatus';
import { Users } from './components/Users';

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




    return(
        <>
            <SearchStatus length={count}/>
            {count > 0 && <Users users={users} handleDelete={handleDelete}/>}
            <Pagination itemsCount={count} pageSize={pageSize} onPageChange={handlePageChange}/>
        </>
    )
}