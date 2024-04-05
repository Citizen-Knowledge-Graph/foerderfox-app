import React, { useEffect, useState } from 'react';
import ScreenView from '../../components/ScreenView';
import UserProfile from './components/UserProfile';
import { fetchProfileScreenData } from './ProfileScreenController';
import { useSelector } from 'react-redux';

// Component
const ProfileScreen = () => {
  const [profileScreenData, setProfileScreenData] = useState(null);
  const selectedUser = useSelector((state) => state.selectUserReducer);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newProfileScreenData = await fetchProfileScreenData(selectedUser);
        setProfileScreenData(newProfileScreenData);
      } catch (error) {
        console.error('Failed to fetch home screen data:', error);
      }
    };

    fetchData();
  }, [selectedUser]);

  return (
    <ScreenView screenName={'Profile'}>
      {profileScreenData ? (
        <UserProfile profileScreenData={profileScreenData} />
      ) : null}
    </ScreenView>
  );
};

export default ProfileScreen;
