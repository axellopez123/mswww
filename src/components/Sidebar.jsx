import React from 'react';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

import { useDrawerContext } from '../contexts/DrawerContext';

export default function Sidebar() {
  const { isDrawerOpen, toggleDrawer } = useDrawerContext();

  const DrawerList = (
    <Box
      sx={{ width: 250, paddingTop: '64px', height:'100%' }}
      role="presentation"
      onClick={() => toggleDrawer(false)}
      className="bg-gray-900 text-gray-300"
    >
      {/* Sidebar Header */}
      <Box className="p-4 border-b border-gray-700">
        <Typography variant="h6" className="text-white font-bold">
          Dashboard
        </Typography>
      </Box>

      {/* List of Items */}
      <List className="pt-2">
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton className="hover:bg-gray-200 transition duration-300">
              <ListItemIcon className="text-gray-400">
                {index % 2 === 0 ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
                    />
                  </svg>
                )}
              </ListItemIcon>
              <ListItemText primary={text} className="text-gray-300" />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Drawer
      open={isDrawerOpen}
      onClose={() => toggleDrawer(false)}
      PaperProps={{ sx: { backgroundColor: '#1A202C'} }}
    >
      {DrawerList}
    </Drawer>
  );
}