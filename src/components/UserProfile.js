import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useGetProfile } from '../api/users';
import Post from './Post';
import ProfileCard from './ProfileCard';
import './UserProfile.css';

const UserProfile = () => {
    const { username } = useParams();
    const profileData = useGetProfile(username);

    if (!profileData) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Helmet>
                <title>{`${username} - Linkah`}</title>
            </Helmet>
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
