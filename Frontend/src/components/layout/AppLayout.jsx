import React from "react";
import Header from "./Header";
import Title from "../shared/Title";
import { Grid, Box, Typography, Skeleton, Drawer } from "@mui/material";
import ChatList from "../specific/ChatList";
import { SampleChats } from "../constants/sampleData";
import { useParams } from "react-router-dom";
import ErrorBoundary from "../shared/ErrorBoundary";
import Profile from "../specific/Profile";
import { useMyChatsQuery } from "../../redux/api/api";
import { useDispatch, useSelector } from "react-redux";
import { setIsMobile } from "../../redux/reducers/misc";
import { useErrors } from "../../hooks/hook";

const AppLayout = (WrappedComponent) => {
  return (props) => {
    const params = useParams();
    const dispatch = useDispatch();
    const chatId = params.chatId;

    const { isMobile } = useSelector((state) => state.misc);

    const { isLoading, data, isError, error, refetch } = useMyChatsQuery("");

    useErrors([{ isError, error }]);

    const handleDeleteChat = (e, _id, groupChat) => {
      e.preventDefault();
      console.log("Delete Chattu ", _id, groupChat);
    };

    const handleMobileClose = () => dispatch(setIsMobile(false));

    // Default component if WrappedComponent is missing
    const ComponentToRender =
      WrappedComponent ||
      (() => (
        <Typography variant="h6" color="text.secondary">
          Missing Home component
        </Typography>
      ));

    return (
      <>
        <Title title="Chattrix" />
        <Header />

        {isLoading ? (
          <Skeleton />
        ) : (
          <Drawer open={isMobile} onClose={handleMobileClose}>
            <ChatList
              w="70vw"
              chats={data?.chats}
              chatId={chatId}
              handleDeleteChat={handleDeleteChat}
              // newMessagesAlert={newMessagesAlert}
              // onlineUsers={onlineUsers}
            />
          </Drawer>
        )}

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
              }}
            >
              <ErrorBoundary
                fallback={<Typography>Chat list failed to load.</Typography>}
              >
                {isLoading ? (
                  <Skeleton />
                ) : (
                  <ChatList
                    chats={data?.chats}
                    chatId={chatId}
                    handleDeleteChat={handleDeleteChat}
                  />
                )}
              </ErrorBoundary>
            </Box>
          </Grid>

          <Grid
            size={{ xs: 12, sm: 8, md: 6, lg: 5 }}
            sx={{
              height: "100%",
              bgcolor: "#d1d1d1ff",
            }}
          >
            <ErrorBoundary
              fallback={<Typography>Main content failed to load.</Typography>}
            >
              <ComponentToRender {...(props || {})} />
            </ErrorBoundary>
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
              <Profile />
            </Box>
          </Grid>
        </Grid>
      </>
    );
  };
};

export default AppLayout;
