const Register = (props) => {
    return (
        <div>
            <h3>Rejestracja</h3>
                <form method="POST">
                    <div class="form-check">
                        <input type="radio" class="form-check-input" id="female" name="gender" value="female" required />
                        <label class="form-check-label" for="female">Kobieta</label>
                    </div>
                    <div class="form-check">
                        <input type="radio" class="form-check-input" id="male" name="gender" value="male" required />
                        <label class="form-check-label" for="male">Mężczyzna</label>
                        {/* Errors here */}
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="email">Email</label>
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="inputGroupPrepend">@</span>
                            </div>
                                <input type="email" 
                                id="email"
                                name="email"
                                placeholder="Email..." 
                                class="form-control"
                                required />
                            </div>
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="login">Login</label>
                        <input type="text" 
                        name="login" 
                        id="login"
                        placeholder="Login"
                        class="form-control"
                        required />
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="password">Hasło</label>
                        <input type="password" 
                            id="password" 
                            name="password" 
                            placeholder="Hasło" 
                            class="form-control"
                        required />
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="passwordconfirm">Powtórz hasło</label>
                        <input type="password" 
                            id="passwordconfirm" 
                            name="passwordconfirm" 
                            placeholder="Hasło" 
                            class="form-control"
                        required />
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="firstname">Imie</label>
                        <input type="text" 
                        name="firstname" 
                        id="firstname"
                        placeholder="Imie"
                        class="form-control"
                        required />
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="surname">Nazwisko</label>
                        <input type="text" 
                        name="surname" 
                        id="surname"
                        placeholder="Nazwisko"
                        class="form-control"
                        required
                        />
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="birthdate">Data urodzenia</label>
                        <input type="date" 
                        name="birthdate" 
                        id="birthdate"
                        class="form-control"
                        required />
                    </div>
                    <button type="submit" class="btn btn-primary">Zarejestruj</button>
                </form>
        </div>
    )
}

export default Register