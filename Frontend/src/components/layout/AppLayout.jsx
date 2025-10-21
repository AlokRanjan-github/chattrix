import React, { useCallback, useEffect } from "react";
import Header from "./Header";
import Title from "../shared/Title";
import { Grid, Box, Typography, Skeleton, Drawer } from "@mui/material";
import ChatList from "../specific/ChatList";
import { SampleChats } from "../constants/sampleData";
import { useNavigate, useParams } from "react-router-dom";
import ErrorBoundary from "../shared/ErrorBoundary";
import Profile from "../specific/Profile";
import { useMyChatsQuery } from "../../redux/api/api";
import { useDispatch, useSelector } from "react-redux";
import { setIsMobile } from "../../redux/reducers/misc";
import { useErrors, useSocketEvents } from "../../hooks/hook";
import { getSocket } from "../../socket";
import {
  NEW_MESSAGE_ALERT,
  NEW_REQUEST,
  ONLINE_USERS,
  REFETCH_CHATS,
} from "../../components/constants/events";
import { incrementNotification, setNewMessagesAlert } from "../../redux/reducers/chat";
import { getOrSaveFromStorage } from "../../lib/features";

const AppLayout = (WrappedComponent) => {
  return (props) => {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const chatId = params.chatId;

    const socket = getSocket();

    const { isMobile } = useSelector((state) => state.misc);
    const { user } = useSelector((state) => state.auth);
        const { newMessagesAlert } = useSelector((state) => state.chat);

    const { isLoading, data, isError, error, refetch } = useMyChatsQuery("");

    useErrors([{ isError, error }]);

        useEffect(() => {
      getOrSaveFromStorage({ key: NEW_MESSAGE_ALERT, value: newMessagesAlert });
    }, [newMessagesAlert]);

    const handleDeleteChat = (e, _id, groupChat) => {
      e.preventDefault();
      console.log("Delete Chattu ", _id, groupChat);
    };

    const handleMobileClose = () => dispatch(setIsMobile(false));

    const newMessageAlertListener = useCallback(
      (data) => {
        if (data.chatId === chatId) return;
        dispatch(setNewMessagesAlert(data));
      },
      [chatId]
    );

    const newRequestListener = useCallback(() => {
      dispatch(incrementNotification());
    }, [dispatch]);

    const refetchListener = useCallback(() => {
      refetch();
      navigate("/");
    }, [refetch, navigate]);

    const onlineUsersListener = useCallback((data) => {
      setOnlineUsers(data);
    }, []);

    const eventHandlers = {
      [NEW_MESSAGE_ALERT]: newMessageAlertListener,
      [NEW_REQUEST]: newRequestListener,
      [REFETCH_CHATS]: refetchListener,
      [ONLINE_USERS]: onlineUsersListener,
    };

    useSocketEvents(socket, eventHandlers);

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
              newMessagesAlert={newMessagesAlert}
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
                    newMessagesAlert={newMessagesAlert}
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
              <ComponentToRender
                {...(props || {})}
                chatId={chatId}
                user={user}
              />
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
              <Profile user={user} />
            </Box>
          </Grid>
        </Grid>
      </>
    );
  };
};

export default AppLayout;
