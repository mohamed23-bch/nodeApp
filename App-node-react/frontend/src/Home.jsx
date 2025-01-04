
import React from 'react';
import MiniDrawer from './components/MiniDrawer';
import Navbar from './components/Navbar';
import AccordionDash from './components/AccordionDash';
import ChartBar from './components/ChartBar';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import Stack from '@mui/material/Stack'; 
import "./Dash.css";
import StorefrontIcon from '@mui/icons-material/Storefront';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

function Home() {
  return (
    <>
    <div className='bgcolor'>
    <Navbar />
      <Box height={70} />
      <Box sx={{display:"flex"}}>
      <MiniDrawer />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
          <Stack direction="row" spacing={2} >
            <Card sx={{ minWidth: 49 + "%" , height: 140 }} className='gradientligth'>
              <CardContent>
                <div className='iconstyle'>
                <CreditCardIcon/> 
                </div>
                <Typography gutterBottom variant="h5" component="div" sx={{color:"#ffffff"}}>
                    $500.00
                </Typography>
                <Typography gutterBottom variant="body2" component="div" sx={{color:"#ccd1d1"}}>
                    Revenus totaux  
                </Typography>
                
              </CardContent>
            </Card>
            <Card sx={{ minWidth: 49 + "%" , height: 140 }} className='gradient'>
              <CardContent>
                 <div className='iconstyle'>
                 <ShoppingBasketIcon />
                </div>
                <Typography gutterBottom variant="h5" component="div" sx={{color:"#ffffff"}}>
                    $900.00
                </Typography>
                <Typography gutterBottom variant="body2" component="div" sx={{color:"#ccd1d1"}}>
                    Commande totale
                </Typography>
               
              </CardContent>
            </Card>
            
            </Stack>
          </Grid>
          <Grid item xs={4}>
          <Stack spacing={2}   > 
            <Card sx={{ maxWidth: 600 }} className='gradientligth'>
              <Stack spacing={2} direction="row"> 
               <div className='iconstyle'>
              <StorefrontIcon />
               </div>
              <div className='paddingall'>
              <span className='pricetitle'>$100K </span>
              <br/> 
              <span className='pricesubtitle'>Revenu total</span>
              </div>
              </Stack>

            </Card> 
            
            <Card sx={{ maxWidth: 600 }} className='gradient'>
              <Stack spacing={2} direction="row"> 
               <div className='iconstyle'>
              <StorefrontIcon />
               </div>
              <div className='paddingall'>
              <span className='pricetitle'>$100K </span>
              <br/> 
              <span className='pricesubtitle'>Revenu total</span>
              </div>
              </Stack>
                
              
            </Card> 
            
            </Stack>
            {/* Contenu pour le second bloc */}
          </Grid>
        </Grid>
        <Box height={20} /> {/* Correction de la propriété heigth en height */}
        <Grid container spacing={2}>
          <Grid item xs={8}>
          <Card sx={{ height: 60+"vh" }}>
              <CardContent>
              <ChartBar/>
              </CardContent>
            </Card> 
            
            {/* Contenu pour le premier bloc de la deuxième rangée */}
          </Grid>
          <Grid item xs={4}>
          <Card sx={{ height: 60+"vh" }}>
              <CardContent>
              <div className='paddingall'>
              <span className='pricetitle'>Produits populaires </span>
              </div> 
              <AccordionDash /> 
              </CardContent>
            </Card> 
            
          </Grid>
        </Grid>
        
      </Box>
      </Box> 
    </div>
      
    </>
  );
}

export default Home;
