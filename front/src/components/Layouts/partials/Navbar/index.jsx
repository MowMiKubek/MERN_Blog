import { NavLink } from "react-router-dom"

const logout = (e) => {
    e.preventDefault()
    localStorage.removeItem("token")
    window.location.reload();
}

const Navbar = (props) => {
    const token = localStorage.getItem("token")
    return (
        <nav className="navbar navbar-expand-lg navbar-light" id="mainNav">
            <div className="container px-4 px-lg-5">
                <NavLink className="navbar-brand" to="/">Strona główna</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    Menu
                    <i className="fas fa-bars"></i>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ms-auto py-4 py-lg-0">
                        <li className="nav-item"><NavLink className="nav-link px-lg-3 py-3 py-lg-4" to="/">Główna</NavLink></li>
                        <li className="nav-item"><NavLink className="nav-link px-lg-3 py-3 py-lg-4" to="/about">O mnie</NavLink></li>
                        {token 
                        ? <>
                            <li className="nav-item"><NavLink className="nav-link px-lg-3 py-3 py-lg-4" to="/profile">Profil</NavLink></li>
                            <li className="nav-item"><a className="nav-link px-lg-3 py-3 py-lg-4" href="#" onClick={logout}>Wyloguj</a></li>
                        </>
                        : <li className="nav-item"><NavLink className="nav-link px-lg-3 py-3 py-lg-4" to="/login">Zaloguj</NavLink></li>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar