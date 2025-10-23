import {
  Button,
  Dialog,
  DialogTitle,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { SampleUsers } from "../constants/sampleData";
import UserItem from "../shared/UserItem";
import {
  useAddGroupMembersMutation,
  useAvailableFriendsQuery,
} from "../../redux/api/api";
import { useAsyncMutation, useErrors } from "../../hooks/hook";
import { useDispatch, useSelector } from "react-redux";
import { setIsAddMember } from "../../redux/reducers/misc";

const AddMemberDialog = ({ chatId }) => {
  const dispatch = useDispatch();
  const { isAddMember } = useSelector((state) => state.misc);

  const [addMembers, isLoadingAddMembers] = useAsyncMutation(
    useAddGroupMembersMutation
  );
  const { isLoading, data, isError, error } = useAvailableFriendsQuery(chatId);

  const [selectedMembers, setSelectedMembers] = useState([]);

  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currElement) => currElement !== id)
        : [...prev, id]
    );
  };

  const closeHandler = () => {
    dispatch(setIsAddMember(false));
  };

  const addMemberSubmitHandler = () => {
    addMembers("Adding Members...", { members: selectedMembers, chatId });
    closeHandler();
  };

  useErrors([{ isError, error }]);

  return (
    <Dialog open={isAddMember} onClose={closeHandler}>
      <Stack
        p={{ xs: "1rem", sm: "2rem" }}
        width={{ xs: "100%", sm: "24rem", md: "26rem" }}
        maxWidth="100%"
        spacing={"1.5rem"}
      >
        <DialogTitle textAlign="center" variant="h4">
          Add Member
        </DialogTitle>

        <Stack spacing={1}>
          {isLoading ? (
            <Skeleton />
          ) : data?.friends?.length > 0 ? (
            data?.friends?.map((i) => (
              <Paper
                key={i._id}
                elevation={2}
                sx={{
                  border: "1px solid rgba(0,0,0,0.1)",
                  borderRadius: "8px",
                  p: { xs: 1.5, sm: 2 },
                  transition: "box-shadow 0.2s ease",
                  "&:hover": {
                    boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
                  },
                }}
              >
                <UserItem
                  user={i}
                  handler={selectMemberHandler}
                  isAdded={selectedMembers.includes(i._id)}
                />
              </Paper>
            ))
          ) : (
            <Typography textAlign="center" color="text.secondary">
              No Friends
            </Typography>
          )}
        </Stack>

        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-evenly"}
        >
          <Button color="error" onClick={closeHandler}>
            Cancel
          </Button>
          <Button
            onClick={addMemberSubmitHandler}
            variant="contained"
            disabled={isLoadingAddMembers}
          >
            Submit Changes
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default AddMemberDialog;
