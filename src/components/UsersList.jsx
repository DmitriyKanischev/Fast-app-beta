import React, { useState, useEffect } from "react";
import SearchStatus from "./SearchStatus"
import PropTypes from "prop-types";
import { paginate } from "../utils/paginate";
import Pagination from "./Pagination";
import api from "../api";
import GroupList from "./GroupList";
import UsersTable from "./UsersTable";
import _ from "lodash";


const UsersList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setselectedProf] = useState();
    const [sortBy, setSortBy] = useState({iter: 'name', order: 'asc'});
    const pageSize = 4;

    const [users, setUsers] = useState(api.users.fetchAll());

    const [searchQuery, setSearchQuery] = useState('')                        //for search area

    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };
    const handleToggleBookMark = (id) => {
        setUsers(
            users.map((user) => {
                if (user._id === id) {
                    return { ...user, bookmark: !user.bookmark };
                }
                return user;
            })
        );
    };

    // 

    useEffect(() => {
        api.professions.fetchAll().then((data)=>setProfessions(data))
    }, [])
    useEffect(() => {
        setCurrentPage(1)
    }, [selectedProf, searchQuery])


    const handleProfessionSelect = (item) => {
        if(searchQuery !== '') setSearchQuery('')
        setselectedProf(item)
    }


    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

     const handleSort = (item) => {
        setSortBy(item)
    }

    const handleSearchQuery = ({target}) =>{
        setselectedProf(undefined)
        setSearchQuery(target.value)
    }

    if(users) {
        //First check search area, if search empty - check selected professions
        const filteredUsers = searchQuery ? 
                                users.filter((user) => 
                                user.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1) 
                                : selectedProf ?
                                users.filter((user) => JSON.stringify(user.profession) === JSON.stringify(selectedProf)) 
                                : users;

        const count = filteredUsers.length;
        const sortedUsers=_.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
        const usersCrop = paginate(sortedUsers, currentPage, pageSize);
        const clearFilter = () => {
            setselectedProf()
        }
        return (
            <div className="d-flex">
                {professions && 
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList 
                            selectedItem={selectedProf}
                            items={professions} 
                            onItemSelect={handleProfessionSelect}
                        />
                        <button
                            onClick={clearFilter}
                            className="btn btn-secondary mt-2"
                            >Очистить</button>
                    </div>
                }
                <div className="d-flex flex-column">
                    <SearchStatus length={count} />

                    <input 
                        type="text" 
                        name="searchQuery" 
                        placeholder="Search..." 
                        value={searchQuery} 
                        onChange={handleSearchQuery} 
                        
                    />

                    {count > 0 && (
                        <UsersTable 
                            users={usersCrop} 
                            selectedSort={sortBy} 
                            onSort={handleSort}
                            onDelete={handleDelete}
                            onToggleBookMark={handleToggleBookMark}
                        />
                    )}

                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
                
            </div>
        );
    }
    return "loading..."
};
UsersList.propTypes = {
    users: PropTypes.array
};

export default UsersList;