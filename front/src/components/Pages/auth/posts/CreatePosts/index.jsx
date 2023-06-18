import { useRef, useState, useEffect } from "react";
import axios from 'axios'
const CreatePosts = (props) => {
    
    const titleRef = useRef();
    const subtitleRef = useRef();
    const contentRef = useRef();

    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});
        const errors = {};

        if (!titleRef.current.value) 
            errors.title = "Tytuł jest wymagany";
        else if (titleRef.current.value.length < 3)
            errors.title = "Tytuł jest za krótki";

        if (!subtitleRef.current.value) 
            errors.subtitle = "Podtytuł jest wymagany";
        else if (subtitleRef.current.value.length < 3)
            errors.subtitle = "Podtytuł jest za krótki";

        if (!contentRef.current.value) 
            errors.content = "Treść jest wymagana";

        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }

        // Access the form data using the refs
        const formData = {
            title: titleRef.current.value,
            subtitle: subtitleRef.current.value,
            content: contentRef.current.value,
        };
        const token = localStorage.getItem("token")
        const config = {
            url: 'http://localhost:5000/posts/',
            method: 'post',
            data: formData,
            headers: {'Content-Type': 'application/json', 'x-access-token': token}
        }
        // Process the form data as needed
        console.log(formData);
        axios(config)
        .then(res => {
            window.location = "/profile"
        })
        .catch(error => {
            if(error.response && error.response.status === 401){
                // invalid token, logout
                localStorage.removeItem("token")
                window.location = "/login"
            } else{
                window.location = "/"
            }
        })
    };

    const token = localStorage.getItem("token")
    if(!token) {
        window.location = '/'
        return
    }

    useEffect(() => {
        const token = localStorage.getItem("token")
        const forbiddenRoles = ['manager', 'admin']
        const config = {
            url: 'http://localhost:5000/users',
            method: 'get',
            headers: {'Content-Type': 'application/json', 'x-access-token': token}
        }
        axios(config)
            .then(res => {
                const data = res.data
                if(!forbiddenRoles.includes(data.accountType)) {
                    window.location = "/profile"
                }
            })
            .catch(error => {
                console.log(error)
                window.location  = "/profile"
            })
    },[])

    return (
    <div>
        <h3>Logowanie</h3>
        <form onSubmit={handleSubmit}>
            <div className="col-md-6 mb-3">
                <label htmlFor="title">Tytuł</label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Tytuł"
                    className={`form-control ${errors.title && "is-invalid"}`}
                    ref={titleRef}
                    required
                />
                {errors.title && <div className="invalid-feedback">{errors.title}</div>}
            </div>
            <div className="col-md-6 mb-3">
                <label htmlFor="subtitle">Podtytuł</label>
                <input
                type="text"
                name="subtitle"
                id="subtitle"
                placeholder="Podtytuł"
                className={`form-control ${errors.subtitle && "is-invalid"}`}
                ref={subtitleRef}
                required
                />
                {errors.subtitle && <div className="invalid-feedback">{errors.subtitle}</div>}
            </div>
            <div className="col-md-10 mb-3">
                <textarea
                id="content"
                name="content"
                rows="10"
                cols="50"
                placeholder="Wklej tutaj treść posta"
                className={`form-control ${errors.content && "is-invalid"}`}
                ref={contentRef}
                required
                />
                {errors.content && <div className="invalid-feedback">{errors.content}</div>}
            </div>
            <button type="submit" className="btn btn-primary">
                Wyślij
            </button>
        </form>
    </div>
    );
};

export default CreatePosts;
