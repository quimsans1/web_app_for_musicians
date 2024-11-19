import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; // Página principal
import ProfilePage from './pages/ProfilePage';
import AdvertisementsPage from './pages/AdvertisementsPage';
import ChatsPage from './pages/ChatsPage';
import Layout from './Layout';
import { getMainUser } from './services/userService';

function App() {
  const [mainUser, setMainUser] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const user = await getMainUser();
        setMainUser(user[0]);
      } catch (error) {
        console.error('Error fetching main user:', error);
      }
    };
    fetchUsers();
  }, []);

  return (
    mainUser && (
      <Routes>
        <Route path="/" element={<Layout mainUser={mainUser}/>}>
          <Route index element={<Home />} />
          <Route path="profile/:userId" element={<ProfilePage mainUser={mainUser} />} />
          <Route path="advertisements" element={<AdvertisementsPage mainUser={mainUser} />} />
          <Route path="chats" element={<ChatsPage />} />
        </Route>
      </Routes>
    )
  );
}

export default App;
