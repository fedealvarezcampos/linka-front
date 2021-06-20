import ReactTimeAgo from 'react-time-ago';
import { Link } from 'react-router-dom';
import '../styles/RecentActivity.css';
import { useSelector } from 'react-redux';

function RecentActivity({ note, setActivityMenu }) {
    const userId = useSelector(s => s.user?.id);

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
                            {note.username}{' '}
                            <span>{`${
                                note.parentId === null || note?.parentUserId !== userId
                                    ? 'commented'
                                    : 'responded to you'
                            }`}</span>
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
