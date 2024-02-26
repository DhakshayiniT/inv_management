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
import { useRouter} from 'next/router';


const AddProduct = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    quantity_in_stock: '',
    price: '',
    supplier:'',
  });
  const [rows,setRows] = useState([])

  
  useEffect(()=>{
    axios
    .get(
        `http://localhost:8000/api/supplier/list`
    )
    .then((response) => {
    setRows(response.data)
    });
  },[])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
    .post(
        `http://localhost:8000/api/product/create`,formData)
    .then((response) => {
    setRows(response.data)
    });
    setFormData({
      name: '',
      description: '',
      quantity_in_stock: '',
      price: '',
      supplier:'',
    });
    router.push("productList")
  };

  

  return (
    <Grid container justifyContent={"center"}>
  <Card sx={{ maxWidth: 650,backgroundColor:"#ffffff91" }}>
    <CardContent>
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
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
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            sx={{ width: 400,color:"#000" }}
            multiline
            rows={4}
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            required
            fullWidth
            type="number"
            label="Quantity in Stock"
            name="quantity_in_stock"
            value={formData.quantity_in_stock}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            required
            fullWidth
            type="number"
            label="Price"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
        <FormControl sx={{width:400}}>
        <InputLabel id="demo-simple-select-label">Supplier</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name="supplier"
          value={formData.supplier}
          label="Supplier"
          onChange={handleChange}
        >
            {rows&&rows?.length!=0&&rows?.map(item=>
          <MenuItem value={item.name}>{item.name}</MenuItem>
            )}
        </Select>
      </FormControl>
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

export default AddProduct;
