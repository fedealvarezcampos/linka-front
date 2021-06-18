import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { useSetLogNote } from '../context/LogNoteContext';
import { useGetResults } from '../api/posts';
import Spinner from '../assets/Spinner';
import Post from './Post';
import TopRated from './TopRated';
import Search from './Search';
import NavSort from './NavSort';
import '../styles/Home.css';

function SearchResults({ sort, setSort, setError }) {
    const setLogNote = useSetLogNote();
    const user = useSelector(s => s.user);
    const token = useSelector(s => s.user?.token);

    const { search } = useLocation();
    const { q } = queryString.parse(search);

    useEffect(() => {
        setSort('');
    }, [setSort]);

    const postsData = useGetResults(q, sort, token);

    if (!postsData) {
        return <Spinner />;
    }

    return (
        <>
            <div className="App">
                <div className="homeContainer">
                    <NavSort sort={sort} setSort={setSort} />
                    {postsData.length === 0 ? (
                        <ul className="postListContainer noResults">
                            <li className="postContainer noResults">
                                <div className="postInfo noResults">
                                    <span className="postInfoText noResults">no results</span>
                                </div>
                                <div className="postContent noResults">
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
                        {user && <Search setSort={setSort} setError={setError} />}
                        <TopRated />
                    </div>
                </div>
            </div>
        </>
    );
}

export default SearchResults;
