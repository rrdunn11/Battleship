import React from 'react';

const Chat = ({chat}) => (
  <div>
    <p><strong>{chat[0]}: </strong>{chat[1]}</p>
  </div>
)

export default Chat;