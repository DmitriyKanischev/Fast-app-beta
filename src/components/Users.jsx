import React, { useState, useEffect } from "react";
import SearchStatus from "./SearchStatus"
import PropTypes from "prop-types";
import { paginate } from "../utils/paginate";
import Pagination from "./Pagination";
import api from "../api";
import GroupList from "./GroupList";
import UsersTable from "./UsersTable";
import _ from "lodash";


const Users = ({ users: allUsers, ...rest }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setselectedProf] = useState();
    const [sortBy, setSortBy] = useState({iter: 'name', order: 'asc'});
    const pageSize = 4;
    useEffect(() => {
        api.professions.fetchAll().then((data)=>setProfessions(data))
    }, [])
    useEffect(() => {
        setCurrentPage(1)
    }, [selectedProf])


    const handleProfessionSelect = (item) => {
        setselectedProf(item)
    }


    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

     const handleSort = (item) => {
        setSortBy(item)
    }

    const filteredUsers = selectedProf ? allUsers.filter((user) => JSON.stringify(user.profession) === JSON.stringify(selectedProf)) : allUsers;
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

                {count > 0 && (
                    <UsersTable 
                        users={usersCrop} 
                        selectedSort={sortBy} 
                        onSort={handleSort}
                        {...rest} />
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
};
Users.propTypes = {
    users: PropTypes.array
};

export default Users;