import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { Box, TextField, Button, List, ListItem, Typography, Paper } from '@mui/material';

const socket = io(process.env.REACT_APP_API_URL); // Conectar al servidor

const ChatRoom = ({ roomId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null); // Referència per al desplaçament

  useEffect(() => {
    // Recuperar mensajes del localStorage cuando el componente se carga
    const storedMessages = JSON.parse(localStorage.getItem(`chat_messages_${roomId}`)) || [];
    setMessages(storedMessages);

    return;
  }, [roomId]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const messageToSend = { roomId, text: newMessage, isSender: true };

      // Update localStorage
      setMessages((prev) => {
        const updatedMessages = [...prev, messageToSend];
        localStorage.setItem(`chat_messages_${roomId}`, JSON.stringify(updatedMessages));
        return updatedMessages;
      });
      setNewMessage(''); // Clean text field

      // Scroll down after message is send
      scrollToBottom();
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Box display="flex" flexDirection="column" height="100%">
      <Box display="flex" flexDirection="row" flexGrow={1}>
        <Box flexGrow={1} display="flex" flexDirection="column">

          {/* CHAT ROOM */}
          <Paper elevation={3} style={{ height: '100%', overflowY: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ overflowY: 'auto', flexGrow: 1, padding: 2, maxHeight: 'calc(100vh - 200px)' }}>
              <List>
                {messages.map((msg, index) => (
                  <ListItem key={index} sx={{ justifyContent: msg.isSender ? 'flex-end' : 'flex-start' }}>
                    <Box
                      sx={{
                        maxWidth: '80%',
                        padding: 1,
                        borderRadius: '10px',
                        backgroundColor: msg.isSender ? '#90caf9' : '#ffffff',
                        boxShadow: 1,
                      }}
                    >
                      <Typography variant="body1" color={msg.isSender ? 'black' : 'textSecondary'}>
                        {msg.text}
                      </Typography>
                    </Box>
                  </ListItem>
                ))}
                <div ref={messagesEndRef} /> {/* Referència per al desplaçament */}
              </List>
            </Box>
          </Paper>

          {/* TEXT FIELD & SEND BUTTON */}
          <Box display="flex" marginTop={2}>
            <TextField
              fullWidth
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && newMessage.trim()) {
                  sendMessage();
                }
              }}
              placeholder="Write a message..."
              variant="outlined"
              size="small"
            />
            <Button
              onClick={sendMessage}
              variant={newMessage.trim() ? 'contained' : 'outlined'}
              color="primary"
              sx={{ marginLeft: 1 }}
              disabled={!newMessage.trim()} 
            >
              Send
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatRoom;
