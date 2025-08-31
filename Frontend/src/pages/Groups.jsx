import {
  KeyboardBackspace as KeyboardBackspaceIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { Box, Drawer, Grid, IconButton, Tooltip } from "@mui/material";
import React, { useState } from "react";
import { matBlack } from "../components/constants/color";
import { useNavigate } from "react-router-dom";
const Groups = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const handleMobileClose = () => setIsMobileMenuOpen(false);

  const navigateBack = () => {
    navigate("/");
  };
  const handleMobile = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };
  const IconBtns = (
    <>
      <Box
        sx={{
          display: { xs: "block", sm: "none" },
          position: "fixed",
          right: "1rem",
          top: "1rem",
        }}
      >
        <IconButton onClick={handleMobile}>
          <MenuIcon />
        </IconButton>
      </Box>

      <Tooltip title="back">
        <IconButton
          sx={{
            position: "absolute",
            top: "2rem",
            left: "2rem",
            bgcolor: matBlack,
            color: "white",
            ":hover": {
              bgcolor: "rgba(0,0,0,0.7)",
            },
          }}
          onClick={navigateBack}
        >
          <KeyboardBackspaceIcon />
        </IconButton>
      </Tooltip>
    </>
  );

  return (
    <Grid container height="100vh">
      <Grid
        size={{ xs: 0, sm: 4 }}
        sx={{
          display: { xs: "none", sm: "block" },
          bgcolor: "bisque",
        }}
      >
        Group List
      </Grid>

      <Grid
        size={{ xs: 12, sm: 8 }}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          padding: "1rem 3rem",
        }}
      >
        group details
        {IconBtns}
      </Grid>
      <Drawer
        sx={{
          display: { xs: "block", sm: "none" },
        }}
        open={isMobileMenuOpen}
        onClose={handleMobileClose}
      >
        Group List from drawer!
      </Drawer>
    </Grid>
  );
};

export default Groups;
