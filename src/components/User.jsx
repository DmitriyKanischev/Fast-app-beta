import React from 'react';

export function User({user, handleDelete}) {
    const qualitiyClass = "badge mx-1 text-bg-"

    return(
        <tr key={user._id}>
            <td>{user.name}</td>
            <td>{user.qualities.map(item =><span className={qualitiyClass+item.color} key={item._id}>{item.name}</span>)}</td>
            <td>{user.profession.name}</td>
            <td>{user.completedMeetings}</td>
            <td>{user.rate}</td>
            <td><button type="button" className="btn btn-danger" onClick={()=>handleDelete(user._id)} >Удалить</button></td>
        </tr>
    )
}
// 