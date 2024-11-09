import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { Box, TextField, Button, List, ListItem, Typography, Paper } from '@mui/material';

const socket = io('http://localhost:5000'); // Conectar al servidor

const ChatRoom = ({ roomId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null); // Referència per al desplaçament

  useEffect(() => {
    // Recuperar mensajes del localStorage cuando el componente se carga
    const storedMessages = JSON.parse(localStorage.getItem(`chat_messages_${roomId}`)) || [];
    setMessages(storedMessages);

    // Unirse a la sala cuando el componente se monta
    socket.emit('joinRoom', roomId);

    // Función para manejar la recepción de mensajes
    const handleMessage = (message) => {
      // Agregar solo si no es un mensaje enviado por el usuario
      if (!message.isSender) {
        setMessages((prev) => {
          const updatedMessages = [...prev, { ...message, isSender: false }];
          localStorage.setItem(`chat_messages_${roomId}`, JSON.stringify(updatedMessages)); // Actualizar localStorage
          return updatedMessages;
        });
      }
    };

    // Suscripción al evento de mensaje
    socket.on('message', handleMessage);

    // Limpieza al desmontar
    return () => {
      socket.emit('leaveRoom', roomId);
      socket.off('message', handleMessage);
    };
  }, [roomId]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const messageToSend = { roomId, text: newMessage, isSender: true };
      // Enviar el mensaje al servidor
      socket.emit('sendMessage', messageToSend);

      // Actualizar localStorage y estado localmente
      setMessages((prev) => {
        const updatedMessages = [...prev, messageToSend]; // Añadir como mensaje enviado
        localStorage.setItem(`chat_messages_${roomId}`, JSON.stringify(updatedMessages)); // Actualizar localStorage
        return updatedMessages; // Agregar inmediatamente a la lista de mensajes
      });
      setNewMessage(''); // Limpiar el campo de texto

      // Desplazar-se cap avall després de l'enviament del missatge
      scrollToBottom();
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Box display="flex" flexDirection="column" height="100%">
      <Box display="flex" flexDirection="row" flexGrow={1}>
        {/* Secció dels usuaris (a l'esquerra) */}

        {/* Secció dels missatges (a la dreta) */}
        <Box flexGrow={1} display="flex" flexDirection="column">
          {/* Paper per encapsular la secció dels missatges */}
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
                        backgroundColor: msg.isSender ? '#dcf8c6' : '#ffffff',
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
          {/* Barra d'entrada de missatges */}
          <Box display="flex" marginTop={2}>
            <TextField
              fullWidth
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Write a message..."
              variant="outlined"
              size="small"
            />
            <Button onClick={sendMessage} variant="contained" color="primary" sx={{ marginLeft: 1 }}>
              Send
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatRoom;
