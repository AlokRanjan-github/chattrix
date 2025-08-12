import React from "react";
import Header from "./Header";
import Title from "../shared/Title";
import { Grid, Box, Paper, Typography } from "@mui/material";
import ChatList from "../specific/ChatList";
import { SampleChats } from "../constants/sampleData";
import { useParams } from "react-router-dom";

const AppLayout = (WrappedComponent) => {
  return (props) => {
    const params = useParams();
    const chatId = params.chatId;

    const handleDeleteChat = (e, _id, groupChat) => {
      e.preventDefault();
      console.log("Delete Chattu ", _id, groupChat);
    };

    return (
      <>
        <Title title="Chat App" />
        <Header />

        <Grid container height={"calc(100vh - 4rem)"} sx={{ width: "100%" }}>
          <Grid
            size={{ sm: 4, md: 3 }}
            sx={{
              display: { xs: "none", sm: "block" },
              height: "100%",
            }}
          >
            <Box
              sx={{
                height: "100%",
                bgcolor: "#00b8d8ff",
                p: 1,
              }}
            >
              <ChatList
                chats={SampleChats}
                chatId={chatId}
                handleDeleteChat={handleDeleteChat}
              />
            </Box>
          </Grid>

          <Grid
            size={{ xs: 12, sm: 8, md: 6, lg: 5 }}
            sx={{
              height: "100%",
              bgcolor: "#c5b8b8ff",
              p: 1,
            }}
          >
            <WrappedComponent {...props} />
          </Grid>

          <Grid
            size={{ md: 3, lg: 4 }}
            sx={{
              display: { xs: "none", sm: "none", md: "block" },
              height: "100%",
            }}
          >
            <Box
              sx={{
                height: "100%",
                bgcolor: "#3b3b3bff",
                p: 1,
              }}
            >
              <Typography variant="h6">Third Column</Typography>
            </Box>
          </Grid>
        </Grid>
      </>
    );
  };
};

export default AppLayout;
