import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useDrawerContext } from "../contexts/DrawerContext";
import IconButton from "@mui/material/IconButton";
import ThemeToggleButton from "./ThemeToggleButton";

export default function Navbar() {
  const { isDrawerOpen, toggleDrawer } = useDrawerContext();
  return (
    <>
<AppBar 
        position="fixed" 
        sx={{ top: 0, left: 0, zIndex: 1201, backgroundColor: "#727370", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)" }}
      >
        <Toolbar className="flex justify-between items-center px-4">
          {/* Drawer Toggle Button */}
          <IconButton onClick={() => toggleDrawer(true)}>
            {isDrawerOpen ? 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-white">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>          
:
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="text-white size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
              />
            </svg>
            }
          </IconButton>

          {/* Navbar Title */}
          <Typography variant="h6" component="div" className="text-white font-bold tracking-wide">
            News
          </Typography>

          {/* Login Button */}
  <ThemeToggleButton />
        </Toolbar>
      </AppBar>

    </>
  );
}
