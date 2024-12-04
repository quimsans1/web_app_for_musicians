import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import AdvertisementsPage from './pages/AdvertisementsPage';
import ChatsPage from './pages/ChatsPage';
import Layout from './Layout';
import { getMainUser } from './services/userService';

function App() {
  const [mainUser, setMainUser] = useState([]);
  const [getMainUserAgain, setGetMainUserAgain] = useState(false);

  // GET MAIN USER - When mounted
  useEffect(() => {
    fetchMainUser();
  }, []);

  // Executes when getMainUserAgain changes to true
  useEffect(() => {
    if (getMainUserAgain) {
      fetchMainUser();
      setGetMainUserAgain(false);
    }
  }, [getMainUserAgain]);

  const fetchMainUser = async () => {
    try {
      const user = await getMainUser();
      setMainUser(user);
    } catch (error) {
      console.error('Error fetching main user:', error);
    }
  };

  return (
    mainUser && (
      <Routes>
        <Route path="/" element={<Layout mainUser={mainUser}/>}>
          <Route index element={<HomePage />} />
          <Route
            path="profile/:userId"
            element={<ProfilePage mainUser={mainUser} getMainUserAgain={setGetMainUserAgain} />} />
          <Route path="advertisements" element={<AdvertisementsPage mainUser={mainUser} />} />
          <Route path="chats" element={<ChatsPage />} />
        </Route>
      </Routes>
    )
  );
}

export default App;
