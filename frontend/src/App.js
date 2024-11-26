import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage'; // Página principal
import ProfilePage from './pages/ProfilePage';
import AdvertisementsPage from './pages/AdvertisementsPage';
import ChatsPage from './pages/ChatsPage';
import Layout from './Layout';
import { getMainUser } from './services/userService';

function App() {
  const [mainUser, setMainUser] = useState([]);
  const [getMainUserAgain, setGetMainUserAgain] = useState(false);

  // Se ejecuta solo al montar el componente
  useEffect(() => {
    fetchMainUser();
  }, []);

  // Se ejecuta cuando el estado getMainUserAgain cambia a true
  useEffect(() => {
    if (getMainUserAgain) {
      fetchMainUser();
      setGetMainUserAgain(false);  // Reseteamos el estado para evitar bucles
    }
  }, [getMainUserAgain]);

  const fetchMainUser = async () => {
    try {
      const user = await getMainUser();  // Suponiendo que esta función está definida correctamente
      console.log('USER WOW', user)
      setMainUser(user);  // Actualizamos el estado con los nuevos datos
    } catch (error) {
      console.error('Error fetching main user:', error);
    }
  };

  useEffect(() => {    
    console.log('mainUser ha cambiat', mainUser)
  }, [mainUser]);

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
