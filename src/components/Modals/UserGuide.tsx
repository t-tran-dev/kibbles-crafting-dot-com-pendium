import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import { ListItem } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import ChecklistIcon from "@mui/icons-material/Checklist";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflow: "scroll",
  maxHeight: "80%",
};

export const UserGuide = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Button variant="outlined" onClick={handleOpen}>
        <Typography variant="h5"> User Guide</Typography>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div style={{ display: "flex", justifyContent: "right" }}>
            <Button onClick={handleClose}>
              <CloseIcon />
            </Button>
          </div>
          <Grid container direction="column" alignItems="center">
            <Typography variant="h3">User Guide</Typography>

            <Typography variant="subtitle1">
              This is a standlone tool to facilite the crafting experience to be
              used in alongside your D&D game. Uses the crafting system from
              Kibbles Crafting Compendium, leveraging the items and recipes
              described within. Inventory, Wishlist and Active Projects are
              stored as browser cookies.
            </Typography>
            <Grid container direction="row" justifyContent="center" spacing={3}>
              <Grid item xs={6}>
                <Paper elevation={12}>
                  <List dense={true}>
                    <ListItem>
                      <ListItemText>
                        <Typography variant="h6">Items & Recipes</Typography>
                      </ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemText>
                        <Typography variant="subtitle1">
                          The master list of all items and associated crafting
                          recipes.
                        </Typography>
                      </ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemText>
                        <Typography variant="subtitle1">
                          When you Harvest or Loot an item, add it directly to
                          your inventory with
                          <Button>
                            Add to&nbsp;
                            <DashboardIcon />
                          </Button>
                        </Typography>
                      </ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemText>
                        <Typography variant="subtitle1">
                          View an item's recipes by clicking{" "}
                          <IconButton>
                            <ChecklistIcon />
                          </IconButton>{" "}
                          will show you what is required to craft it and what
                          you are missing. Items without this icon cannot be
                          crafted and are base materials.
                        </Typography>
                      </ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemText>
                        <Typography variant="subtitle1">
                          If you have enough ingredients you can click{" "}
                          <Button>Start Project</Button> to begin crafting. This
                          removes the ingredients from your Inventory and adds
                          the recipe to your Active Projects.
                        </Typography>
                      </ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemText>
                        <Typography variant="subtitle1">
                          Clicking <Button>Add to Wishlist</Button> will add the
                          recipe to your Wishlist so you can keep an eye out for
                          missing ingredients next time you're in town.
                        </Typography>
                      </ListItemText>
                    </ListItem>
                  </List>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper elevation={12}>
                  <List dense={true}>
                    <ListItem>
                      <ListItemText>
                        <Typography variant="h6">Active Projects</Typography>
                      </ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemText>
                        <Typography variant="subtitle1">
                          Crafting Projects that are in progress. Ingredients
                          have already been allocated.
                        </Typography>
                      </ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemText>
                        <Typography variant="subtitle1">
                          You can add recipes from Items & Recipes to your
                          Active Projects if and only if you have all the
                          required ingredients in your Inventory.
                        </Typography>
                      </ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemText>
                        <Typography variant="subtitle1">
                          Clicking <Button>Complete Project</Button> will remove
                          the recipe from your Active Projects and add it
                          directly to your inventory.
                        </Typography>
                      </ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemText>
                        <Typography variant="subtitle1">
                          If you examine the recipe of one of your Active
                          Projects with{" "}
                          <IconButton>
                            <KeyboardArrowDownIcon />
                          </IconButton>{" "}
                          you can refund or delete the project.
                        </Typography>
                      </ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemText>
                        <Typography variant="subtitle1">
                          <Button>Refund Project</Button> will remove the recipe
                          from your Active Projects, but will refund all the
                          ingredients from the recipe back to your Inventory.
                          Great if you change your mind.
                        </Typography>
                      </ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemText>
                        <Typography variant="subtitle1">
                          <Button>Delete Project</Button> will remove the recipe
                          from your Active Projects but the ingredients are gone
                          forever, as if your failed three crafting checks in a
                          row.
                        </Typography>
                      </ListItemText>
                    </ListItem>
                  </List>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper elevation={12}>
                  <List dense={true}>
                    <ListItem>
                      <ListItemText>
                        <Typography variant="h6">Inventory</Typography>
                      </ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemText>
                        <Typography variant="subtitle1">
                          The items stored in your inventory used to calculate
                          what you are able to craft.
                        </Typography>
                      </ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemText>
                        <Typography variant="subtitle1">
                          Items added from Items & Recipes as well as completed
                          projects from Active Projects are stored here.
                        </Typography>
                      </ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemText>
                        <Typography variant="subtitle1">
                          You can increase or decrease the quantity of an item
                          in your inventory with{" "}
                          <Button>
                            <RemoveIcon />
                          </Button>
                          <Button>
                            <AddIcon />
                          </Button>{" "}
                          Adding an item from Items & Recipes will increase the
                          quantity if it is already in your inventory.
                        </Typography>
                      </ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemText>
                        <Typography variant="subtitle1">
                          Items are automatically removed when you click{" "}
                          <Button>Start Project</Button> on a recipe, and
                          completing an Active Project will add the new item to
                          your Inventory directly.
                        </Typography>
                      </ListItemText>
                    </ListItem>
                  </List>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper elevation={12}>
                  <List dense={true}>
                    <ListItem>
                      <ListItemText>
                        <Typography variant="h6">Wishlist</Typography>
                      </ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemText>
                        <Typography variant="subtitle1">
                          Recipes you would like to craft, but don't have enough
                          ingredients yet.
                        </Typography>
                      </ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemText>
                        <Typography variant="subtitle1">
                          Adding a recipe to your Wishlist from Items and
                          Recipes will allow you to keep track of the recipe and
                          any specific items you are missing.
                        </Typography>
                      </ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemText>
                        <Typography variant="subtitle1">
                          Once you have all the required items you can expand a
                          recipe and click <Button>Start Project</Button> which
                          removes the recipe from your Wishlist and adds it to
                          Active Projects, it also removes the required
                          ingredients from your Inventory.
                        </Typography>
                      </ListItemText>
                    </ListItem>
                  </List>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};
