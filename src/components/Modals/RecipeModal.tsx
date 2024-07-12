import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ChecklistIcon from "@mui/icons-material/Checklist";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import TableCell from "@mui/material/TableCell";
import { Collapse } from "@mui/material";
import { RecipeItem } from "../../data/data-classes/CraftingItem";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { itemData } from "../../data/DataLoader";
import Typography from "@mui/material/Typography";
import { formatPrice } from "../tables/InventoryRow";
import { RecipeItemRow } from "../tables";

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
  maxWidth: "lg",
};

export const RecipeModal = ({
  recipes,
  parentId,
  inventory,
  inventoryData,
  craftable,
  projects,
  viewState,
  forceUpdate,
  index,
}: {
  recipes: any;
  parentId: any;
  inventory: any;
  inventoryData: any;
  craftable: any;
  projects: any;
  viewState: any;
  forceUpdate: any;
  index: any;
}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const item = itemData.itemList[parentId];

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Button
        onClick={handleOpen}
        style={recipes.length == 0 ? { display: "none" } : {}}
      >
        <ChecklistIcon />
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
          <Typography variant="h5">
            {item.name}
            <sup>{item.source}</sup>
          </Typography>
          <Typography variant="body1" sx={{ fontStyle: "italic" }}>
            {item.rarity}
            <span
              style={
                item.rarity && (item.priceCp || item.usedFor)
                  ? {}
                  : { display: "none" }
              }
            >
              ,&nbsp;
            </span>
            <span style={item.priceCp ? {} : { display: "none" }}>
              {formatPrice(item.priceCp)}
            </span>
            <span
              style={item.priceCp && item.usedFor ? {} : { display: "none" }}
            >
              ,&nbsp;
            </span>
            {item.usedFor}
          </Typography>

          <Table>
            <TableBody>
              <TableRow>
                <TableCell
                  style={{ paddingBottom: 0, paddingTop: 0 }}
                  colSpan={6}
                >
                  <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box sx={{ margin: 1 }}>
                      {recipes.map((recipe: RecipeItem, i: number) => {
                        const id = parentId;
                        return (
                          <RecipeItemRow
                            key={"recipe-" + index + "-" + i}
                            recipe={{ recipe }}
                            parentId={id}
                            inventory={inventory}
                            inventoryData={inventoryData}
                            craftable={craftable}
                            projects={projects}
                            viewState={viewState}
                            forceUpdate={forceUpdate}
                          />
                        );
                      })}
                    </Box>
                  </Collapse>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      </Modal>
    </div>
  );
};
