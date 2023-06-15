const Delete = (props) => {
    return (
        <div>
            <h3>Potwierdź usunięcie konta hasłem</h3>
                <form method="POST">
                    <div class="col-md-6 mb-3">
                        <label for="password">Hasło</label>
                        <input type="password" 
                            id="password" 
                            name="password" 
                            placeholder="Hasło" 
                            class="form-control"
                        required />
                        {/* Error goes here */}
                    </div>
                    <button type="submit" class="btn btn-primary">Zmień hasło</button>
            </form>
        </div>
    )
}

export default Delete