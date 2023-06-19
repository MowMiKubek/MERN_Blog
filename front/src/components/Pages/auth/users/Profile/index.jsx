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
                <Link className="mx-1" to="/createpost/">Dodaj post</Link>
                </>
            )
        case 'admin':
            return (
                <>
                <h4>Opcje dla twojej roli</h4>
                <Link className="mx-1" to="/createpost/">Dodaj post</Link>
                <Link className="mx-1" to="/adminpanel/">Panel administratora</Link>
                <Link className="mx-1" to="/adminposts/">Zarządzanie postami</Link>
                </>
            )
        default:
            return null
    }
}

const getRoleName = (role) => {
    switch(role) {
        case 'admin':
            return <span style={{color: 'rgb(165, 50, 50)'}}>Jaśnie nam panujący admin</span>
        case 'moderator':
            return <span style={{color: 'purple'}}>Nadworny moderator</span>
        default:
            return "User"
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
                } else {
                    window.location = '/'
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
                <h3>Dzień dobry {`${userData.firstname} ${userData.surname}`}</h3>
                <div className="mt-3">
                    <h4>
                        Ranga konta: {getRoleName(userData.accountType)}
                    </h4>
                    <h4>Dane osobowe:</h4>
                    <b>Login:</b> {userData.login}<br />
                    <b>Email:</b> {`${userData.email}`}<br />
                    <b>Data urodzenia:</b> {userData.birthdate.split('T')[0]} <br />
                    <b>Płeć: </b>{userData.gender === 'male' ? 'mężczyzna' : 'kobieta'}
                </div>

                <a href="#" onClick={logout}>Wyloguj się</a>
                <Link className="mx-1" to="/user/edit">Zmień dane osobowe</Link>
                <Link className="mx-1" to="/user/password">Zmień hasło</Link>
                <Link className="mx-1" to="/user/delete">Usuń konto</Link>
                {getRoleOptions(userData.accountType)}
                </>
            }
        </div>)
}

export default Profile