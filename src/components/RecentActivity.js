import ReactTimeAgo from 'react-time-ago';
import { Link } from 'react-router-dom';
import '../styles/RecentActivity.css';
import { useSelector } from 'react-redux';

function RecentActivity({ note, setActivityMenu }) {
    const { REACT_APP_SERVER: baseURL } = process.env;
    const { REACT_APP_STATIC: staticURL } = process.env;

    const userId = useSelector(s => s.user?.id);

    const noteDate = new Date(note.commentDate);
    const postTitleURL = note.postTitle && note.postTitle.replaceAll(' ', '-').toLowerCase();

    console.log(note);

    return (
        <>
            <li className={`activityContainer ${note?.postTitle === 'DM' ? 'activityDMContainer' : ''}`}>
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
                            <span className="responseType">
                                {`${
                                    note?.parentId === null || note?.parentUserId !== userId
                                        ? note?.postTitle !== 'DM'
                                            ? 'commented'
                                            : 'messaged you'
                                        : 'responded to you'
                                }`}
                            </span>
                        </div>
                        <span className="activityDate">
                            {note?.postTitle !== 'DM' && (
                                <p>
                                    in{' '}
                                    <Link
                                        to={postTitleURL && `/posts/${note.postId}/${postTitleURL}`}
                                        onClick={() => setActivityMenu(false)}
                                        className="activityPostTitle"
                                    >
                                        {note.postTitle}
                                    </Link>{' '}
                                </p>
                            )}
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
