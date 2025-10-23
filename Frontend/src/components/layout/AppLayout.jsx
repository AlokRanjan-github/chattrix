import { Box, Drawer, Grid, Skeleton, Typography } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  NEW_MESSAGE_ALERT,
  NEW_REQUEST,
  ONLINE_USERS,
  REFETCH_CHATS,
} from "../../components/constants/events";
import { useErrors, useSocketEvents } from "../../hooks/hook";
import { getOrSaveFromStorage } from "../../lib/features";
import { useMyChatsQuery } from "../../redux/api/api";
import {
  incrementNotification,
  setNewMessagesAlert,
} from "../../redux/reducers/chat";
import {
  setIsDeleteMenu,
  setIsMobile,
  setSelectedDeleteChat,
} from "../../redux/reducers/misc";
import { getSocket } from "../../socket";
import DeleteChatMenu from "../dialogs/DeleteChatMenu";
import ErrorBoundary from "../shared/ErrorBoundary";
import Title from "../shared/Title";
import ChatList from "../specific/ChatList";
import Profile from "../specific/Profile";
import Header from "./Header";

const AppLayout = (WrappedComponent) => {
  return (props) => {
    const { isMobile } = useSelector((state) => state.misc);
    const { user } = useSelector((state) => state.auth);
    const { newMessagesAlert } = useSelector((state) => state.chat);

    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const chatId = params.chatId;
    const deleteMenuAnchor = useRef(null);
    const [onlineUsers, setOnlineUsers] = useState([]);

    const socket = getSocket();

    const { isLoading, data, isError, error, refetch } = useMyChatsQuery("");

    const handleMobileClose = () => dispatch(setIsMobile(false));

    useEffect(() => {
      getOrSaveFromStorage({ key: NEW_MESSAGE_ALERT, value: newMessagesAlert });
    }, [newMessagesAlert]);

    const handleDeleteChat = (e, chatId, groupChat) => {
      dispatch(setIsDeleteMenu(true));
      dispatch(setSelectedDeleteChat({ chatId, groupChat }));
      deleteMenuAnchor.current = e.currentTarget;
    };

    const newMessageAlertListener = useCallback(
      (data) => {
        if (data.chatId === chatId) return;
        dispatch(setNewMessagesAlert(data));
      },
      [chatId, dispatch]
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
    useErrors([{ isError, error }]);

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
        <DeleteChatMenu
          dispatch={dispatch}
          deleteMenuAnchor={deleteMenuAnchor}
        />

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
              onlineUsers={onlineUsers}
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
              {/* <ErrorBoundary
                fallback={<Typography>Chat list failed to load.</Typography>}
              > */}
              {isLoading ? (
                <Skeleton />
              ) : (
                <ChatList
                  chats={data?.chats || []}
                  chatId={chatId}
                  handleDeleteChat={handleDeleteChat}
                  newMessagesAlert={newMessagesAlert}
                  onlineUsers={onlineUsers}
                />
              )}
              {/* </ErrorBoundary> */}
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
