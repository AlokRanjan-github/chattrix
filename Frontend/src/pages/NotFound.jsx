import React from "react";
import { Box, Typography, Button } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        background:
          "linear-gradient(135deg, #f58529, #dd2a7b, #8134af, #515bd4)", // Instagram gradient
        color: "white",
        overflow: "hidden",
        px: 2,
      }}
    >
      {/* Floating icon with subtle bounce */}
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <ErrorOutlineIcon sx={{ fontSize: "6rem", color: "#fff", mb: 2 }} />
      </motion.div>

      {/* 404 text with fade-in + scale */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Typography
          variant="h2"
          fontWeight="bold"
          gutterBottom
          sx={{ letterSpacing: 2 }}
        >
          404
        </Typography>
      </motion.div>

      {/* Subtext with fade-up */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.9 }}
      >
        <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
          Oops! The page you’re looking for doesn’t exist or was moved.
        </Typography>
      </motion.div>

      {/* Animated button */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Button
          variant="contained"
          sx={{
            px: 4,
            py: 1.2,
            fontSize: "1rem",
            borderRadius: "10px",
            border: "1px solid black",
            backgroundColor: "#5404afff",
            "&:hover": { backgroundColor: "#e85a50" },
            boxShadow: "0px 6px 25px rgba(255, 111, 97, 0.4)",
          }}
          onClick={() => navigate("/", { replace: true })}
        >
          Back to Home
        </Button>
      </motion.div>
    </Box>
  );
};

export default NotFoundPage;
