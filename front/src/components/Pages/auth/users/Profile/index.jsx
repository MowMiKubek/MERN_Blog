import { useState, useEffect } from "react"
import axios from "axios"

const logout = (e) => {
    e.preventDefault()
    localStorage.removeItem("token")
    window.location.reload()
}

const Profile = (props) => {
    const [userData, setUserData] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const token = localStorage.getItem('token')
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
            .catch(err => {
                if (error.response && error.response.status >= 400 && error.response.status <= 500)
                {
                    localStorage.removeItem("token")
                    window.location.reload()
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
                <div class="mt-3">
                    <h4>
                        Ranga konta: {userData.accountType}
                    </h4>
                    <h4>Dane osobowe:</h4>
                    <b>Imię i nazwisko: {`${userData.firstname} ${userData.surname}`}</b><br />
                    <b>Data urodzenia: {userData.birthday}</b> <br />
                    <b>Płeć: {userData.gender}</b>
                </div>

                <a href="#" onClick={logout}>Wyloguj się</a>
                <a href="/user/edit">Zmień dane osobowe</a>
                <a href="/user/password">Zmień hasło</a>
                <a href="/user/delete">Usuń konto</a>
                </>
            }
        </div>)
}

export default Profile