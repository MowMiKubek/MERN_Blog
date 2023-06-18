import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

const logout = (e) => {
    e.preventDefault()
    localStorage.removeItem("token")
    window.location.reload()
}

const getRoleOptions = (role) => {
    switch(role) {
        case 'moderator':
            return (
                <>
                <h4>Opcje dla twojej roli</h4>
                <Link to="/createpost/">Dodaj post</Link>
                </>
            )
        case 'admin':
            return (
                <>
                <h4>Opcje dla twojej roli</h4>
                <Link to="/createpost/">Dodaj post</Link>
                <Link to="/adminpanel/">Panel administratora</Link>
                </>
            )
        default:
            return null
    }
}

const Profile = (props) => {
    const [userData, setUserData] = useState({})
    const [loading, setLoading] = useState(true)
    
    const token = localStorage.getItem('token')
    useEffect(() => {
        const config = {
            url: 'http://localhost:5000/users',
            method: 'get',
            headers: {'Content-Type': 'application/json', 'x-access-token': token}
        }
        axios(config)
            .then(res => {
                setUserData(res.data)
                console.log(res.data)
                setLoading(false)
            })
            .catch(error => {
                console.log(error)
                if (error.response && error.response.status >= 400 && error.response.status <= 500)
                {
                    localStorage.removeItem("token")
                    window.location = '/login'
                }
            })
    },[])

    return (
        <div>
            {
                loading
                ? <p>Loading...</p>
                : 
                <>
                <h3>Dzień dobry {userData.login}</h3>
                <div className="mt-3">
                    <h4>
                        Ranga konta: {userData.accountType}
                    </h4>
                    <h4>Dane osobowe:</h4>
                    <b>Imię i nazwisko:</b> {`${userData.firstname} ${userData.surname}`}<br />
                    <b>Email:</b> {`${userData.email}`}<br />
                    <b>Data urodzenia:</b> {userData.birthdate.split('T')[0]} <br />
                    <b>Płeć: </b>{userData.gender}
                </div>

                <a href="#" onClick={logout}>Wyloguj się</a>
                <Link to="/user/edit">Zmień dane osobowe</Link>
                <Link to="/user/password">Zmień hasło</Link>
                <Link to="/user/delete">Usuń konto</Link>
                {getRoleOptions(userData.accountType)}
                </>
            }
        </div>)
}

export default Profile