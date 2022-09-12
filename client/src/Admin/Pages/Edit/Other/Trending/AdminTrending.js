import { Box, Button, Container, Grid, List, Paper } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { PlayerState } from '../../../../../Context/PlayersProvider'
import TrendPlayers from '../../../../Assets/AddedTrend/TrendPlayers'
import { makeStyles } from '@mui/styles';
import AdminStar from '../../../../Assets/AdminStar/Star'
import axios from 'axios'
import PlayerClone from '../Clone/PlayerClone'
import AdminFooter from '../../../../Components/Body/Footer'
import './AdminTrending.css'


const useStyles = makeStyles({

  root:{
    backgroundColor:'white',
    borderRadius:'5px'
  }
    
  })

const AdminTrending = ({change,setChange}) => {
  const classes = useStyles()
const { basicData ,fetchPlayers} = PlayerState();
const [searchTerm, setSearchTerm]= useState('')

useEffect(()=>{
  fetchPlayers()
  },[])

  const accessPlayerData =async(_id)=>{
    axios.put('/api/trending/',{_id})
   }

  return (
    <>
    <Button 
    onClick={()=>{
      setChange(false)
    }}
    color='primary' 
    variant='contained'
    sx={{marginTop:3,ml:3}}
    >PlayerClone</Button> 
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
          }else if(data.Name.toLowerCase().includes(searchTerm.toLowerCase())){
              return data
          }else{
            return data
          }
        }) 
        .map((data)=>(
       <Grid mt={2} ml={2}>
        <div onClick={()=>{
            accessPlayerData(data._id)
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
     <TrendPlayers/>
     <AdminFooter/>
    </>
  )
}

export default AdminTrending


export const TrendingClone = ()=>{

  const [change, setChange] = useState(true)
  
  return( 
  <>
  {change ? <AdminTrending change={change} setChange={setChange} /> : <PlayerClone change={change} setChange={setChange}/>}
  </>
  )
  
  }