import PostItem from "./PostItem"

// const postData = [
//     {
//         id: 'rekord',
//         title: 'Polak pobił rekord świata',
//         subtitle: 'Po 12 latach rekord świata wraca do Polski!',
//         author: 'Jakub Tkaczyk',
//         date: '8 czerwca 2022'
//     },
//     {
//         id: 'metody',
//         title: 'Metody układania kostki Rubika',
//         author: 'Jakub Tkaczyk',
//         date: '10 marca 2022'
//     },
//     {
//         id: 'slownik',
//         title: 'Słowniczek speedcubera',
//         subtitle: '"Kilka" trudniejszych słów używanych przez speedcuberów ;)',
//         author: 'Jakub Tkaczyk',
//         date: '8 marca 2022'
//     },
//     {
//         id: 'historia',
//         title: 'Krótka historia speedcubingu',
//         subtitle: 'Czyli od czego to wszystko się zaczęło...',
//         author: 'Jakub Tkaczyk',
//         date: '7 lutego 2022'
//     },
// ]

import { useEffect, useState } from "react"
import axios from 'axios'

const PostList = (props) => {
    const [postData, setPostData] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        axios.get('http://localhost:5000/posts/')
            .then(res => {
                setPostData(res.data)
                setLoading(false)
            })
            .catch(err => console.log(err))
    }, [])
    console.log(postData)
    return (
        <div>
        {
            loading
            ? <p>Loading...</p>
            : postData.map(post => (
                <div key={post._id}>
                <PostItem 
                    key={post._id}
                    _id={post._id}
                    title={post.title}
                    subtitle={post.subtitle}
                    author={post.author}
                    date={post.date}
                    />
                <hr className="my-4" />
                </div>
            ))
        }
        </div>
    )
}

export default PostList