import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import CloseIcon from "@mui/icons-material/Close";
import { useCookies } from "react-cookie";
import { exportCraftingData, importCraftingData } from "../../api/Cookies";
import { ImportExportData } from "../../api/types/importExportData";

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

export const ExportModal = () => {
  const [cookies, setCookie] = useCookies(["inv", "wish", "proj"]);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let data = exportCraftingData(cookies.wish, cookies.proj, cookies.inv);

  function handleSubmit(e: any) {
    // Prevent the browser from reloading the page
    //e.preventDefault();

    // Read the form data
    const form = e.target;
    const formData = new FormData(form);

    const cookieData: string = Object.fromEntries(
      formData.entries()
    ).cookieData.toString();

    const data: ImportExportData = importCraftingData(cookieData);

    if (data.wishlist) {
      setCookie("wish", data.wishlist, { path: "/" });
    } else {
      setCookie("wish", [], { path: "/" });
    }
    if (data.active) {
      setCookie("proj", data.active, { path: "/" });
    } else {
      setCookie("proj", [], { path: "/" });
    }
    if (data.inventory) {
      setCookie("inv", data.inventory, { path: "/" });
    } else {
      setCookie("inv", [], { path: "/" });
    }
  }

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Button variant="outlined" onClick={handleOpen}>
        <Typography variant="h5">Import/Export Data</Typography>
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
            <Typography variant="h3">Import/Export Data</Typography>
            <p>
              To backup your data copy the text area to a local file. To import
              backed up data, delete everything in the text field, and paste
              your local data, then click the IMPORT button, then reload the
              app.
            </p>

            <form onSubmit={handleSubmit}>
              <textarea
                name="cookieData"
                rows={4}
                cols={40}
                defaultValue={data}
              ></textarea>

              <button type="submit">IMPORT</button>
            </form>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};
