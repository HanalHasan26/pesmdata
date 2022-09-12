import { Box, Container, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { PlayerState } from '../../../../Context/PlayersProvider';
import AdminStar from '../../../Assets/AdminStar/Star';
import "./DeletePlayers.css"
import DeleteModel from '../../../Assets/DeleteModel/DeleteModel';
import AdminNavBar from '../../../Components/NavBar/AdminNavBar';

const useStyles = makeStyles({

  root:{
    backgroundColor:'white',
    borderRadius:'5px'
  }
    
  })


const DeletePlayer = () => {
  const classes = useStyles()
    const { basicData ,fetchPlayers,singlePlayer,setSinglePlayer } = PlayerState();
    const [searchTerm, setSearchTerm]= useState('')

    const accessPlayerData =async(_id)=>{
      const playerData = await axios.get(`/api/admin/${_id}`)
      setSinglePlayer(playerData.data) 
     }

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => setOpen(false);

useEffect(()=>{
    fetchPlayers();
})


  return (
    <>
    <AdminNavBar/>

{singlePlayer && <DeleteModel open = {open} setOpen={setOpen} singlePlayer={singlePlayer} handleClose={handleClose} />}
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
            return data
          }
        })
      .map((data)=>(
       <div onClick={()=>{
        accessPlayerData(data._id)
        handleOpen()  
       }}>
       <Grid mt={2} ml={2}>
       <Box sx={{direction:'revert'}} className='card1'>
 <div className='number'>{data.Rating}</div> 
 <div className='position'>{data.Position}</div>
 <div style={{backgroundImage:`url(${data.teamPic})`}} className='teamLogo'> </div>
 <div style={{backgroundImage:`url(${data.playerDp})`}} className='playerDp'></div>
 <div className='star'><AdminStar star={data.star}/></div>
 <p className={data.Name.length > 10 ? "pleyerNameLength" : data.Name.length <= 8 ? "pleyerNameLength1" : data.Name.length > 8 ?  "pleyerNameLength2" :'pleyerName'}>{data.Name}</p>
 <p className='playerBody'>188cm 87kg Age:28</p>
 <div style={{backgroundImage:`url(${data.LeaguePic})`}} className='league'></div>
 <p className='Level'>Level</p>
 <p className='LevelCount'>15/15</p>
 <div style={{backgroundImage:`url(${data.nationalityPic})`}} className='country'></div>
 <div style={{backgroundImage:`url(${data.footPic})`}} className='foot'></div>
 <div className='curve'>
   <h1 className='rating'>{data.Condition}</h1>
 </div>
 <div style={{backgroundImage:'url("https://www.linkpicture.com/q/Screenshot-2022-06-26-23050911.png")'}} className='eLogo'></div>
 </Box>
       </Grid>  
   </div>
   ))}  
   </Grid>
     
  </>
) 
}

export default DeletePlayer
