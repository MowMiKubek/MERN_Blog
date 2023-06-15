import PostItem from "./PostItem"

const postData = [
    {
        id: 'rekord',
        title: 'Polak pobił rekord świata',
        subtitle: 'Po 12 latach rekord świata wraca do Polski!',
        author: 'Jakub Tkaczyk',
        date: '8 czerwca 2022'
    },
    {
        id: 'metody',
        title: 'Metody układania kostki Rubika',
        author: 'Jakub Tkaczyk',
        date: '10 marca 2022'
    },
    {
        id: 'slownik',
        title: 'Słowniczek speedcubera',
        subtitle: '"Kilka" trudniejszych słów używanych przez speedcuberów ;)',
        author: 'Jakub Tkaczyk',
        date: '8 marca 2022'
    },
    {
        id: 'historia',
        title: 'Krótka historia speedcubingu',
        subtitle: 'Czyli od czego to wszystko się zaczęło...',
        author: 'Jakub Tkaczyk',
        date: '7 lutego 2022'
    },
]

const PostList = (props) => {
    return (
        <div>
        {
            postData.map(post => (
                <div key={post.id}>
                <PostItem 
                    {...post}/>
                <hr class="my-4" />
                </div>
            ))
        }
        </div>
    )
}

export default PostList