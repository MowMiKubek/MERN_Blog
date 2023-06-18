import { useState, useEffect } from 'react'
import axios from 'axios'

const getPostTable = (posts, callback) => {
    const result = posts.map(post => (
        <tr key={post._id}>
            <td>{post.title}</td>
            <td>{post.date}</td>
            <td>
                <div className="btn-group">
                    <a href="#" onClick={() => callback(post._id)} type="button" className="btn btn-danger btn-sm">Delete</a>
                </div>
            </td>
        </tr>
    ))
    return result
}



const AdminPosts = (props) => {
    const [postList, setPostList] = useState([])
    const [loading, setLoading] = useState(true)
    const [auth, setAuth] = useState(false)
    const removePost = async (postID) => {
        try {
            setLoading(true)
            const token = localStorage.getItem("token")
            const config = {
                url: 'http://localhost:5000/posts/',
                method: "delete",
                data: { postID: postID },
                headers: { "Content-Type": "application/json", "x-access-token": token}
            }
            await axios(config)
            await fetchPostList()
            setLoading(false)
        } catch(error) {
            if(error.response){
                const code = error.response.status
                if(code === 401){ // invalid token
                    localStorage.removeItem("token")
                    window.location = '/login'
                }
                if(code ===  403){ // wrong role
                    window.location = '/profile'
                } else {
                    console.log(error.response)
                    window.location = '/'
                }
            }
        }
    }

    const fetchPostList = async () => {
        setLoading(true)
        const token = localStorage.getItem("token")
        const config = {
            url: 'http://localhost:5000/posts/',
            method: "get",
            headers: { "Content-Type": "application/json", "x-access-token": token}
        }
        try {
            const result = await axios(config)
            const data = result.data
            console.log(data)
            setPostList(data)
            setLoading(false)
        } catch(error) {
            if(error.response){
                const code = error.response.status
                if(code === 401){ // invalid token
                    localStorage.removeItem("token")
                    window.location = '/login'
                }
                if(code ===  403){ // wrong role
                    window.location = '/profile'
                } else {
                    console.log(error.response)
                    window.location = '/'
                }
            }
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("token")
        const config = {
            url: 'http://localhost:5000/users',
            method: 'get',
            headers: {'Content-Type': 'application/json', 'x-access-token': token}
        }
        axios(config)
            .then(res => {
                const data = res.data
                console.log(data)
                if(data.accountType !== 'admin'){
                    window.location = '/profile'
                    return
                } else {
                    setAuth(true)
                }
            })
            .catch(error => {
                console.log(error)
                if (error.response && error.response.status >= 400 && error.response.status <= 500)
                {
                    localStorage.removeItem("token")
                    window.location = '/login'
                }
            })
        fetchPostList()
        console.log(postList)
    },[])
    return (
        <div>
            {
                loading || !auth
                ? <p>Loading...</p>
                : <table className="table table-striped">
                <thead>
                    <tr>
                      <th scope="col">Tytuł</th>
                      <th scope="col">Data</th>
                      <th scope="col">Akcja</th>
                    </tr>
                </thead>
                <tbody>
                    { getPostTable(postList, removePost) }
                </tbody>
                </table>
            }
        </div>
    )
}

export default AdminPosts