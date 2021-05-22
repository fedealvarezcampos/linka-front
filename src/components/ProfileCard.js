import './ProfileCard.css';

const ProfileCard = ({ user }) => {
    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="userCardContainer">
            <span>
                profile<i className="bi bi-file-person-fill"></i>
            </span>
            <div className="userCardContent">
                <div
                    className="userCardAvatar"
                    style={{ backgroundImage: `url(https://i.imgur.com/AWJbxCk.jpg)` }}
                    alt="user avatar"
                ></div>
                <div className="userCardSocial"></div>
                <div>
                    <p className="userCardUsername">{user.username}</p>
                    <p className="userCardLove">
                        {user.love}
                        <i className="ci-heart_fill"></i>
                    </p>
                </div>
                <p className="userCardBio">{user.bio}</p>
            </div>
        </div>
    );
};

export default ProfileCard;
