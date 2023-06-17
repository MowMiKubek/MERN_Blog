import { useState, useEffect } from "react"
import axios from 'axios'

const EditProfile = (props) => {
    const [gender, setGender] = useState('')
    const [email, setEmail] = useState('')
    const [firstname, setFirstname] = useState('')
    const [surname, setSurname] = useState('')
    const [birthdate, setBirthdate] = useState('')

    const [errors, setErrors] = useState({})
    const token = localStorage.getItem("token")
    useEffect(() => {
        const config = {
            method: 'get',
            url: 'http://localhost:5000/users/',
            headers: {'Content-Type': 'application/json', 'x-access-token': token}
        }
        axios(config)
        .then(res => {
            console.log(res.data)
            const data = res.data
            setGender(data.gender)
            setEmail(data.email)
            setFirstname(data.firstname)
            setSurname(data.surname)
            setBirthdate(data.birthdate.split('T')[0])
        })
        .catch(error => {
            if (error.response && error.response.status >= 400 && error.response.status <= 500)
            {
                localStorage.removeItem("token")
                window.location.reload()
            }
        })
    },[])

    const handleSubmit = e => {
        e.preventDefault()
        setErrors({})
        const errors = {}

        if (!email) {
            errors.email = "Email jest wymagany";
          } else if (!/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/i.test(email)) {
            errors.email = "Niepoprawny email";
          }
                    
          if (!firstname) {
            errors.firstname = "Imię jest wymagane";
          } else if (firstname.length < 3) {
            errors.firstname = "Imię musi zawierać co najmniej 3 znaki";
          }
          
          if (!surname) {
            errors.surname = "Nazwisko jest wymagane";
          } else if (surname.length < 3) {
            errors.surname = "Nazwisko musi zawierać co najmniej 3 znaki";
          }
          
          if (!birthdate) {
            errors.birthdate = "Data urodzenia jest wymagana";
          }
          
        if (Object.keys(errors).length > 0) {
          setErrors(errors)
          return
        }
    
        const userData = {
            gender,
            email,
            firstname,
            surname,
            birthdate
          };
          const config = {
            method: 'put',
            url: 'http://localhost:5000/users/',
            data: userData,
            headers: {'Content-Type': 'application/json', 'x-access-token': token}
          }
          axios(config)
            .then((response) => {
              window.location = '/profile'
            })
            .catch((error) => {
                console.log(error.response)
                if (
                    error.response &&
                    error.response.status >= 400 &&
                    error.response.status <= 500
                ) {
                    const backendErrors = error.response.data.errors
                    const modifiedErrors = {};

                    if (backendErrors.email && backendErrors.email.message) {
                        modifiedErrors.email = backendErrors.email.message;
                    }
                    setErrors(modifiedErrors)
                }
            });
    }

    return (
        <div>
            <h3>Rejestracja</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-check">
                        <input type="radio" 
                        className="form-check-input"
                        id="female" name="gender" 
                        value="female"
                        checked={gender === 'female'}
                        onChange={e => setGender(e.target.value)}
                        required />
                        <label className="form-check-label" for="female">Kobieta</label>
                    </div>
                    <div className="form-check">
                        <input type="radio" 
                        className="form-check-input" 
                        id="male" 
                        name="gender" 
                        value="male" 
                        checked={gender === 'male'}
                        onChange={e => setGender(e.target.value)}
                        required />
                        <label className="form-check-label" for="male">Mężczyzna</label>
                        {/* Errors here */}
                    </div>
                    <div className="col-md-6 mb-3">
                    <label htmlFor="email">Email</label>
                        <div className="input-group">
                            <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroupPrepend">@</span>
                            </div>
                            <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email..."
                            className={`form-control ${errors.email && 'is-invalid'}`}
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            />
                        {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                        </div>
                    </div>

                    <div className="col-md-6 mb-3">
                    <label htmlFor="firstname">Imię</label>
                    <input
                        type="text"
                        id="firstname"
                        name="firstname"
                        placeholder="Imię"
                        className={`form-control ${errors.firstname && 'is-invalid'}`}
                        value={firstname}
                        onChange={e => setFirstname(e.target.value)}
                        required
                    />
                    {errors.firstname && <div className='invalid-feedback'>{errors.firstname}</div>}
                    </div>

                    <div className="col-md-6 mb-3">
                    <label htmlFor="surname">Nazwisko</label>
                    <input
                        type="text"
                        id="surname"
                        name="surname"
                        placeholder="Nazwisko"
                        className={`form-control ${errors.surname && 'is-invalid'}`}
                        value={surname}
                        onChange={e => setSurname(e.target.value)}
                        required
                    />
                    {errors.surname && <div className='invalid-feedback'>{errors.surname}</div>}
                    </div>

                    <div className="col-md-6 mb-3">
                    <label htmlFor="birthdate">Data urodzenia</label>
                    <input
                        type="date"
                        id="birthdate"
                        name="birthdate"
                        className={`form-control ${errors.birthdate && 'is-invalid'}`}
                        value={birthdate}
                        onChange={e => setBirthdate(e.target.value)}
                        required
                    />
                    {errors.birthdate && <div className='invalid-feedback'>{errors.birthdate}</div>}
                    </div>
                    <button type="submit" className="btn btn-primary">Aktualizuj</button>
                </form>
        </div>
    )
}

export default EditProfile