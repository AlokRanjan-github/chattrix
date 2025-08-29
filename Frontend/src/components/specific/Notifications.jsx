import React, { memo } from "react";
import {
  Dialog,
  DialogTitle,
  Stack,
  Typography,
  ListItem,
  Avatar,
  Button,
  Paper,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { SampleNotifications } from "../constants/sampleData";

const Notifications = () => {
  const friendRequestHandler = ({ _id, accept }) => {
    console.log("Friend Request", _id, accept);
  };

  return (
    <Dialog open>
      <Stack p={{ xs: "1rem", sm: "2rem" }} maxWidth={"25rem"}>
        <DialogTitle textAlign={"center"}>Notifications</DialogTitle>

        {SampleNotifications.length > 0 ? (
          <>
            {SampleNotifications.map((i) => (
              <NotificationsItem
                key={i._id}
                sender={i.sender}
                _id={i._id}
                handler={friendRequestHandler}
                handlerIsLoading={false} // placeholder
              />
            ))}
          </>
        ) : (
          <Typography textAlign="center">0 Notifications</Typography>
        )}
      </Stack>
    </Dialog>
  );
};

const NotificationsItem = memo(({ sender, _id, handler, handlerIsLoading }) => {
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
              <Avatar src={avatar} alt={name} />
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
