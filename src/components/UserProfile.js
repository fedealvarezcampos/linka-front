import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useGetProfile } from '../api/users';
import Post from './Post';
import ProfileCard from './ProfileCard';
import Spinner from '../assets/Spinner';
import '../styles/UserProfile.css';

const UserProfile = ({ setLogNote }) => {
    const { username } = useParams();
    const profileData = useGetProfile(username);

    if (!profileData) {
        return <Spinner />;
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
                            <Post
                                key={post.id}
                                post={post}
                                username={profileData.username}
                                setLogNote={setLogNote}
                            />
                        ))}
                </ul>
                <ProfileCard user={profileData} />
            </div>
        </>
    );
};

export default UserProfile;
