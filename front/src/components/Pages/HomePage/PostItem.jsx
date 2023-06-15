const PostItem = (props) => {
    return (
        <div className="post-preview">
            <a href="posty/rekord.html">
                <h2 className="post-title">{ props.title }</h2>
                <h3 className="post-subtitle">{ props.subtitle }</h3>
            </a>
            <p className="post-meta">
                Zamieszczone przez &nbsp;
                <b>{ props.author }</b>&nbsp;
                { props.date }
            </p>
        </div>
    )
}

export default PostItem