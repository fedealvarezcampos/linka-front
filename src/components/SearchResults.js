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

    if (!postsData) {
        return <Spinner />;
    }

    return (
        <>
            <div className="App">
                <div className="homeContainer">
                    {postsData.length === 0 ? (
                        <ul className="postListContainer noResults">
                            <li className="postContainer noResults">
                                <div className="postInfo">
                                    <span className="postInfoText">no results</span>
                                </div>
                                <div className="postContent">
                                    <div>No results</div>
                                </div>
                            </li>
                        </ul>
                    ) : (
                        <>
                            <ul className="postListContainer">
                                {postsData &&
                                    postsData.map(post => (
                                        <Post key={post.id} post={post} setError={setError} />
                                    ))}
                            </ul>
                        </>
                    )}
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
