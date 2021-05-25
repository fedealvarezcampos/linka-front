import { useParams } from 'react-router-dom';
import { useGetProfile } from '../api/users';
import Post from '../components/Post';
import ProfileCard from '../components/ProfileCard';
import './UserProfile.css';

const UserProfile = () => {
    const { username } = useParams();
    const profileData = useGetProfile(username);

    if (!profileData) {
        return <div>Loading...</div>;
    }

    return (
        <>
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
