import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
// import { InventoryTable, RecipeTable } from "../../components/tables";

import { ContentLayout } from "../root/ContentLayout";

function HandleState({
  inventory,
  inventoryData,
  craftable,
  projects,
  viewState,
  wishlistData,
  projectData,
  forceUpdate,
}: {
  inventory: any;
  inventoryData: any;
  craftable: any;
  projects: any;
  viewState: any;
  wishlistData: any;
  projectData: any;
  forceUpdate: any;
}) {
  if (viewState != "inventory") {
    return (
      // <RecipeTable
      //   inventory={inventory}
      //   inventoryData={inventoryData}
      //   craftable={craftable}
      //   projects={projects}
      //   viewState={viewState}
      //   wishlistData={wishlistData}
      //   projectData={projectData}
      //   forceUpdate={forceUpdate}
      // />
      <div>Recipe Table</div>
    );
  }

  return (
    // <InventoryTable
    //   inventory={inventory}
    //   inventoryData={inventoryData}
    //   forceUpdate={forceUpdate}
    // />
    <div>Inventory Table</div>
  );
}

export default function Dashboard({
  inventory,
  inventoryData,
  craftable,
  projects,
  wishlistData,
  projectData,
  forceUpdate,
}: {
  inventory: any;
  inventoryData: any;
  craftable: any;
  projects: any;
  wishlistData: any;
  projectData: any;
  forceUpdate: any;
}) {
  const [viewState, setViewState] = React.useState("items");

  return (
    <ContentLayout>
      <Toolbar />
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="subtitle1">
          Reload page to fix any bugs. Seriously, reload all the time. If
          anything looks off or confuses you.
        </Typography>
        <Grid container spacing={3}>
          {/* Active Projects */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <HandleState
                inventory={inventory}
                inventoryData={inventoryData}
                craftable={craftable}
                projects={projects}
                viewState={viewState}
                wishlistData={wishlistData}
                projectData={projectData}
                forceUpdate={forceUpdate}
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </ContentLayout>
  );
}
