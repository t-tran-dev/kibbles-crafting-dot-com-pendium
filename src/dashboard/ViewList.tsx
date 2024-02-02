import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import {AllInbox, Apps, BorderClear} from "@mui/icons-material";

enum State {
    inventory,
    projects,
    wishlist,
    items
}
function viewStateToIndex(viewState: string): number {
    if (viewState == "inventory") {
        return 0;
    }
    if (viewState == "projects") {
        return 1;
    }
    if (viewState == "wishlist") {
        return 2;
    }
    return 3;

}

export function ViewList({viewState}: {viewState: any}) {

    let selectedIndex = viewStateToIndex(viewState.viewState);

    function changeState( index: number) {
        viewState.setViewState(State[index]);
    }
    return(
    <React.Fragment>
        <ListItemButton selected={selectedIndex === 0}
                        onClick={() => changeState(0)}>
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Inventory" />
        </ListItemButton>
        <ListItemButton selected={selectedIndex === 1}
                        onClick={() => changeState(1)}>
            <ListItemIcon>
                <AllInbox />
            </ListItemIcon>
            <ListItemText primary="Active Projects" />
        </ListItemButton>
        <ListItemButton selected={selectedIndex === 2}
                        onClick={() => changeState(2)}>
            <ListItemIcon>
                <BorderClear />
            </ListItemIcon>
            <ListItemText primary="Wishlist" />
        </ListItemButton>
        <ListItemButton selected={selectedIndex === 3}
                        onClick={() => changeState(3)}>
            <ListItemIcon>
                <Apps />
            </ListItemIcon>
            <ListItemText primary="Items & Recipes" />
        </ListItemButton>
    </React.Fragment>
    );
}

