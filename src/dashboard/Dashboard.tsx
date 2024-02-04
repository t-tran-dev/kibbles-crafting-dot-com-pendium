import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { ViewList } from './ViewList';
import InventoryTable from './tables/InventoryTable';
import RecipesTable from "./tables/RecipeTable";
import {Button, ListItem} from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import UserGuide from "./Modals/UserGuide";

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
        <Link color="inherit" href="https://www.kthomebrew.com/">
            Kibbles Tasty
        </Link>{' '}
        <Link color="inherit" href="https://youtu.be/mWsoQLYZ1X8?si=-6BTuy48bID6fYIq&t=104">
            {new Date().getFullYear()}
        </Link>{' '}

      {'.'}
    </Typography>
  );
}

function Readme({viewState}: {viewState: any}) {

    return (
        <UserGuide/>

    )

}

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

function HandleState({inventory, inventoryData, craftable, projects, viewState, wishlistData, projectData, forceUpdate} : {inventory: any, inventoryData: any, craftable: any, projects: any, viewState: any, wishlistData: any, projectData: any, forceUpdate: any}) {
    if (viewState != "inventory") {
        return (
            <RecipesTable inventory={inventory} inventoryData={inventoryData} craftable={craftable} projects={projects} viewState={viewState} wishlistData={wishlistData} projectData={projectData} forceUpdate={forceUpdate}/>
        );
    }

    return (
        <InventoryTable  inventory={inventory} inventoryData={inventoryData} forceUpdate={forceUpdate}/>
    );
}

export default function Dashboard({inventory, inventoryData, craftable, projects, wishlistData, projectData, forceUpdate}:
    {inventory: any, inventoryData: any, craftable: any, projects: any, wishlistData: any, projectData: any, forceUpdate: any}) {
  const [open, setOpen] = React.useState(true);
    const [viewState, setViewState] = React.useState("items");

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Kibbles Crafting Dotcom-pendium
            </Typography>
            </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <ViewList viewState={{viewState: viewState, setViewState: setViewState}} />
            <Divider sx={{ my: 1 }} />
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
              <Typography variant="subtitle1">Reload page to fix any bugs. Seriously, reload all the time. If anything looks off or confuses you.</Typography>
            <Grid container spacing={3}>
                {/* Active Projects */}
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>

                        <HandleState inventory={inventory} inventoryData={inventoryData} craftable={craftable} projects={projects} viewState={viewState} wishlistData={wishlistData} projectData={projectData} forceUpdate={forceUpdate}/>

                    </Paper>
                </Grid>
            </Grid>
              <Readme viewState={viewState}/>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
  );
}
