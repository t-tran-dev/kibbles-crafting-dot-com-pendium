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

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://www.kthomebrew.com/">
        Kibbles Tasty
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function Readme({viewState}: {viewState: any}) {

    return (
        <Grid
            container
            direction="column"
            alignItems="center"
            >

            <Typography variant="h3">
                Instructions
            </Typography>

            <Typography variant="subtitle1">
                This is a standlone tool to facilite the crafting experience to be used in alongside your D&D game. Uses the crafting system from Kibbles Crafting Compendium, leveraging the items and recipes described within. Inventory, Wishlist and Active Projects are stored as browser cookies.
            </Typography>
            <Grid
            container
            direction="row"
            justifyContent="center"
            spacing={3}
            >
                <Grid item xs={6}>
                    <Paper>
                        <List dense={true}>
                            <ListItem>
                                <ListItemText>
                                    <Typography variant="h6">
                                        Items & Recipes
                                    </Typography>
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    <Typography variant="subtitle1">
                                        The master list of all items and associated crafting recipes.
                                    </Typography>
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    <Typography variant="subtitle1">
                                        When you Harvest or Loot an item, add it directly to your inventory with<Button>Add to&nbsp;<DashboardIcon/></Button>
                                    </Typography>
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    <Typography variant="subtitle1">
                                        Expanding a recipe dropdown with <IconButton><KeyboardArrowDownIcon /></IconButton> will show you what is required to craft it and what you are missing.
                                    </Typography>
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    <Typography variant="subtitle1">
                                        If you have enough ingredients you can click <Button>Start Project</Button> to begin crafting. This removes the ingredients from your Inventory and adds the recipe to your Active Projects.
                                    </Typography>
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    <Typography variant="subtitle1">
                                        Clicking <Button>Add to Wishlist</Button> will add the recipe to your Wishlist so you can keep an eye out for missing ingredients next time you're in town.
                                    </Typography>
                                </ListItemText>
                            </ListItem>
                        </List>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper>
                        <List dense={true}>
                        <ListItem>
                            <ListItemText>
                            <Typography variant="h6">
                                Inventory
                            </Typography>
                            </ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemText>
                                <Typography variant="subtitle1">
                                    The items stored in your inventory used to calculate what you are able to craft.
                                </Typography>
                                </ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemText>
                                <Typography variant="subtitle1">
                                    Items added from Items & Recipes as well as completed projects from Active Projects are stored here.
                                </Typography>
                            </ListItemText>
                        </ListItem>
                            <ListItem>
                                <ListItemText>
                                    <Typography variant="subtitle1">
                                        You can increase or decrease the quantity of an item in your inventory with <Button><RemoveIcon/></Button>
                                    <Button><AddIcon/></Button> Adding an item from Items & Recipes will increase the quantity if it is already in your inventory.
                                    </Typography>
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    <Typography variant="subtitle1">
                                        Items are automatically removed when you click <Button>Start Project</Button> on a recipe, and completing an Active Project will add the new item to your Inventory directly.
                                    </Typography>
                                </ListItemText>
                            </ListItem>
                    </List>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper>
                        <List dense={true}>
                            <ListItem>
                                <ListItemText>
                                    <Typography variant="h6">
                                        Active Projects
                                    </Typography>
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    <Typography variant="subtitle1">
                                        Crafting Projects that are in progress. Ingredients have already been allocated.
                                    </Typography>
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    <Typography variant="subtitle1">
                                        You can add recipes from Items & Recipes to your Active Projects if and only if you have all the required ingredients in your Inventory.
                                    </Typography>
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    <Typography variant="subtitle1">
                                        Clicking <Button>Complete Project</Button> will remove the recipe from your Active Projects and add it directly to your inventory.
                                    </Typography>
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    <Typography variant="subtitle1">
                                        If you examine the recipe of one of your Active Projects with <IconButton><KeyboardArrowDownIcon /></IconButton> you can refund or delete the project.
                                    </Typography>
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    <Typography variant="subtitle1">
                                        <Button >Refund Project</Button> will remove the recipe from your Active Projects, but will refund all the ingredients from the recipe back to your Inventory. Great if you change your mind.
                                    </Typography>
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    <Typography variant="subtitle1">
                                        <Button >Delete Project</Button> will remove the recipe from your Active Projects but the ingredients are gone forever, as if your failed three crafting checks in a row.
                                    </Typography>
                                </ListItemText>
                            </ListItem>

                        </List>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper>
                        <List dense={true}>
                            <ListItem>
                                <ListItemText>
                                    <Typography variant="h6">
                                        Wishlist
                                    </Typography>
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    <Typography variant="subtitle1">
                                        Recipes you would like to craft, but don't have enough ingredients yet.
                                    </Typography>
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    <Typography variant="subtitle1">
                                        Adding a recipe to your Wishlist from Items and Recipes will allow you to keep track of the recipe and any specific items you are missing.
                                    </Typography>
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    <Typography variant="subtitle1">
                                        Once you have all the required items you can expand a recipe and click <Button>Start Project</Button> which removes the recipe from your Wishlist and adds it to Active Projects, it also removes the required ingredients from your Inventory.
                                    </Typography>
                                </ListItemText>
                            </ListItem>
                        </List>
                    </Paper>
                </Grid>


            </Grid>
        </Grid>

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
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
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
