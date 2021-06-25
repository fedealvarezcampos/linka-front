import ReactTimeAgo from 'react-time-ago';
import { Link } from 'react-router-dom';
import '../styles/RecentActivity.css';
import { useSelector } from 'react-redux';

function RecentActivity({ note, setActivityMenu }) {
    const { REACT_APP_PUBLIC: baseURL } = process.env;
    const { REACT_APP_STATIC: staticURL } = process.env;

    const userId = useSelector(s => s.user?.id);

    const noteDate = new Date(note.commentDate);
    const postTitleURL = note.postTitle.replaceAll(' ', '-').toLowerCase();

    return (
        <>
            <li className="activityContainer">
                <div
                    className={`activityUserAvatar ${
                        note.username === 'Account suspended' ? 'noUserAvatar' : ''
                    }`}
                    style={
                        note?.avatar
                            ? { backgroundImage: `url(${staticURL}images/avatars/${note.avatar})` }
                            : { backgroundImage: `url(${baseURL}images/avatars/default.jpg)` }
                    }
                />
                {note && (
                    <div className="activityTextContainer">
                        <div>
                            {note.username !== 'Account suspended' ? (
                                <Link
                                    to={`/users/${note.username}`}
                                    onClick={() => setActivityMenu(false)}
                                    className="activityUser"
                                >
                                    {note.username}{' '}
                                </Link>
                            ) : (
                                <span className="noUser">deleted user </span>
                            )}
                            <span className="responseType">{`${
                                note.parentId === null || note?.parentUserId !== userId
                                    ? 'commented'
                                    : 'responded to you'
                            }`}</span>
                        </div>
                        <span className="activityDate">
                            <p>
                                in{' '}
                                <Link
                                    to={`/posts/${note.postId}/${postTitleURL}`}
                                    onClick={() => setActivityMenu(false)}
                                    className="activityPostTitle"
                                >
                                    {note.postTitle}
                                </Link>{' '}
                            </p>
                        </span>
                        <span className="activityDate">
                            <ReactTimeAgo date={noteDate} timeStyle="round" locale="en-US" />
                        </span>
                        <div className="activityComment">{note.comment}</div>
                    </div>
                )}
            </li>
        </>
    );
}

export default RecentActivity;
