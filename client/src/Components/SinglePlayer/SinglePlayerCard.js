import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminStar from '../../Admin/Assets/AdminStar/Star'
import { PlayerState } from '../../Context/PlayersProvider'
import "./SinglePlayerCard.css"

const SinglePlayerCard = () => {
  const { accessPlayerData,updatePlayer,FetchPlayerData} = PlayerState();

  var playerLength = ''
  playerLength = (`${updatePlayer.Name}`.length); 


  const navigate = useNavigate()

  var star = ''
  if(updatePlayer.star){
    star = updatePlayer.star
  }else{
    star = "4"
  }

  useEffect(()=>{
    FetchPlayerData()
    },[])

  return (
    <> 
    <div onClick={()=>{
      accessPlayerData(updatePlayer._id)
      navigate("/allplayers/player")
    }}>
      <div className='card1'> 
    <div className='number'>{updatePlayer.Rating}</div> 
    <div className='position'>GK</div>
    <div style={{backgroundImage:'url("https://www.linkpicture.com/q/Lillestrom-1-12.png")'}} className='teamLogo'> </div>
    <div style={{backgroundImage:`url(${updatePlayer.playerDp})`}} className='playerDp'></div>
    <div className='star'><AdminStar star={star}/></div>
    <p className={playerLength > 10 ? "pleyerNameLength" : playerLength <= 8 ? "pleyerNameLength1" : playerLength > 8 ?  "pleyerNameLength2" :'pleyerName'}>{updatePlayer.Name}</p>
    <p className='playerBody'>188cm 87kg Age:28</p>
    <div style={{backgroundImage:'url("https://www.linkpicture.com/q/emb_11-removebg-preview1.png")'}} className='league'></div>
    <p className='Level'>Level</p>
    <p className='LevelCount'>15/15</p>
    <div style={{backgroundImage:'url("https://www.linkpicture.com/q/p2_13.png")'}} className='country'></div>
    <div style={{backgroundImage:'url("https://www.linkpicture.com/q/E.Haaland3.jpg")'}} className='foot'></div>
    <div className='curve'>
      <h1 className='rating'>B</h1>
    </div>
    <div style={{backgroundImage:'url("https://www.linkpicture.com/q/Screenshot-2022-06-26-23050911.png")'}} className='eLogo'></div>
    </div>
    </div>
    </>
  )
}

export default SinglePlayerCard
