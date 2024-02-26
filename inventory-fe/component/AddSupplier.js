import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import axios from "axios";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useEffect} from 'react';


const AddSupplier = () => {
  const [formData, setFormData] = useState({
    name: '',
    contact_info: '',
  });

  


  const handleChange = (e) => {
    const { name, value } = e.target;
    if(name=="contact_info")
    {
        if ((!/^\d*$/.test(value))) {
            console.log('Please enter only digits');
          } else {
            setFormData({ ...formData, [name]: value });
          }
    }
    else{
    setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
    .post(
        `http://localhost:8000/api/supplier/create`,formData)
    .then((response) => {
        console.log("create")
    });
    setFormData({
      name: '',
      contact_info: '',
    });
  };

  

  return (
    <Grid container justifyContent={"center"}>
  <Card sx={{ maxWidth: 550,backgroundColor:"#ffffff91" }}>
    <CardContent sx={{padding:"32px"}}>
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} justifyContent={"center"}>
        <Grid item xs={11}>
          <TextField
            variant="outlined"
            required
            sx={{ width: 400,color:"#000" }}
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={11}>
          <TextField
            variant="outlined"
            required
            sx={{ width: 400,color:"#000" }}
            label="Contact"
            name="contact_info"
            value={formData.contact_info}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sx={{textAlign:"center"}}>
          <Button sx={{backgroundColor:"#192531de","&:hover":{
            backgroundColor:"#192531de"
          }}} type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
    </CardContent>
    </Card>
    </Grid>
  );
};

export default AddSupplier;
