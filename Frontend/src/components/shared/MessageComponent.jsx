import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import moment from "moment";
import { memo } from "react";
import { fileFormat } from "../../lib/features";
import { grayColor, lightBlue } from "../constants/color";
import RenderAttachment from "./RenderAttachment";

const MessageComponent = ({ message, user }) => {
  const { sender, content, attachments = [], createdAt } = message;
  const sameSender = sender?._id === user?._id;
  const timeAgo = moment(createdAt).fromNow();
  return (
    <motion.div
      initial={{ opacity: 0, x: "-100%" }}
      whileInView={{ opacity: 1, x: 0 }}
      style={{
        display: "flex",
        justifyContent: sameSender ? "flex-end" : "flex-start",
      }}
    >
      <div
        style={{
          backgroundColor: sameSender ? "rgba(128, 99, 233, 1)" : "white", // gray for self, white for others
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
    </motion.div>
  );
};

export default memo(MessageComponent);
