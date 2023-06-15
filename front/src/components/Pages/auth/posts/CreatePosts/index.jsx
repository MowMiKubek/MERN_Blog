const CreatePosts = (props) => {
    return (
        <div>
            <h3>Logowanie</h3>
            <form method="POST">
                <div class="col-md-6 mb-3">
                    <label for="title">Tytuł</label>
                    <input type="text" 
                    name="title" 
                    id="title"
                    placeholder="Tytuł"
                    
                    required />
                    {/* error here */}
                </div>
                <div class="col-md-6 mb-3">
                    <label for="subtitle">Podytuł</label>
                    <input type="text" 
                    name="subtitle" 
                    id="subtitle"
                    placeholder="Podtytuł"
                    required />
                </div>
                <div class="col-md-10 mb-3">
                    <textarea
                        id="content" 
                        name="content" 
                        rows="10"
                        cols="50"
                        placeholder="Wklej tutaj treść posta"
                        class="form-control
                        <% if (errors) { %>
                            is-invalid
                        <% } %>"
                    required />
                </div>
                <button type="submit" class="btn btn-primary">Wyślij</button>
            </form>
        </div>
    )
}

export default CreatePosts