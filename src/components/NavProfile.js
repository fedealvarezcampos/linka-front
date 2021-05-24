function NavProfile({ user }) {
    return (
        <div className="navProfile">
            <div
                className="avatar"
                style={{ backgroundImage: `url(http://localhost:3001/images/avatars/${user.avatar})` }}
            />
            <div>
                <p>{user.username}</p>
                <p className="love">
                    {user.love}
                    <i className="ci-heart_fill"></i>
                </p>
            </div>
        </div>
    );
}

export default NavProfile;

// /home/fede/linka/static/images/avatars/10b16a10-884f-492b-9cd8-358a6651098f.jpg
