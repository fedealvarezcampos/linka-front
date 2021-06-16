import ReactTimeAgo from 'react-time-ago';
import { Link } from 'react-router-dom';
import '../styles/RecentActivity.css';

function RecentActivity({ note, setActivityMenu }) {
    const noteDate = new Date(note.commentDate);

    const postTitleURL = note.postTitle.replaceAll(' ', '-').toLowerCase();

    return (
        <>
            <li className="activityContainer">
                <div
                    className="activityUserAvatar"
                    style={{
                        backgroundImage: `url(http://localhost:8080/images/avatars/${
                            note.avatar || 'default.jpg'
                        })`,
                    }}
                />
                {note && (
                    <div className="activityTextContainer">
                        <Link
                            to={`/users/${note.username}`}
                            onClick={() => setActivityMenu(false)}
                            className="activityUser"
                        >
                            {note.username}
                        </Link>
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
                                <ReactTimeAgo date={noteDate} timeStyle="twitter" locale="en-US" />
                            </p>
                        </span>
                        <div className="activityComment">{note.comment}</div>
                    </div>
                )}
            </li>
        </>
    );
}

export default RecentActivity;
