import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { SampleUsers } from "../constants/sampleData";
import UserItem from "../shared/UserItem";
import { useInputValidation } from "6pp";
const NewGroups = () => {
  const groupName = useInputValidation("");

  const [members, setMembers] = useState(SampleUsers);
  const [selectedMembers, setselectedMembers] = useState([]);

  const selectMemberHandler = (id) => {
    setselectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currElement) => currElement !== id)
        : [...prev, id]
    );
  };
  console.log(selectedMembers);

  const submitHandler = () => {
    console.log("Submit clicked");
  };

  const closeHandler = ()=>{
    console.log("On close after Redux will be implemented")
  }

  return (
    <Dialog open>
      <Stack p={{ xs: "1rem", sm: "2rem" }} width={"26rem"} spacing={"1rem"}>
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
          {members.map((user) => (
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
          ))}
        </Stack>

        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={"2rem"}
        >
          <Button variant="text" color="error">
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={submitHandler}>
            Create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroups;
