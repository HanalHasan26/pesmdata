
import React, { useEffect,useState } from 'react'
import { Backdrop, Box, CircularProgress, Container, Grid } from '@mui/material'
import axios from 'axios'
import './StanderdPlayer.css'
import { makeStyles } from '@mui/styles';
import NavBar from '../NavBar/NavBar'
import { PlayerState } from '../../Context/PlayersProvider';
import { useNavigate } from 'react-router-dom';
import Star from '../../assets/Star/Star';

const useStyles = makeStyles({

  root:{
    backgroundColor:'white',
    borderRadius:'5px'
  }
    
  })


const StanderdPlayer = () => {
  const classes = useStyles()
  const { accessPlayerData} = PlayerState();

const [basicData, setBasicData]= useState([])
const [open, setOpen]= useState(false)
const [searchTerm, setSearchTerm]= useState('')

const navigate = useNavigate()


const fetchPlayers =async ()=>{
setOpen(true)
  const {data} = await axios.get("/api/player/standerd");
  setBasicData(data)
  setOpen(false)
}



useEffect(()=>{
fetchPlayers()

},[])

  return ( 
    <Box>
       <NavBar/>

   <Container>
      <input className={classes.root} style={{marginTop:'20px'}} fullWidth  placeholder='SearchHere....' onChange={event => {setSearchTerm(event.target.value)}} />
   </Container>

       <Grid container m={0} justifyContent={'center'}>
        {basicData.filter((data)=>{
          if(searchTerm === ''){
            return data
          }else if(data.Fullname.toLowerCase().includes(searchTerm.toLowerCase())){
              return data
          }else{
            return console.log("hi");
          }
        }) 
        .map((data)=>(
            <div onClick={()=>{
                accessPlayerData(data._id)
                navigate("/allplayers/player")
              }}>
          <Grid mt={2} ml={2}>
          <Box sx={{direction:'revert'}} className='card1'>
    <div className='number'>{data.Rating}</div> 
    <div className='position'>{data.Position}</div>
    <div style={{backgroundImage:`url(${data.teamPic})`}} className='teamLogo'> </div> 
    <div style={{backgroundImage:`url(${data.playerDp})`}} className='playerDp'></div> 
    <div className='star'><Star star={data.star}/></div>  
    <p className={data.Name.length > 10 ? "pleyerNameLength" : data.Name.length <= 8 ? "pleyerNameLength1" : data.Name.length > 8 ?  "pleyerNameLength2" :'pleyerName'}>{data.Name}</p>
    <p className='playerBody'>{data.Height+`cm`} {data.Weight+`kg`} Age:{data.Age}</p>
    <div style={{backgroundImage:`url(${data.LeaguePic})`}} className='league'></div>
    <p className='Level'>Level</p>
    <p className='LevelCount'>15/15</p>
    <div style={{backgroundImage:`url(${data.nationalityPic})`}} className='country'></div>
    <div style={{backgroundImage:`url(${data.footPic})`}} className='foot'></div>
    <div className='curve'>
      <h1 className='rating'>{data.Form}</h1>
    </div>
    <div style={{backgroundImage:'url("https://www.linkpicture.com/q/Screenshot-2022-06-26-23050911.png")'}} className='eLogo'></div>
    </Box>
          </Grid>
          </div>  
      ))}  
       </Grid>
       <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  )
}

export default StanderdPlayer 