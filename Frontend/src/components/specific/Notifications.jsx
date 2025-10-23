import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  ListItem,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAsyncMutation, useErrors } from "../../hooks/hook";
import { transformImage } from "../../lib/features";
import {
  useAcceptFriendRequestMutation,
  useGetNotificationsQuery,
} from "../../redux/api/api";
import { setIsNotification } from "../../redux/reducers/misc";

const Notifications = () => {
  const { isNotification } = useSelector((state) => state.misc);

  const dispatch = useDispatch();

  const { isLoading, data, error, isError } = useGetNotificationsQuery();

  const [acceptRequest] = useAsyncMutation(useAcceptFriendRequestMutation);

  const friendRequestHandler = async ({ _id, accept }) => {
    dispatch(setIsNotification(false));
    await acceptRequest("Accepting...", { requestId: _id, accept });
  };

  const closeHandler = () => dispatch(setIsNotification(false));

  useErrors([{ error, isError }]);

  return (
    <Dialog open={isNotification} onClose={closeHandler}>
      <Stack p={{ xs: "1rem", sm: "2rem" }} maxWidth={"25rem"}>
        <DialogTitle textAlign={"center"}>Notifications</DialogTitle>

        {isLoading ? (
          <Skeleton />
        ) : (
          <>
            {data?.allRequests.length > 0 ? (
              <>
                {data?.allRequests.map((i) => (
                  <NotificationsItem
                    key={i._id}
                    sender={i.sender}
                    _id={i._id}
                    handler={friendRequestHandler}
                    handlerIsLoading={false}
                  />
                ))}
              </>
            ) : (
              <Typography textAlign="center">0 Notifications</Typography>
            )}
          </>
        )}
      </Stack>
    </Dialog>
  );
};

const NotificationsItem = memo(({ sender, _id, handler }) => {
  const { name, avatar } = sender;

  return (
    <>
      <Paper
        elevation={2}
        sx={{
          border: "1px solid rgba(0,0,0,0.1)",
          borderRadius: "8px",
          p: "1rem",
          mb: "1rem",
        }}
      >
        <ListItem disableGutters>
          <Stack width="100%" spacing={1}>
            <Stack
              direction="row"
              alignItems="center"
              spacing="1rem"
              width="100%"
            >
              <Avatar src={transformImage(avatar)} alt={name} />
              <Typography
                variant="body1"
                sx={{
                  flexGrow: 1,
                  whiteSpace: "normal",
                  overflowWrap: "break-word",
                }}
              >
                {`${name} sent you a friend request.`}
              </Typography>
            </Stack>

            <Stack
              display={"flex"}
              direction={"row"}
              justifyContent={"flex-end"}
              spacing={1}
            >
              <Button onClick={() => handler({ _id, accept: true })}>
                Accept
              </Button>
              <Button
                color="error"
                onClick={() => handler({ _id, accept: false })}
              >
                Reject
              </Button>
            </Stack>
          </Stack>
        </ListItem>
      </Paper>
    </>
  );
});

export default Notifications;
