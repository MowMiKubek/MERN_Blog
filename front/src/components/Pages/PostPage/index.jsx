import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from 'axios'

import Comments from "./Comments"

// //? For testing purposes
// const getPost = (postName) => {
//     if(content.hasOwnProperty(postName))
//         return content[postName]
//     return `<p>Nie znaleziono postu o kluczu ${postName}</p>`
// }


const PostPage = (props) => {
    const { postid } = useParams()
    const [postData, setPostData] = useState({})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        axios.get(`http://localhost:5000/posts/${postid}`)
            .then(res => {
                setPostData(res.data)
                console.log(res.data)
                setLoading(false)
            })
            .catch(err => console.log(err))
    },[])

    // const postContent = getPost(postid)
    return (
        <div>
            {
                loading
                ? <p>Loading...</p>
                : <>
                    <h2 className="section-heading">{postData.title}</h2>
                    <div dangerouslySetInnerHTML={{__html: postData.content}}/>
                    <Comments 
                    comments={postData.comments} />
                </>
            }
        </div>
    )
}

export default PostPage