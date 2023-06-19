import axios from 'axios'
import { useRef } from 'react'

const getCommentList = (comments) => {
    return (
        comments.map(comment => (
            <div className="card">
                <div className="card-body">
                <h5 className="card-title">{ comment.author ? comment.author.firstname + " " + comment.author.surname : "Gall anonim" }</h5>
                <h6 className="card-subtitle mb-2 text-muted">{ comment._id }</h6>
                <p className="card-text">{ comment.content }</p>
                </div>
            </div>
        ))
    )
}



const Comments = ({ comments, postID }) => {
    const contentRef = useRef()
    const token = localStorage.getItem("token")
    const handleSubmit = e => {
        e.preventDefault()
        const content = contentRef.current.value
        const config = {
            url: "http://localhost:5000/posts/comment",
            method: "post",
            data: {
                postID: postID, 
                content: content
            },
            headers: {'Content-Type': 'application/json', 'x-access-token': token}
        }
        axios(config)
        .then(res => {
            window.location.reload()
        })
        .catch(error => {
            if(error.response && error.response.status >= 400 && error.response.status < 500)
            {
                localStorage.removeItem("token")
                window.location = "/login"
            } else {
                window.location = "/"
            }
        })
    }
    return (
        <div className='mt-5'>
        <h2>Sekcja komentarzy</h2>
        <form onSubmit={handleSubmit} class="mb-3">
            <textarea ref={contentRef} id="content" cols="60" rows="10" placeholder="Aby dodać komentarz musisz być zalogowany"></textarea>
            <button type="submit" class="btn btn-primary">Opublikuj</button>
        </form>
        {
            Array.isArray(comments) && comments.length > 0
            ? comments.map(comment => (
                <div key={comment._id} className="card">
                    <div className="card-body">
                    <h5 className="card-title">{ comment.author ? comment.author.firstname + " " + comment.author.surname : "Gall anonim" }</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{ comment.date }</h6>
                    <p className="card-text">{ comment.content }</p>
                    </div>
                </div>
            ))
            : <p>Brak komentarzy</p>
        }
        </div>
    )
}

export default Comments