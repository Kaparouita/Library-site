import React, { useEffect, useState } from 'react';
import { Flex, Table, Button, Paper } from '@mantine/core';
import { SegmentedControl } from '@mantine/core';
import { UserServices } from '../../components/user/UserServices';
import { BookServices } from '../../components/book/BookServices';
import LogoutButton from '../../components/logout/LogoutButton';
import ProfileButton from '../../components/user/ProfileButton';

function Admin() {
  const [selectedMenu, setSelectedMenu] = useState<'users' | 'statistics'>('users');
  const [users, setUsers] = useState<any[]>([]);
  const [booksPerUni, setBooksPerUni] = useState<any[]>([]);
  const [booksPerType, setBooksPerType] = useState<any[]>([]);
  const [usersPerType, setUsersPerType] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await UserServices.getUsers();
        setUsers(userData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const fetchBooks = async () => {
    try {
      const bookUniData = await BookServices.getBooksPerUni('library');
      const bookTypeData = await BookServices.getBooksPerUni('type');
      const userTypeData = await UserServices.getUsersPerType('student_type');

      setBooksPerUni(bookUniData);
      setBooksPerType(bookTypeData);
      setUsersPerType(userTypeData);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  useEffect(() => {
    if (selectedMenu === 'statistics') {
      fetchBooks(); // Fetch statistics data when 'Statistics' is selected
    }
  }, [selectedMenu]);

  const handleDeleteUser = async (userId: number) => {
    try {
      await UserServices.deleteUser(userId);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleSelectedMenuChange = (value: 'users' | 'statistics') => {
    setSelectedMenu(value)
  };

  const filteredUsers = users.filter((user) => user.user_type !== 'admin');

  const rows = filteredUsers.map((user) => (
    <tr key={user.id}>
      <td>{user.first_name} {user.last_name}</td>
      <td>{user.username}</td>
      <td>{user.email}</td>
      <td>
        {user.student_type ? `${user.user_type} / ${user.student_type}` : user.user_type}
      </td>
      <td>
        <Button onClick={() => handleDeleteUser(user.id)} color="red">
          Delete
        </Button>
      </td>
    </tr>
  ));

  // Conditionally render either the Users or Statistics table based on the selected menu
  const tableToRender = selectedMenu === 'users' ? (
    <Table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Username</th>
          <th>Email</th>
          <th>Type</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  ) : (
    <>
      <h2>Library Statistics</h2>
      <Table>
        <thead>
          <tr>
            <th>Library</th>
            <th>Total Books</th>
          </tr>
        </thead>
        <tbody>
          {booksPerUni.map((entry, index) => (
            <tr key={index}>
              <td>{entry.group}</td>
              <td>{entry.total_books}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Total Books</th>
          </tr>
        </thead>
        <tbody>
          {booksPerType.map((entry, index) => (
            <tr key={index}>
              <td>{entry.group}</td>
              <td>{entry.total_books}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <h2>User Statistics</h2>
      <Table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Total Users</th>
          </tr>
        </thead>
        <tbody>
          {usersPerType
            .filter((entry) => entry.group !== "")
            .map((entry, index) => (
              <tr key={index}>
                <td>{entry.group}</td>
                <td>{entry.total_users}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );

  return (
    <Flex gap="xl" direction="column" align="center" style={{ height: '100vh' }}>
      <h1>Admin</h1>
      <Paper p='xs' style={{ marginBottom: '16px' }}>
        <Flex gap="md">
          {/* SegmentedControl for switching between Users and Statistics */}
          <SegmentedControl
            value={selectedMenu}
            onChange={handleSelectedMenuChange}
            data={[
              { label: 'Users', value: 'users' },
              { label: 'Statistics', value: 'statistics' },
            ]}
          />
        </Flex>
      </Paper>
      <Paper >
        {tableToRender}
      </Paper>
      <Flex
        justify="end"
        direction="row"
        align="start"
        style={{ position: 'absolute', top: '10px', right: '10px' }}
      >
        <ProfileButton />
        <LogoutButton />
      </Flex>
    </Flex>
  );
}

export default Admin;
