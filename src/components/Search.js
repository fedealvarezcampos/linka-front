import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useSetLogNote } from '../context/LogNoteContext';
import { notifyError } from '../helpers/toasts';
import { getSearchResults } from '../api/posts';
import '../styles/Search.css';

function Search({ setError }) {
    const setLogNote = useSetLogNote();
    const history = useHistory();
    const [search, setSearch] = useState('');

    const token = useSelector(s => s.user?.token);
    // const isLoggedIn = useSelector(s => !!s.user);

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await getSearchResults(search, token);
            setSearch('');
            history.push('/search?q=' + search);
        } catch (error) {
            setLogNote(true);
            setError(error.response.data.error);
            notifyError(error.response.data.error);
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
