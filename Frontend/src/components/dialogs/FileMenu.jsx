import { Menu } from "@mui/material";
import React from "react";

const FileMenu = ({ anchorE1 }) => {
  return (
    <Menu anchorEl={anchorE1} open={false}>
      <div
        style={{
          width: "10rem",
        }}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. At modi quo,
        quasi quae totam quia nostrum impedit ipsa eius hic, ut assumenda.
        Praesentium.
      </div>
    </Menu>
  );
};

export default FileMenu;
