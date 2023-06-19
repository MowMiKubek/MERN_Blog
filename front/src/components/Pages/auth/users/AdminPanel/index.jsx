import { useState, useEffect } from 'react'
import axios from 'axios'

const getUserTable = (users, callback) => {
    const result = users.map(user => (
        <tr key={user._id}>
            <td>{user.firstname}</td>
            <td>{user.surname}</td>
            <td>{user.email}</td>
            <td>{user.accountType}</td>
            <td>
                <div className="btn-group">
                    <a href="#" onClick={() => callback(user._id, user.accountType === "user" ? "inactive" : "user")} type="button" className="btn btn-primary btn-sm">{ user.accountType === "user" ? "Ban" : "User"}</a>
                    <a href="#" onClick={() => callback(user._id, "moderator")} type="button" className="btn btn-secondary btn-sm">Moder</a>
                    <a href="#" onClick={() => callback(user._id, "admin")} type="button" className="btn btn-success btn-sm">Admin</a>
                </div>
            </td>
        </tr>
    ))
    return result
}



const AdminPanel = (props) => {
    const [userList, setUserList] = useState([])
    const [loading, setLoading] = useState(true)

    const changeUserRole = async (userID, newRole) => {
        try {
            setLoading(true)
            const token = localStorage.getItem("token")
            const config = {
                url: 'http://localhost:5000/users/adminpanel/',
                method: "post",
                data: { userID: userID, newRole: newRole },
                headers: { "Content-Type": "application/json", "x-access-token": token}
            }
            await axios(config)
            await fetchUserList()
            setLoading(false)
        } catch(error) {
            if(error.response){
                const code = error.response.status
                if(code === 401){ // invalid token
                    localStorage.removeItem("token")
                    window.location = '/login'
                }
                if(code ===  403){ // wrong role
                    window.location = '/profile'
                } else {
                    console.log(error.response)
                    window.location = '/'
                }
            }
        }
    }

    const fetchUserList = async () => {
        const token = localStorage.getItem("token")
        const config = {
            url: 'http://localhost:5000/users/all/',
            method: "get",
            headers: { "Content-Type": "application/json", "x-access-token": token}
        }
        try {
            setLoading(true)
            const result = await axios(config)
            const data = result.data
            console.log(data)
            setUserList(data)
            setLoading(false)
        } catch(error) {
            if(error.response){
                const code = error.response.status
                if(code === 401){ // invalid token
                    localStorage.removeItem("token")
                    window.location = '/login'
                }
                if(code ===  403){ // wrong role
                    window.location = '/profile'
                } else {
                    console.log(error.response)
                    window.location = '/'
                }
            }
        }
    }

    useEffect(() => {
        fetchUserList()
        console.log(userList)
    },[])
    return (
        <div>
            {
                loading
                ? <p>Loading...</p>
                :<table className="table table-striped">
                <thead>
                    <tr>
                      <th scope="col">Imie</th>
                      <th scope="col">Nazwisko</th>
                      <th scope="col">Email</th>
                      <th scope="col">Rola</th>
                      <th scope="col">Akcja</th>
                    </tr>
                </thead>
                <tbody>
                    { getUserTable(userList, changeUserRole) }
                </tbody>
                </table>
            }
        </div>
    )
}

export default AdminPanel