import {  Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import AdminStar from '../AdminStar/Star';
import './TrendPlayers.css'

const TrendPlayers = () => {

  const [trendingPlayers, setTrendingPlayers] = useState([])

  const getTrends =async () =>{
    const data = await axios.get('/api/trending/')
    setTrendingPlayers(data.data)
  }

  useEffect(()=>{
    getTrends()
  })
  const accessPlayerData =async(_id)=>{
    axios.put('/api/trending/removeTrending',{_id})
   }

  return (
    <>
      <Box position={'relative'} top={10} bgcolor={'#ebeeef'} mt={2}>
    <Typography ml={3.5} fontFamily={'monospace'} fontSize={'30px'} fontWeight={600}>TRENDING</Typography>
  </Box>
    <Stack  sx={{ 
  padding: '16px 16px 32px',
  backgroundColor: '#ebeeef',
  borderRadius: '4px', 
  overflowX:'scroll',
  overflowY:'hidden'
}}
direction={'row'}
     >

<Box display={'flex'}  whiteSpace={'nowrap'}>
{trendingPlayers.map((data)=>(

  <div onClick={()=>{
     accessPlayerData(data._id)
  }}>
<Box sx={{direction:'revert'}} className='card1'>
    <div className='number'>{data.Rating}</div> 
    <div className='position'>{data.Position}</div>
    <div style={{backgroundImage:`url(${data.teamPic})`}} className='teamLogo'> </div>
    <div style={{backgroundImage:`url(${data.playerDp})`}} className='playerDp'></div>
    <div className='star'><AdminStar star={data.star}/></div>
    <p className={data.Name.length > 10 ? "pleyerNameLength" : data.Name.length <= 8 ? "pleyerNameLength1" : data.Name.length > 8 ?  "pleyerNameLength2" :'pleyerName'}>{data.Name}</p>
    <p className='playerBody'>{data.Height+`cm`} {data.Weight+`kg`} Age:{data.Age}</p>
    <div style={{backgroundImage:`url(${data.LeaguePic})`}}  className='league'></div>
    <p className='Level'>Level</p>
    <p className='LevelCount'>15/15</p>
    <div style={{backgroundImage:`url(${data.nationalityPic})`}} className='country'></div>
    <div style={{backgroundImage:`url(${data.footPic})`}} className='foot'></div>
    <div className='curve'>
      <h1 className='rating'>{data.Form}</h1>
    </div>
    <div style={{backgroundImage:'url("https://www.linkpicture.com/q/Screenshot-2022-06-26-23050911.png")'}} className='eLogo'></div>
    </Box>
    </div>
    ))}
    </Box>
</Stack>
</>

  )
}

export default TrendPlayers

