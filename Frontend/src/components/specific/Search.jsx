import {
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useInputValidation } from "6pp";
import { Search as SearchIcon } from "@mui/icons-material";
import UserItem from "../shared/UserItem";
import { SampleUsers } from "../constants/sampleData";
import { useDispatch, useSelector } from "react-redux";
import { setIsSearch } from "../../redux/reducers/misc";

const Search = () => {
  const { isSearch } = useSelector((state) => state.misc);
  const dispatch = useDispatch();
  const search = useInputValidation("");

  let isLoadingSendFriendRequest = false;
  const [users, setUsers] = useState(SampleUsers);

  const addFriendHandler = (id) => {
    console.log("Add friend" + id);
  };

  const searchCloseHandler = () => dispatch(setIsSearch(false));

  return (
    <Dialog open={isSearch} onClose={searchCloseHandler}>
      <Stack
        p={"2rem"}
        direction={"column"}
        width={"27rem"}
        sx={{
          width: { xs: "100%", sm: "100%" },
        }}
      >
        <DialogTitle textAlign={"center"} variant="h4">
          Find People
        </DialogTitle>
        <TextField
          label="Search"
          value={search.value}
          onChange={search.changeHandler}
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <List sx={{ mt: 2, p: 0 }}>
          {users.map((user) => (
            <Paper
              key={user._id}
              elevation={2}
              sx={{
                border: "1px solid rgba(0,0,0,0.1)",
                borderRadius: "8px",
                p: { xs: 1.5, sm: 2 },
                mb: 1.5,
                transition: "box-shadow 0.2s ease",
                "&:hover": {
                  boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
                },
              }}
            >
              <UserItem
                user={user}
                handler={addFriendHandler}
                handlerIsLoading={isLoadingSendFriendRequest}
              />
            </Paper>
          ))}
        </List>
      </Stack>
    </Dialog>
  );
};

export default Search;
