import { useState, useEffect } from 'react'
import axios from 'axios'

const Login = (props) => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const submitHandler = (e) => {
        e.preventDefault()
        const body = {
            login: login,
            password: password
        }
        axios.post('http://localhost:5000/users/login/', body)
            .then(res => {
                console.log(res.data)
                const data = res.data
                localStorage.setItem("token", data.token)
                window.location = '/profile'
            })
            .catch(error => {
                console.log(error.response)
                if (
                    error.response &&
                    error.response.status >= 400 &&
                    error.response.status <= 500
                ) {
                    setError(error.response.data.errors)
                }
            })
    }

    return (
        <div>
            <h3>Logowanie</h3>
                <form onSubmit={submitHandler}>
                    <div className="col-md-6 mb-3">
                        <label for="login">Login</label>
                        <input type="text" 
                        className="form-control"
                        id="login"
                        placeholder="Login"
                        value={login}
                        onChange={e => setLogin(e.target.value)}
                        required />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label for="password">Hasło</label>
                        <input type="password" 
                            id="password" 
                            placeholder="Hasło" 
                            className="form-control"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        required />
                        {/* errors here */}
                    </div>
                    <button type="submit" className="btn btn-primary">Zaloguj się</button>
            </form>
            {
                error
                ? <div className='alert alert-danger mt-3'>{error}</div>
                : null
            }
            <h5 className="mt-3">Nie masz konta? <a href="/user/register">Zarejestruj się</a></h5>
        </div>
    )
}

export default Login