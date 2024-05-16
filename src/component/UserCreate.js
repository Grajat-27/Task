import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

function Usercreate(props) {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    address: {
      city: "",
      zipcode: "",
    },
  });
  
  const handleClose = () => {
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

  const handleSubmit = () => {
    props.submit(formData);
    props.modalClose();
  };

  return (
    <div>
      <Dialog open={props.open} onClose={handleClose}>
        
        <DialogTitle id="alert-dialog-title">Edit</DialogTitle>
        
        <DialogContent>
          
          <Stack spacing={3}>
            
            <Stack spacing={2} direction="row" style={{ marginTop: 10 }}>
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
            onClick={handleSubmit}
            style={{ backgroundColor: "blue", color: "white" }}
          >
            Confirm
          </Button>
        
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Usercreate;
