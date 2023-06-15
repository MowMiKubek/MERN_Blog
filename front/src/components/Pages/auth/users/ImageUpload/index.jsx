const ImageUpload = (props) => {
    return (
        <div>
            <h3>Image upload</h3>
                <form method="POST" enctype="multipart/form-data">
                    <div class="col-md-6 mb-3">
                        <label for="image">Obrazek</label>
                        <input type="file" 
                            id="image" 
                            name="image" 
                            class="form-control"
                        required />
                    </div>
                    <button type="submit" class="btn btn-primary">Wyślij</button>
            </form>
        </div>
    )
}

export default ImageUpload