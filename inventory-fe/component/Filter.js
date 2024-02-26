import React, { useEffect } from 'react';
import Menu from '@mui/material/Menu';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import FilterListIcon from '@mui/icons-material/FilterList';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useState } from 'react';
import { IconButton,Button } from '@mui/material';
import Slider from '@mui/material/Slider';

const Filter = (props) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [minMax, setMinMax] = useState();
    const [price,setPrice] = useState([0,100])
    const [supplier,setSupplier] = useState([])
    const [checkedSupplier, setCheckedSupplier] = useState([]);
    const [openItem, setOpenItem] = useState({
        price: false,
        supplier: false
    })

    useEffect(()=>{
        if(props?.rows?.length!=0){
        var arr =findMinMax("price",props.rows)
        setPrice(arr)
        setMinMax([arr.min,arr.max])
        var sup = props.rows.map(item => item.supplier);
        setSupplier([...new Set(sup)])
        }
    },[props.rows])

    const findMinMax =(key,arr)=>{
        const datas = arr.map((node)=> node[key])
        return{
            min:Math.min(...datas),
            max:Math.max(...datas)
        }
    }

    const handleSupplierChange = (index) => {
        setCheckedSupplier(prevState => {
          const newState = [...prevState];
          const existingIndex = newState.indexOf(index);
          if (existingIndex === -1) {
            newState.push(index); 
          } else {
            newState.splice(existingIndex, 1); 
          }
          return newState;
        });
      };
    

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePriceChange = (_, newValue) => {
        setMinMax(newValue);
      };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleListClick = (name) => {
        var temp = openItem
        temp[name] = !temp[name]
        setOpenItem({ ...temp })
    }

    return (
        <div>
            <IconButton onClick={handleClick}><FilterListIcon /></IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <List
                    sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                          <Button sx={{color:"#000",width:"150px",textTransform:"none",border:"1px solid",marginRight:"24px"}}>Apply</Button>
                        </ListSubheader>
                    }
                >
                    <ListItemButton onClick={() => handleListClick("supplier")}>
                        <ListItemIcon>
                            <Inventory2Icon />
                        </ListItemIcon>
                        <ListItemText primary="Supplier" />
                        {openItem.supplier ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={openItem.supplier} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {supplier.map(item =>
                                <ListItemButton sx={{ pl: 4 }}>

                                    <FormControlLabel
                                        key={item}
                                        control={
                                            <Checkbox
                                                checked={checkedSupplier.includes(item)}
                                                onChange={() => handleSupplierChange(item)}
                                            />
                                        }
                                        label={item}
                                    />

                                </ListItemButton>
                            )}
                        </List>
                    </Collapse>
                    <ListItemButton onClick={() => handleListClick("price")}>
                        <ListItemIcon>
                            <LocalOfferIcon />
                        </ListItemIcon>
                        <ListItemText primary="Price" />
                        {openItem.price ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={openItem.price} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                                <Slider
                                    getAriaLabel={() => 'Temperature range'}
                                    value={minMax}
                                    min={price?.min}
                                    max={price?.max}
                                    onChange={handlePriceChange}
                                    valueLabelDisplay="auto"
                                />
                            </ListItemButton>
                        </List>
                    </Collapse>
                </List>

            </Menu>
        </div>
    );
};

export default Filter;
