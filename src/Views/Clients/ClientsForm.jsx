import { Box, Button, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState } from "react";
import { registerClient } from "../../Services/ClientsService";
import { useNavigate } from "react-router";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const ClientsForm = () => {
  const [client, setClient] = useState({
    name: "",
    phone: "",
    nif: "",
    email: "",
    logo: null,
  });

  // navigate
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setClient({
      ...client,
      logo: event.target.files[0],
    });
  };

  const handleInputChange = (event) => {
    setClient({
      ...client,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", client.name);
    formData.append("nif", client.nif);
    formData.append("phone", client.phone);
    formData.append("email", client.email);
    if (client.logo) {
      formData.append("logo", client.logo);
    }

    registerClient(formData)
      .then(() => {
        navigate("/clients");
      })
      .catch((error) => console.log(error));
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <Box sx={{ margin: 2 }}>
        <Typography variant="h3">Clients Form</Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            name="name"
            onChange={handleInputChange}
            id="outlined-basic"
            label="Razón Social"
            variant="outlined"
          />
          <TextField
            name="nif"
            onChange={handleInputChange}
            id="outlined-basic"
            label="NIF"
            variant="outlined"
            type="string"
          />
          <TextField
            name="phone"
            onChange={handleInputChange}
            id="outlined-basic"
            label="Teléfono de Contacto"
            variant="outlined"
            type="phone"
          />
          <TextField
            name="email"
            onChange={handleInputChange}
            id="outlined-basic"
            label="Email"
            variant="outlined"
            type="email"
          />
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
          >
            Logo del cliente
            <VisuallyHiddenInput
              onChange={handleFileChange}
              name="logo"
              type="file"
            />
          </Button>
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ marginY: 2 }}
        >
          Agregar
        </Button>
      </Box>
    </form>
  );
};

export default ClientsForm;
