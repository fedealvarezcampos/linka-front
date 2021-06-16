import ReactTimeAgo from 'react-time-ago';
import '../styles/RecentActivity.css';

function RecentActivity({ note, setError, setLogNote }) {
    const noteDate = new Date(note.commentDate);

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
                        <div className="activityUser">{note.username}</div>
                        <span className="activityDate">
                            <p>
                                in <span className="activityPostTitle">{note.postTitle}</span>{' '}
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
