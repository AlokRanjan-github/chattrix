import React, { useRef } from "react";
import { IconButton, Stack } from "@mui/material";
import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import { InputBox } from "../components/Style/StyledComponent";
import { grayColor } from "../components/constants/color";
import AppLayout from "../components/layout/AppLayout";
import { orange } from "../components/constants/color";
import FileMenu from "../components/dialogs/FileMenu";
import { sampleMessage } from "../components/constants/sampleData";
import MessageComponent from "../components/shared/MessageComponent";

//testing
const user = {
  _id: "wowsameId",
  name: "Alok",
};

const Chat = () => {
  const containerRef = useRef(null);

  return (
    <>
      <Stack
        ref={containerRef}
        boxSizing="border-box"
        padding="1rem"
        spacing="0.3rem"
        bgcolor={grayColor}
        height="90%"
        sx={{
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
        {sampleMessage.map((i,index) => (
          <MessageComponent key={i._id+index} message={i} user={user} />
        ))}
      </Stack>

      <form
        style={{
          height: "10%",
        }}
      >
        <Stack
          direction="row"
          height={"100%"}
          padding={"1rem"}
          alignItems="center"
          position={"relative"}
          spacing={1}
        >
          <IconButton
            sx={{
              left: "1.5rem",
              position: "absolute",
            }}
          >
            <AttachFileIcon />
          </IconButton>

          <InputBox placeholder="Type Message Here..." />

          <IconButton
            type="submit"
            sx={{
              backgroundColor: orange,
              color: "white",
              marginLeft: "1rem",
              padding: "0.5rem",
              rotate: "-25deg",
              "&:hover": {
                bgcolor: "error.dark",
              },
            }}
          >
            <SendIcon />
          </IconButton>
        </Stack>
      </form>

      <FileMenu />
    </>
  );
};

const ChatWithLayout = AppLayout(Chat);
export default ChatWithLayout;
