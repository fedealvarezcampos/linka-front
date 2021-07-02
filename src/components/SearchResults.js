import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { useGetResults } from '../api/posts';
import Spinner from '../assets/Spinner';
import Post from './Post';
import TopRated from './TopRated';
import Search from './Search';
import NoResultsPost from './NoResultsPost';
import NavSort from './NavSort';
import '../styles/Home.css';

function SearchResults({ sort, setSort, setError }) {
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
                        <NoResultsPost />
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
                    <aside className="homeOuterSidebarContainer">
                        <div className="homeSidebarContainer">
                            {user && <Search setSort={setSort} setError={setError} />}
                            <TopRated />
                        </div>
                    </aside>
                </div>
            </div>
        </>
    );
}

export default SearchResults;
