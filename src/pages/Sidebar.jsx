import React from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Box, IconButton, Typography } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState } from "react";

const Sidebar = () => {
  const [open, setOpen] = useState(true);

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? 240 : 60,
        flexShrink: 0,
        "& .MuiDrawer-paper": { width: open ? 240 : 60, transition: "0.3s ease-in-out" },
      }}
    >
      <Box sx={{ display: "flex", justifyContent: open ? "space-between" : "center", p: 2 }}>
        {open && <Typography sx={{ color: "#6A5ACD", fontWeight: "bold" ,fontSize: "1.2rem"}}>BIT SURVEY</Typography>}
        <IconButton onClick={() => setOpen(!open)}>
          <MenuIcon />
        </IconButton>
      </Box>
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          {open && <ListItemText primary="Dashboard" />}
        </ListItem>
      </List>
      <Box sx={{ position: "absolute", bottom: 0, width: "100%" }}>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            {open && <ListItemText primary="Log out" />}
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;

