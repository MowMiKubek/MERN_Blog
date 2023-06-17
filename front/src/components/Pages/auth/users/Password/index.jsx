import {useState} from 'react'
import axios from 'axios'
const Password = (props) => {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errors, setErrors] = useState({})

    const token = localStorage.getItem("token")
    if(!token){
        window.location = "/users/login"
    }
    const handleSubmit = e => {
        e.preventDefault()
        setErrors({})
        const errors = {}

        if (!password) {
        errors.password = "Hasło jest wymagane";
        } else if (password.length < 8) {
        errors.password = "Hasło musi zawierać co najmniej 8 znaków";
        }
          
        if (!confirmPassword) {
        errors.confirmPassword = "Potwierdzenie hasła jest wymagane";
        } else if (confirmPassword !== password) {
        errors.confirmPassword = "Potwierdzenie hasła nie zgadza się";
        }
        
        if (Object.keys(errors).length > 0) {
          setErrors(errors)
          return
        }
    
        const userData = {
            password,
            passwordCheck: confirmPassword
          };
          const config = {
            method: 'post',
            url: 'http://localhost:5000/users/password/',
            data: userData,
            headers: {'Content-Type': 'application/json', 'x-access-token': token}
          }
          axios(config)
            .then((response) => {
              window.location = '/profile'
            })
            .catch((error) => {
                console.log(error.response)
                localStorage.removeItem("token")
                window.location = "/users/login"
            });
    }
    return (
        <div>
            <h3>Zmiana hasła</h3>
                <form onSubmit={handleSubmit}>
                <div className="col-md-6 mb-3">
                    <label htmlFor="password">Hasło</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Hasło"
                        className={`form-control ${errors.password && 'is-invalid'}`}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                    {errors.password && <div className='invalid-feedback'>{errors.password}</div>}
                    </div>

                    <div className="col-md-6 mb-3">
                    <label htmlFor="passwordconfirm">Powtórz hasło</label>
                    <input
                        type="password"
                        id="passwordconfirm"
                        name="passwordconfirm"
                        placeholder="Hasło"
                        className={`form-control ${errors.confirmPassword && 'is-invalid'}`}
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        required
                    />
                    {errors.confirmPassword && <div className='invalid-feedback'>{errors.confirmPassword}</div>}
                    </div>
                    <button type="submit" className="btn btn-primary">Zmień hasło</button>
            </form>
        </div>
    )
}

export default Password