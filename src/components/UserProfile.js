import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useGetProfile } from '../api/users';
import Post from './Post';
import NoResultsPost from './NoResultsPost';
// import ErrorMessage from './ErrorMessage';
import ProfileCard from './ProfileCard';
import Spinner from '../assets/Spinner';
import '../styles/UserProfile.css';

const UserProfile = () => {
    const { username } = useParams();
    const profileData = useGetProfile(username);

    if (!profileData) {
        return <Spinner />;
    }

    // if (profileData?.username !== username) {
    //     return <ErrorMessage />;
    // }

    return (
        <>
            <Helmet>
                <title>{`${username} - Linkah`}</title>
            </Helmet>
            <div className="userPageContainer">
                <ul className="postListContainer">
                    {profileData?.userPosts.length === 0 ? (
                        <NoResultsPost />
                    ) : (
                        profileData &&
                        profileData.userPosts.map(post => (
                            <Post key={post.id} post={post} username={profileData.username} />
                        ))
                    )}
                </ul>
                <ProfileCard user={profileData} />
            </div>
        </>
    );
};

export default UserProfile;
