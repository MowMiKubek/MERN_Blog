import axios from "axios"
import { useRef, useState } from "react"


const Delete = (props) => {
    const [error, setError] = useState('')
    const passwordRef = useRef()

    const deleteHandle = (e) => {
        e.preventDefault()
        const token = localStorage.getItem('token')
        const password = passwordRef.current.value
        const config = {
            method: 'delete',
            url: 'http://localhost:5000/users/',
            data: {
                password: password
            },
            headers: {'Content-Type': 'application/json', 'x-access-token': token}
        }
        axios(config)
        .then(res => {
            localStorage.removeItem("token")
            window.location.reload()
        })
        .catch((err) => {
            if(err.response) {
                if(err.response.status === 401){
                    localStorage.removeItem('token')
                    window.location = '/'
                }
                if(err.response.status === 403) {
                    setError("Hasło nie jest poprawne")
                }
            }
        })
    }

    return (
        <div>
            <h3>Potwierdź usunięcie konta hasłem</h3>
                <form onSubmit={deleteHandle}>
                    <div class="col-md-6 mb-3">
                        <label for="password">Hasło</label>
                        <input type="password" 
                            ref={passwordRef}
                            id="password" 
                            placeholder="Hasło" 
                            className={`form-control ${error !== '' && 'is-invalid'}`}
                        required />
                        { error !== ''
                        ? <div className="invalid-feedback">{error}</div>
                        : null}
                    </div>
                    <button type="submit" class="btn btn-primary">Zmień hasło</button>
            </form>
        </div>
    )
}

export default Delete