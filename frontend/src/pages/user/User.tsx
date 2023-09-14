import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Container, Paper,  Flex } from '@mantine/core';
import { UserServices } from '../../components/user/UserServices';
import ProfileButton from '../../components/user/ProfileButton';
import LogoutButton from '../../components/logout/LogoutButton';
import UserBooks from '../books/UserBooks';
import User from '../../components/user/User';

function UserPage() {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [userData, setUserData] = useState<User>(new User());


  useEffect(() => {
    // Fetch user data based on userId
    const fetchUserData = async () => {
      try {
        const user = await UserServices.getUser(parseInt(userId||'-1'));
        setUserData(user);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId]);


  return (
    <Container size="xs">
      <Paper p="lg" shadow="xs">
        <Flex justify="end" direction="row" align="start" style={{ position: 'absolute', top: '10px', right: '10px' }}>
          <UserBooks user={userData}/>
          <ProfileButton />
          <LogoutButton />
        </Flex>
      </Paper>
    </Container>
  );
}

export default UserPage;
