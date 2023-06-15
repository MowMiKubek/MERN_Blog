const Password = (props) => {
    return (
        <div>
            <h3>Zmiana hasła</h3>
                <form method="POST">
                    <div className="col-md-6 mb-3">
                        <label for="password">Hasło</label>
                        <input type="password" 
                            id="password" 
                            name="password" 
                            placeholder="Hasło" 
                            className="form-control"
                        required />
                        <label for="passwordCheck">Powtórz hasło</label>
                        <input type="password" 
                            id="passwordCheck" 
                            name="passwordCheck" 
                            placeholder="Powtórz hasło" 
                            className="form-control"
                        required />
                    </div>
                    <button type="submit" className="btn btn-primary">Zmień hasło</button>
            </form>
        </div>
    )
}

export default Password