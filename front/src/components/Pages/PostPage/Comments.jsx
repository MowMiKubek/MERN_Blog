const getCommentList = (comments) => {
    return (
        comments.map(comment => (
            <div class="card">
                <div class="card-body">
                <h5 class="card-title">{ comment.author ? comment.author.firstname + " " + comment.author.surname : "Gall anonim" }</h5>
                <h6 class="card-subtitle mb-2 text-muted">{ comment._id }</h6>
                <p class="card-text">{ comment.content }</p>
                </div>
            </div>
        ))
    )
}

const Comments = ({ comments }) => {
    return (
        <div>
        <h2>Sekcja komentarzy</h2>
        {
            Array.isArray(comments) && comments.length > 0
            ? comments.map(comment => (
                <div key={comment._id} class="card">
                    <div class="card-body">
                    <h5 class="card-title">{ comment.author ? comment.author.firstname + " " + comment.author.surname : "Gall anonim" }</h5>
                    <h6 class="card-subtitle mb-2 text-muted">{ comment.date }</h6>
                    <p class="card-text">{ comment.content }</p>
                    </div>
                </div>
            ))
            : <p>Brak komentarzy</p>
        }
        </div>
    )
}

export default Comments