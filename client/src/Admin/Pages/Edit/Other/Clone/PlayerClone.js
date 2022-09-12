import { Box, Button, Container, Grid, List, Paper } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { PlayerState } from '../../../../../Context/PlayersProvider';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import  { Clone } from './CloneBasics';
import AdminStar from '../../../../Assets/AdminStar/Star';
import '../../Other/Trending/AdminTrending.css'




const useStyles = makeStyles({

  root:{
    backgroundColor:'white',
    borderRadius:'5px'
  }
    
  })


const PlayerClone = ({ setChange}) => {
  const classes = useStyles()
  const { basicData ,fetchPlayers} = PlayerState();
  const [searchTerm, setSearchTerm]= useState('')
  const [singlePlayer, setSinglePlayer] = useState([])
  const [page, setPage] = useState(false)

  useEffect(()=>{
    fetchPlayers()
    },[])

    const accessPlayerData =async(_id)=>{
     const data =await axios.get(`/api/admin/${_id}`,)
     setSinglePlayer(data.data);
     }

  return (
    <>
    <Button 
    onClick={()=>{  
      setChange(true)
    }} 
    color='primary' 
    variant='contained'
    sx={{marginTop:3,ml:3}}
    >Trending</Button> 
<Container>
<Container>
      <input className={classes.root} style={{marginTop:'20px'}} fullWidth  placeholder='SearchHere....' onChange={event => {setSearchTerm(event.target.value)}} />
   </Container>

      <Paper style={{maxHeight: 500, overflow: 'auto'}}>
        <List>
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
       <Grid mt={2} ml={2}>
        <div onClick={()=>{
            accessPlayerData(data._id)
            setPage(true)
        }}>  
        <Box sx={{direction:'revert'}}>
        <Box sx={{direction:'revert'}} className='card1'>
    <div className='number'>{data.Rating}</div> 
    <div className='position'>{data.Position}</div>
    <div style={{backgroundImage:`url(${data.teamPic})`}} className='teamLogo'> </div>
    <div style={{backgroundImage:`url(${data.playerDp})`}} className='playerDp'></div>
    <div className='star'><AdminStar star={data.star}/></div>
    <p className={data.Name.length > 10 ? "pleyerNameLength" : data.Name.length <= 8 ? "pleyerNameLength1" : data.Name.length > 8 ?  "pleyerNameLength2" :'pleyerName'}>{data.Name}</p>
    <p className='playerBody'>{data.Height+`cm`} {data.Weight+`kg`} Age:{data.Age}</p>
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
        </Box>
        </div>
       </Grid>
        ))}

    </Grid>
        </List>
      </Paper>
      </Container>
{page && <Clone singlePlayer={singlePlayer}/>}
    </>
  )
}

export default PlayerClone
