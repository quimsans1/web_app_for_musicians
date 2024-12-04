import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { List, ListItem, Avatar, Box, Typography } from '@mui/material';
import ChatRoom from '../components/ChatRoom';
import { getUsers, getUserById } from '../services/userService';

const ChatsPage = () => {
  const location = useLocation();
  const [selectedChatId, setSelectedChatId] = useState(location.state?.selectedChatId || null);
  const [chats, setChats] = useState([]);
  const [tempUser, setTempUser] = useState(null);

  // Validate and clean localStorage
  const validateAndClearStorage = async () => {
    const validUserIds = (await getUsers()).map(user => user.id);
    const storageKeys = Object.keys(localStorage);

    storageKeys.forEach(key => {
      if (key.startsWith("chat_messages_")) {
        const userId = key.replace("chat_messages_", "");

        if (!validUserIds.includes(userId)) {
          localStorage.removeItem(key);
        }
      }
    });
  };

  useEffect(() => {
    validateAndClearStorage();

    // Load users with messages in LocalStorage
    const loadUsersWithMessages = async () => {
      const storageKeys = Object.keys(localStorage);
      const userIdsWithMessages = storageKeys
        .filter(key => key.startsWith('chat_messages_'))
        .map(key => key.replace('chat_messages_', ''));

      const usersWithMessages = await Promise.all(
        userIdsWithMessages.map(id => getUserById(id).catch(() => null))
      );

      setChats(usersWithMessages.filter(user => user !== null));
    };

    loadUsersWithMessages();
  }, []);

  useEffect(() => {
    const selectedId = location.state?.selectedChatId;

    if (selectedId && !chats.some(chat => chat.id === selectedId)) {
      getUserById(selectedId)
        .then(user => setTempUser(user))
        .catch(error => console.error("Error al obtener usuario:", error));
    }
  }, [location.state?.selectedChatId, chats]);

  // Only add tempUser if it's not in chats, and then clean tempUser
  useEffect(() => {
    if (tempUser && !chats.some(chat => chat.id === tempUser.id)) {
      setChats(prevChats => [...prevChats, tempUser]);
    }
    setTempUser(null);
  }, [tempUser, chats]);

  const handleChatSelect = (chatId) => {
    setSelectedChatId(chatId);
  };

  return (
    <Box display="flex" height="calc(100vh - 112px)" overflow="hidden">
      <Box flex="1" maxWidth="300px" borderRight="1px solid #ddd">

        {/* USERS (On the left)*/}
        <Box
          sx={{
            height: '100%',
            overflowY: 'auto',
            minWidth: '300px',
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#888',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              backgroundColor: '#555',
            },
          }}
        >
          <List>
            {chats.map((chat) => (
              <ListItem
                button
                key={chat.id}
                onClick={() => handleChatSelect(chat.id)}
                selected={selectedChatId === chat.id}
                sx={{
                  backgroundColor: selectedChatId === chat.id ? '#1e88e5' : 'transparent',
                  color: selectedChatId === chat.id ? 'white' : 'inherit',
                  '&:hover': {
                    backgroundColor: selectedChatId === chat.id ? '#1976D2' : '#e0e0e0',
                    color: selectedChatId === chat.id ? 'white' : 'inherit',
                  },
                }}
              >
                <Avatar src={chat.profilePicture} />
                <Box ml={2}>
                  <Typography variant="body1">{chat.nickname}</Typography>
                </Box>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>

      {/* CHAT ROOM (On the right)*/}
      <Box flex="3" display="flex" flexDirection="column" height="100%">
        <Box flex="1" p={2} display="flex" flexDirection="column" overflow="hidden">
          {selectedChatId ? (
            <ChatRoom roomId={selectedChatId} />
          ) : (
            <Box textAlign="center" sx={{ marginTop: '30vh' }}>
              <img src="/LogoMusyncGray.svg" alt="Logo" style={{ width: '150px', height: 'auto', marginBottom: '20px' }} />
              <Typography variant="h6" color="textSecondary">
                No chat is selected. Please choose a conversation.
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ChatsPage;
