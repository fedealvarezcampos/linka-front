import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { useGetResults } from '../api/posts';
import Spinner from '../assets/Spinner';
import Post from './Post';
import TopRated from './TopRated';
import Search from './Search';
import '../styles/Home.css';

function SearchResults({ setError }) {
    const token = useSelector(s => s.user?.token);

    const { search } = useLocation();
    const { q } = queryString.parse(search);

    const postsData = useGetResults(q, token);
    console.log(postsData);
    console.log(q);

    if (!postsData) {
        return <Spinner />;
    }

    return (
        <>
            <div className="App">
                <div className="homeContainer">
                    <ul className="postListContainer">
                        {postsData &&
                            postsData.map(post => <Post key={post.id} post={post} setError={setError} />)}
                    </ul>
                    <div className="homeSidebarContainer">
                        <Search />
                        <TopRated />
                    </div>
                </div>
            </div>
        </>
    );
}

export default SearchResults;
