import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListItemText from '@mui/material/ListItemText';
import ProductList from '../../component/ProductList'
import SupplierList from '../../component/SupplierList'
import AddProduct from '../../component/AddProduct'
import { useRouter } from 'next/router';
import Head from 'next/head';
import AddSupplier from '@/component/AddSupplier';

const drawerWidth = 240;

export default function InventoryDashBoard() {
  const router = useRouter()


  return (
  <>
    <Head>
    <title>Create Next App</title>
    <meta name="description" content="Generated by create next app" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="/favicon.ico" />
  </Head>
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 ,backgroundColor:"#1925312e"}}>
        <Toolbar >
          <DashboardIcon/>
          <Typography variant="h6" noWrap component="div">
            Inventory Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-header`]:{backgroundColor:'#000'},
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box',backgroundColor:'#1925312e',borderRight:"1px solid rgba(0, 0, 0, 0.87)" },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
              <ListItem key={"Product"} >
                <ListItemButton onClick={()=>router.push("productList")}>
                  <ListItemText primary={"Product"} sx={{color:"#fff"}}/>
                </ListItemButton>
              </ListItem>
              <ListItem key={"Supplier"} >
                <ListItemButton onClick={()=>router.push("supplierList")}>
                  <ListItemText primary={"Supplier"} sx={{color:"#fff"}}/>
                </ListItemButton>
              </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {router?.query?.prod&&router?.query?.prod[0]=="productList"&&
        <ProductList/>
        }
        {router?.query?.prod&&router?.query?.prod[0]=="supplierList"&&
        <SupplierList/>
        }
        {router?.query?.prod&&router?.query?.prod[0]=="addProduct"&&
          <AddProduct/>
        }
        {router?.query?.prod&&router?.query?.prod[0]=="addSupplier"&&
          <AddSupplier/>
        }
      </Box>
    </Box>
    </>
  );
}
