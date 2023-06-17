import { NavLink } from 'react-router-dom'

//* There is interesting bug, if you type postID manually it doesn't render header image
const PostItem = (props) => {
    return (
        <div className="post-preview">
            <NavLink to={`/posts/${props._id}`} >
                <h2 className="post-title">{ props.title }</h2>
                <h3 className="post-subtitle">{ props.subtitle }</h3>
            </NavLink>
            <p className="post-meta">
                Zamieszczone przez &nbsp;
                <b>
                {
                    props.author
                    ? `${props.author.firstname} ${props.author.surname}`
                    : "Gall anomin"
                }
                </b>&nbsp;
                { props.date }
            </p>
        </div>
    )
}

export default PostItem