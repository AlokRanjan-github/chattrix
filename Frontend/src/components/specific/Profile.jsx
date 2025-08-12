import { Avatar, Icon, Stack, Typography } from "@mui/material";
import React from "react";
import {
  Face as FaceIcon,
  AlternateEmail as UserNameIcon,
  CalendarMonth as CalendarIcon,
} from "@mui/icons-material";
import moment from "moment";
const Profile = () => {
  return (
    <Stack direction="column" spacing={"2rem"} alignItems={"center"}>
      <Avatar
        sx={{
          width: 200,
          height: 200,
          objectFit: "contain",
          marginBottom: "1rem",
          border: "5px solid white",
        }}
      />
      <ProfileCard
        text={"This is my profile and stay away from my profile"}
        heading={"Bio"}
      />
      <ProfileCard
        text={"@alokrprajapati"}
        heading={"Username"}
        Icon={<UserNameIcon />}
      />
      <ProfileCard
        text={"Alok Ranjan Prajapati"}
        heading={"Name"}
        Icon={<FaceIcon />}
      />
      <ProfileCard
        text={moment("2025-08-12T12:23:49.743Z").fromNow()}
        heading={"Joined"}
        Icon={<CalendarIcon />}
      />
    </Stack>
  );
};

const ProfileCard = ({ text, icon, heading }) => (
  <Stack
    direction={"row"}
    spacing={"1rem"}
    alignItems={"center"}
    color={"white"}
    textAlign={"center"}
  >
    {/* {Icon} */}
    <Stack>
      <Typography variant="body1">{text}</Typography>
      <Typography variant="caption" color={"gray"}>
        {heading}
      </Typography>
    </Stack>
  </Stack>
);

export default Profile;
