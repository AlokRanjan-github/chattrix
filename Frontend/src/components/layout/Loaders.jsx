import { Box, Grid, Skeleton, Stack } from "@mui/material";
import React from "react";

export const LayoutLoader = () => {
  return (
    <>
      <Grid
        container
        height={"calc(100vh - 4rem)"}
        spacing={"1rem"}
        sx={{ width: "100%" }}
      >
        <Grid
          size={{ sm: 4, md: 3 }}
          sx={{
            display: { xs: "none", sm: "block" },
            height: "100%",
          }}
        >
          <Box
            sx={{
              height: "100%",
            }}
          >
            <Skeleton variant="rectangular" height={"100vh"} />
          </Box>
        </Grid>

        <Grid
          size={{ xs: 12, sm: 8, md: 6, lg: 5 }}
          sx={{
            height: "100%",
          }}
        >

          <Stack spacing={"1rem"}>
            {Array.from({ length: 10 }).map((_, index) => (
              <Skeleton key={index} variant="rounded" height={"5rem"} />
            ))}
          </Stack>

        </Grid> 

        <Grid
          size={{ md: 3, lg: 4 }}
          sx={{
            display: { xs: "none", sm: "none", md: "block" },
            height: "100%",
          }}
        >
          <Box
            sx={{
              height: "100%",
            }}
          >
            <Skeleton variant="rectangular" height={"100vh"} />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
