import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

function Usermodal(props) {
  
  const [formData, setFormData] = useState({ ...props.data });
  
  const handleClose = () => {
    props.modalClose();
  };

  const handleDelete = (id) => {
    props.deleteData(id);
    props.modalClose();
  };

  const handleEdit = () => {
    props.editData(formData);
    props.modalClose();
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "city" || id === "zipcode") {
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [id]: value,
        },
      }));
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };
  
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
      >
        {props.data.delete ? (
          <>
            <DialogTitle id="alert-dialog-title">Delete</DialogTitle>
            
            <DialogContent>
              
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete this data?
              </DialogContentText>
            
            </DialogContent>
            
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button
                onClick={() => handleDelete(props.data.id)}
                style={{ backgroundColor: "red", color: "white" }}
              >
                Delete
              </Button>
            </DialogActions>
          </>
        ) : (
          <>
            <DialogTitle id="alert-dialog-title" >Edit</DialogTitle>
            <DialogContent>
              <Stack spacing={3}>
                <Stack spacing={2} direction="row" style={{marginTop:10}}>
                  <TextField
                    id="name"
                    label="Name"
                    variant="outlined"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                  />
                  <TextField
                    id="email"
                    label="Email"
                    variant="outlined"
                    value={formData.email}
                    onChange={handleChange}
                    InputLabelProps={{ style: { fontSize: 10 } }}
                    fullWidth
                  />
                </Stack>
                <Stack spacing={2} direction="row">
                  <TextField
                    id="phone"
                    label="Phone"
                    variant="outlined"
                    value={formData.phone}
                    onChange={handleChange}
                    fullWidth
                  />
                  <TextField
                    id="city"
                    label="City"
                    variant="outlined"
                    value={formData.address.city}
                    onChange={handleChange}
                    fullWidth
                  />
                </Stack>
                <Stack spacing={2} direction="row">
                  <TextField
                    id="zipcode"
                    label="Zipcode"
                    variant="outlined"
                    value={formData.address.zipcode}
                    onChange={handleChange}
                    fullWidth
                  />
                </Stack>
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button
                onClick={handleEdit}
                style={{ backgroundColor: "blue", color: "white" }}
              >
                Confirm
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </div>
  );
}

export default Usermodal;
