import { useState } from "react"
import api from "../api"

export function Users() {
    const [users, setUsers] = useState(api.users.fetchAll())
    const qualitiyClass = "badge mx-1 text-bg-"

    return(
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
                        <td><button type="button" className="btn btn-danger">Delete</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}