import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Container, Button, Text, Loader,List } from '@mantine/core';
import { UserServices } from '../../components/user/UserServices';
import { User, ProfileUser, createUserProfile } from '../../components/user/User';
import RenderField from './RenderUserFields';
import {profileUserToUser} from '../../components/user/User';

function UserProfile() {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState(new User());
  const [userData, setUserData] = useState(new ProfileUser());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch user data based on userId
    const fetchUserData = async () => {
      try {
        const fetchedUser = await UserServices.getUser(parseInt(userId || '-1'));
        setUser(fetchedUser);
        setUserData(createUserProfile(fetchedUser)); // transform to profile user
        setLoading(false); // Data loaded, set loading to false
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Error fetching user data'); // Set an error message
        setLoading(false); // Data loading failed, set loading to false
      }
    };

    fetchUserData();
  }, [userId]);

  const renderEditableField = () => {
    console.log(userData)
    return (
      <div>
        <Text size="xl">
          <RenderField obj={userData} setUserData={setUserData} />
        </Text>
      </div>
    );
  };

  if (loading) {
    return <Loader size="md" />;
  }

  const UpdateUser = () => {
    const updatedUser = profileUserToUser(user, userData);
    UserServices.updateUser(updatedUser);
    setUser(updatedUser);
  }

  return (
    <Container size="xs">
        <div>
          <h2>User Profile</h2>
          {renderEditableField()}
          <Button color="gray" radius="xl" onClick={UpdateUser}>
            Save All
          </Button>
        </div>

    </Container>
  );
}

export default UserProfile;
