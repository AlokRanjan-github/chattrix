import { Box, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { memo } from "react";
import { Link } from "../Style/StyledComponent";
import AvatarCard from "./AvatarCard";

const ChatItem = ({
  avatar = [],
  name,
  _id,
  groupChat = false,
  sameSender,
  isOnline,
  newMessageAlert,
  index = 0,
  handleDeleteChat,
}) => {
  return (
    <Link
      to={`/chat/${_id}`}
      onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}
      sx={{ padding: "0" }}
    >
      <motion.div
        initial={{ opacity: 0, y: "-30px" }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 * index, duration: 0.2 }}
        style={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          backgroundColor: sameSender ? "black" : "unset",
          color: sameSender ? "white" : "unset",
          position: "relative",
          padding: "1rem",
        }}
      >
        {/* Left Side: Avatar + Text */}
        <div style={{ display: "flex", gap: "1rem", alignItems: "center", flex: 1 }}>
          <AvatarCard avatar={avatar} />

          <Stack>
            <Typography>{name}</Typography>
            {newMessageAlert && (
              <Typography>{newMessageAlert.count} New Message</Typography>
            )}
          </Stack>
        </div>

        {/* Right Side: Online Status */}
        {isOnline && (
          <Box
            sx={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: "green",
            }}
          />
        )}
      </motion.div>
    </Link>
  );
};

export default memo(ChatItem); 
