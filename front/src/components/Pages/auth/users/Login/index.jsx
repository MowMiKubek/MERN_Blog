const Login = (props) => {
    return (
        <div>
            <h3>Logowanie</h3>
                <form method="POST">
                    <div className="col-md-6 mb-3">
                        <label for="login">Login</label>
                        <input type="text" 
                        name="login" 
                        id="login"
                        placeholder="Login"
                        className="form-control"
                        required />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label for="password">Hasło</label>
                        <input type="password" 
                            id="password" 
                            name="password" 
                            placeholder="Hasło" 
                            className="form-control"
                        required />
                        {/* errors here */}
                    </div>
                    <button type="submit" className="btn btn-primary">Zaloguj się</button>
            </form>
            <h5 className="mt-3">Nie masz konta? <a href="/user/register">Zarejestruj się</a></h5>
        </div>
    )
}

export default Login