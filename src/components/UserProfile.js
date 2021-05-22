import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useGetProfile } from '../api/users';
import './UserProfile.css';
import Post from '../components/Post';
import Header from '../components/Header';
import ProfileCard from '../components/ProfileCard';

const UserProfile = () => {
    const [modal, setModal] = useState(false);
    const { username } = useParams();
    const profileData = useGetProfile(username);

    if (!profileData) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Header modal={modal} setModal={setModal} />
            <div className="userPageContainer">
                <ul className="postListContainer">
                    {profileData &&
                        profileData.userPosts.map(post => (
                            <Post key={post.id} post={post} user={profileData.username} />
                        ))}
                </ul>
                <ProfileCard user={profileData} />
            </div>
        </>
    );
};

export default UserProfile;
