import { Typography } from "@mui/material";
import React, { memo } from "react";

const MessageComponent = ({ message, user }) => {
  const { sender, content, attachments = [], createdAt } = message;
  const sameSender = sender?._id === user?._id;
  return (
    <div
      style={{
        alignSelf: sameSender ? "flex-end" : "flex-start",
        backgroundColor: "white",
        color: "black",
        borderRadius: "5px",
        width: "fit-content",
      }}
    >
      {!sameSender && <Typography>{sender?.name}</Typography>}
    </div>
  );
};

export default memo(MessageComponent);
