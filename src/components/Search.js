import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getSearchResults } from '../api/posts';
import '../styles/Search.css';

function Search({ setError }) {
    const history = useHistory();
    const [search, setSearch] = useState('');

    const token = useSelector(s => s.user?.token);
    // const isLoggedIn = useSelector(s => !!s.user);

    const handleSubmit = async e => {
        e.preventDefault();
        history.push('/search?q=' + search);
        try {
            await getSearchResults(search, token);
        } catch (error) {
            setError(error.response.data.error);
        }
    };

    return (
        <div className="searchContainer">
            <form onSubmit={handleSubmit}>
                <input
                    type="search"
                    placeholder="search..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </form>
        </div>
    );
}

export default Search;
