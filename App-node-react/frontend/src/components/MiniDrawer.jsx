import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../AppStore';
import { IconButton } from '@mui/material';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

export default function MiniDrawer() {
  const theme = useTheme();
  const navigate = useNavigate();
  const updateOpen = useAppStore((state) => state.updateOpen);
  const isDrawerOpen = useAppStore((state) => state.dopen);

  const handleDrawerToggle = () => {
    updateOpen(!isDrawerOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer variant="permanent" open={isDrawerOpen}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerToggle}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {['Home', 'Liste Fournisseur', 'Ajouter Fournisseur'].map((text, index) => {
            const routes = ['/', '/fournisseur', '/create','/articles','/CreateArticle'];
            return (
              <ListItem
                key={text}
                disablePadding
                sx={{ display: 'block' }}
                onClick={() => navigate(routes[index])}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: isDrawerOpen ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      justifyContent: 'center',
                      mr: isDrawerOpen ? 3 : 'auto',
                    }}
                  >
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: isDrawerOpen ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
        {/*  */}
        <List>
          {[ 'Liste Article','Ajouter Article'].map((text, index) => {
            const routes = ['/articles','/CreateArticle'];
            return (
              <ListItem
                key={text}
                disablePadding
                sx={{ display: 'block' }}
                onClick={() => navigate(routes[index])}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: isDrawerOpen ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      justifyContent: 'center',
                      mr: isDrawerOpen ? 3 : 'auto',
                    }}
                  >
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: isDrawerOpen ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
        {/*  */}
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {/* Contenu principal */}
      </Box>
    </Box>
  );
}
