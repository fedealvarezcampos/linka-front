import '../styles/ProfileCard.css';

const ProfileCard = ({ user }) => {
    if (!user) {
        return <div>Loading...</div>;
    }

    console.log(user.userTW);

    return (
        <div className="userCardContainer">
            <span>
                profile<i className="bi bi-file-person-fill"></i>
            </span>
            <div className="userCardContent">
                <div
                    className="userCardAvatar"
                    style={{
                        backgroundImage: `url(http://localhost:8080/images/avatars/${
                            user.avatar || 'default.jpg'
                        })`,
                    }}
                    alt="user avatar"
                />
                {(user?.userSite ||
                    user?.userTW !== ('https://twitter.com/' || null) ||
                    user?.userIG !== ('https://instagram.com/' || null)) && (
                    <div className="userCardSocial">
                        {user?.userSite && (
                            <a href={user.userSite}>
                                <i className="bi bi-house-fill" />
                            </a>
                        )}
                        {user?.userTW !== `https://twitter.com/` && user?.userTW !== null && (
                            <a href={user.userTW}>
                                <i className="bi bi-twitter" />
                            </a>
                        )}
                        {user?.userIG !== `https://instagram.com/` && user?.userIG !== null && (
                            <a href={user.userIG}>
                                <i className="bi bi-instagram" />
                            </a>
                        )}
                    </div>
                )}
                <div>
                    <p className="userCardUsername">{user.username}</p>
                    <p className="userCardLove">
                        {user.love}
                        <i className="ci-heart_fill"></i>
                    </p>
                </div>
                {user?.bio && <i className="bi bi-chat-square-quote-fill quote" />}
                {user?.bio && <p className="userCardBio">{user.bio}</p>}
            </div>
        </div>
    );
};

export default ProfileCard;
