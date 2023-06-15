import PostItem from "./PostItem"

const postData = [
    {
        id: 1,
        title: 'Polak pobił rekord świata',
        subtitle: 'Po 12 latach rekord świata wraca do Polski!',
        author: 'Jakub Tkaczyk',
        date: '8 czerwca 2022'
    },
    {
        id: 2,
        title: 'Metody układania kostki Rubika',
        author: 'Jakub Tkaczyk',
        date: '10 marca 2022'
    },
    {
        id: 3,
        title: 'Słowniczek speedcubera',
        subtitle: '"Kilka" trudniejszych słów używanych przez speedcuberów ;)',
        author: 'Jakub Tkaczyk',
        date: '8 marca 2022'
    },
    {
        id: 4,
        title: 'Krótka historia speedcubingu',
        subtitle: 'Czyli od czego to wszystko się zaczęło...',
        author: 'Jakub Tkaczyk',
        date: '7 lutego 2022'
    },
]

const PostList = (props) => {
    return (
        <div className="container px-4 px-lg-5">
            <div className="row gx-4 gx-lg-5 justify-content-center">
                <div className="col-md-10 col-lg-8 col-xl-7">
                    {
                        postData.map(post => (
                            <div key={post.id}>
                            <PostItem 
                                title={post.title}
                                subtitle={post.subtitle}
                                author={post.author}
                                date={post.date}/>
                            <hr class="my-4" />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default PostList