function NavProfile({ user }) {
    return (
        <div className="navProfile">
            <img src={user.avatar} alt="Avatar" />
            <div>
                <p>{user.username}</p>
                <p className="love">{user.love}</p>
            </div>
        </div>
    );
}

export default NavProfile;
