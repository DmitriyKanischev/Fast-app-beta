import { useState } from "react"
import api from "../api"

export function Users() {
    const [users, setUsers] = useState(api.users.fetchAll())
    const qualitiyClass = "badge mx-1 text-bg-"

    const dynamicPhrase = (length) => {
        if (length > 4 || length === 1) {
            return `${length} человек тусанёт с тобой сегодня`
        } else if (length === 0) {
            return 'Никто не тусанёт с тобой сегодня'
        } else {
            return `${length} человека тусанут с тобой сегодня`
        }
    }

    const handleDelete = (userId) =>{
        setUsers(users.filter((user) => user._id !== userId))
    }

    return(
        <>
            <h1><span className={"badge m-2 py-2 px-4 bg-" +(users.length > 0 ? "primary" : "danger")}>{dynamicPhrase(users.length)}</span></h1>
            {users.length > 0 &&
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
        </>
    )
}