import {
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useInputValidation } from "6pp";
import { Search as SearchIcon } from "@mui/icons-material";
import UserItem from "../shared/UserItem";
import { SampleUsers } from "../constants/sampleData";
import { useDispatch, useSelector } from "react-redux";
import { setIsSearch } from "../../redux/reducers/misc";
import {
  useLazySearchUserQuery,
  useSendFriendRequestMutation,
} from "../../redux/api/api";
import { useAsyncMutation } from "../../hooks/hook";

const Search = () => {
  const { isSearch } = useSelector((state) => state.misc);
  const dispatch = useDispatch();
  const search = useInputValidation("");
  const [searchUser] = useLazySearchUserQuery();
  const [sendFriendRequest, isLoadingSendFriendRequest] = useAsyncMutation(
    useSendFriendRequestMutation
  );

  // let isLoadingSendFriendRequest = false;
  const [users, setUsers] = useState(SampleUsers);

  const addFriendHandler = async (id) => {
    await sendFriendRequest("Sending friend request...", { userId: id });
  };

  const searchCloseHandler = () => dispatch(setIsSearch(false));
  useEffect(() => {
    const timeOutId = setTimeout(() => {
      searchUser(search.value)
        .then(({ data }) => setUsers(data.users))
        .catch((e) => console.log(e));
    }, 1000);

    return () => {
      clearTimeout(timeOutId);
    };
  }, [search.value]);

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
