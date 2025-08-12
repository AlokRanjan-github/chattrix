import React from 'react'
import AppLayout from '../components/layout/AppLayout';

const Chat = () => {
  return (
    <div>chat</div>
  )
}

const ChatWithLayout = AppLayout(Chat); // Corrected: removed the extra ()
export default ChatWithLayout;