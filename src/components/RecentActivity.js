import ReactTimeAgo from 'react-time-ago';
import '../styles/RecentActivity.css';

function RecentActivity({ note, setError, setLogNote }) {
    // console.log(post);

    // const [likes, setLikes] = useState(post?.likes || 0);

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
                <div className="activityTextContainer">
                    <div className="activityUser">{note.username}</div>
                    <span className="activityDate">
                        <p>
                            replied to your link <ReactTimeAgo date={noteDate} locale="en-US" />
                        </p>
                    </span>
                    <div className="activityComment">{note.comment}</div>
                </div>
            </li>
        </>
    );
}

export default RecentActivity;
