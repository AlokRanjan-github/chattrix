import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  Paper,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { SampleUsers } from "../constants/sampleData";
import UserItem from "../shared/UserItem";
import { useInputValidation } from "6pp";
import { useDispatch, useSelector } from "react-redux";
import {
  useAvailableFriendsQuery,
  useNewGroupMutation,
} from "../../redux/api/api";
import { useAsyncMutation, useErrors } from "../../hooks/hook";
import { setIsNewGroup } from "../../redux/reducers/misc";
import toast from "react-hot-toast";


const NewGroups = () => {

  const dispatch = useDispatch();
  const [selectedMembers, setselectedMembers] = useState([]);
  const { isNewGroup } = useSelector((state) => state.misc);
  const { isError, isLoading, error, data } = useAvailableFriendsQuery();
  const [newGroup, isLoadingNewGroup] = useAsyncMutation(useNewGroupMutation);

  const groupName = useInputValidation("");


  const selectMemberHandler = (id) => {
    setselectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currElement) => currElement !== id)
        : [...prev, id]
    );
  };
  // console.log(selectedMembers);

  const submitHandler = () => {
    if (!groupName.value) return toast.error("Group name is required");

    if (selectedMembers.length < 2)
      return toast.error("Please Select Atleast 3 Members");

    newGroup("Creating New Group...", {
      name: groupName.value,
      members: selectedMembers,
    });

    closeHandler();
  };

  const closeHandler = () => {
    dispatch(setIsNewGroup(false));
  };
  const errors = [
    {
      isError,
      error,
    },
  ];
  useErrors(errors);

  return (
    <Dialog open={isNewGroup} onClose={closeHandler}>
      <Stack
        p={{ xs: "1rem", sm: "2rem" }}
        width={{ xs: "24rem", sm: "26rem" }}
        maxWidth="100%"
        spacing={"1rem"}
      >
        <DialogTitle textAlign={"center"} variant="h4">
          New Group
        </DialogTitle>

        <TextField
          label="Group Name"
          value={groupName.value}
          onChange={groupName.changeHandler}
        />

        <Typography variant={"body2"} marginTop={"1rem"}>
          Members
        </Typography>

        <Stack spacing={1}>
          {isLoading ? (
            <Skeleton />
          ) : (
            data?.friends?.map((user) => (
              <Paper
                key={user._id}
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
                  user={user}
                  handler={selectMemberHandler}
                  isAdded={selectedMembers.includes(user._id)}
                />
              </Paper>
            ))
          )}
        </Stack>

        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={"2rem"}
        >
          <Button variant="text" color="error" onClick={closeHandler}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={submitHandler}
            disabled={isLoadingNewGroup}
          >
            Create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroups;
