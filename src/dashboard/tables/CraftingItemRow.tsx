import * as React from 'react';
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {Button, Collapse} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CloseIcon from "@mui/icons-material/Close";
import RecipeItemRow from "./RecipeItemRow";
import Box from "@mui/material/Box";
import {RecipeItem} from "../../data/data-classes/CraftingItem";
import {itemData} from "../../data/DataLoader";

function formatPrice(priceCp: number): String {

        if(priceCp < 10) {
                return  priceCp.toString() + " cp";
        } else if(priceCp < 100) {
                return (priceCp/10).toString() + " sp";
        } else {
                return (priceCp/100).toString() + " gp";
        }
}
export default function CraftingItemRow({row, index, inventory, inventoryData, craftable, projects, viewState, forceUpdate} : {row: any, index: any, inventory: any, inventoryData: any, craftable: any, projects: any, viewState: any, forceUpdate: any}) {
    const [open, setOpen] = React.useState(false);
    const labelId = `enhanced-table-checkbox-${index}`;

    function addToInventory(event: any) {
        let value = event.target.value;
        if (value) {
            inventory.addToInventory([{id: Number(value), quantity: 1, name: ""}])
        } else {
            alert("This is coded poorly, wait a bit before clicking please.")
        }
    }

    function completeProject(event: any) {
        let value = event.target.value;
        if (value) {
            inventory.addToInventory([{id: Number(value), quantity: 1}], true)
        } else {
            alert("This is coded poorly, wait a bit before clicking please.")
        }
    }

    function removeWishlist(event: any) {
        let value: number = event.target.value;
        if (value) {

            projects.removeFromWishlist(itemData.itemList[value]);
            forceUpdate();
        } else {
            alert("This is coded poorly, wait a bit before clicking please.")
        }
    }

    let recipes = itemData.itemList[row.id].recipes;
    if (!recipes)
        recipes = [];
    let addToInventoryEnabled = !(viewState == "items" || viewState == "projects");
    let isProjects = viewState == "projects";
    let isWishlist = viewState == "wishlist";
    return(
            <React.Fragment>
                        <TableRow sx={{ '& > *': { borderBottom: 'unset' }}}>
                                <TableCell>
                                        <IconButton
                                        style={recipes.length == 0 ? { display: 'none' } : {}}
                                        aria-label="expand row"
                                        size="small"
                                        onClick={() => setOpen(!open)}
                                        >
                                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                        </IconButton>
                                </TableCell>
                                <TableCell
                                component="th"
                                id={labelId}
                                scope="row"
                                padding="none"
                                style={!isProjects && craftable.get(row.id) ? { color: 'green', fontWeight: 'bold'} : {}}
                                >
                                        {row.name}
                                </TableCell>
                                <TableCell align="left">{row.rarity}</TableCell>
                                <TableCell align="right">{row.usedFor}</TableCell>
                                <TableCell align="right">{formatPrice(row.priceCp)}</TableCell>
                                <TableCell align="right" >
                                    <Button value={row.id} onClick={addToInventory}
                                            style={isProjects || isWishlist ? { display: 'none' } : {}}
                                    >Add to&nbsp;<DashboardIcon pointerEvents="none"/>
                                    </Button>
                                    <Button value={row.id} onClick={completeProject}
                                            style={!isProjects ? { display: 'none' } : {}}
                                    >Complete Project
                                    </Button>
                                    <Button value={row.id} onClick={removeWishlist}
                                            style={!isWishlist ? { display: 'none' } : {}}
                                    >Delete &nbsp;<CloseIcon pointerEvents="none"/>
                                    </Button>
                                </TableCell>
                                </TableRow>
                                <TableRow>
                                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                <Collapse in={open} timeout="auto" unmountOnExit>
                                        <Box sx={{ margin: 1 }}>
                                            {recipes.map((recipe: RecipeItem, i: number) => {
                                                const id = row.id
                                                return(<RecipeItemRow key={"recipe-"+index+"-"+i}  recipe={{recipe}} parentId={id} inventory = {inventory} inventoryData={inventoryData} craftable={craftable} projects={projects} viewState={viewState} forceUpdate={forceUpdate}/>);
                                            } )}
                                        </Box>
                                </Collapse>
                        </TableCell>
                    </TableRow>
                </React.Fragment>
    )
}