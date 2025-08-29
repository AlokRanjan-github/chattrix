import { Box, Typography } from "@mui/material";
import React, { memo } from "react";
import { lightBlue } from "../constants/color";
import moment from "moment";
import { fileFormat } from "../../lib/features";
import RenderAttachment from "./RenderAttachment";

const MessageComponent = ({ message, user }) => {
  const { sender, content, attachments = [], createdAt } = message;
  console.log(attachments);
  const sameSender = sender?._id === user?._id;
  const timeAgo = moment(createdAt).fromNow();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: sameSender ? "flex-end" : "flex-start",
      }}
    >
      <div
        style={{
          backgroundColor: sameSender ? "#fc4444ff" : "white", // orange for self, white for others
          color: sameSender ? "white" : "black",
          borderRadius: "10px",
          padding: "0.5rem 1rem",
          maxWidth: "60%",
        }}
      >
        {!sameSender && (
          <Typography
            variant="caption"
            color={lightBlue}
            style={{ fontWeight: "bold", display: "block" }}
          >
            {sender?.name}
          </Typography>
        )}

        {content && <Typography variant="body2">{content}</Typography>}

        {attachments.length > 0 &&
          attachments.map((attachment, index) => {
            const url = attachment.url;
            const file = fileFormat(url);
            return (
              <Box key={index}>
                <a
                  href={url}
                  target="_black"
                  download
                  style={{
                    color: "black",
                  }}
                >
                  {RenderAttachment(file, url)}
                </a>
              </Box>
            );
          })}

        <Typography
          variant="caption"
          color={sameSender ? "rgba(233, 229, 229, 1)" : "text.secondary"}
        >
          {timeAgo}
        </Typography>
      </div>
    </div>
  );
};

export default memo(MessageComponent);
