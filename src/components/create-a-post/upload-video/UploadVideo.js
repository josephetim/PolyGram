import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import VideocamIcon from '@mui/icons-material/Videocam';
import { NFTStorage, File } from 'nft.storage'
import { createRef } from 'react'
import { apiKey } from '../../../APIKEYS'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';

import './UploadVideo.css'
import {
  TextField,
  Container,
  StylesProvider,
  Typography,
  Button,
  IconButton,
  MenuItem,
} from '@material-ui/core'

function UploadVideo() {
  // Add variables
  const history = useHistory()
  const [video, setVideo] = useState('')
  const videoTypeRef = createRef()
  const [nftVideoName, setnftVideoName] = useState('')
  const [loading, setLoading] = useState(false)
  const [ownerName, setOwnerName] = useState('')
  const [videoName, setVideoName] = useState('')
  const [videoType, setVideoType] = useState('')
  const [disabled, setDisabled] = useState(true)
  const [videoNFTType, setVideoNFTType] = useState('')

 const handleVideo = (event) => {
  setVideo(event.target.files[0])
  setVideoName(event.target.files[0].name)
  setVideoType(event.target.files[0].type)
  setDisabled(false)
}

const handleSubmit = async (event) => {
  event.preventDefault()
  try {
    setLoading(true)
    const client = new NFTStorage({ token: apiKey })
    const metadata = await client.store({
      name: nftVideoName,
      description: `${ownerName}, ${videoNFTType}`,
      image: new File([video], videoName, { type: videoType }),
    })
    if (metadata) {
      history.push('/')
    }
  } catch (error) {
    console.log(error)
    setLoading(false)
  }
}

  return (
    <div className='upload-photo-container'>
    <Card  sx={{ maxWidth: 345}}>
    {
  video ? (
    <video width="340" height="240" controls>
       <source src={URL.createObjectURL(video)} alt="video" className="vid-preview" type="video/mp4"/>
      <source src={URL.createObjectURL(video)} alt="video" className="vid-preview" type="video/ogg"/>
      Your browser does not support the video tag.
      </video>
  ) : (
    <CardActionArea className='upload-card'>
    <VideocamIcon  sx={{ display: "flex"}} fontSize="large" id="flex"/>
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
       Upload A Video
      </Typography>
    </CardContent>
  </CardActionArea>
  )
}
<div className="form-container">
  <form className="form" noValidate autoComplete="off">
    <input
      accept="image/*"
      className="input"
      id="icon-button-photo"
      defaultValue={video}
      onChange={handleVideo}
      type="file"
    />
    <label htmlFor="icon-button-photo">
      <IconButton color="primary" component="span">
        <VideocamIcon />
      </IconButton>
    </label>
    <TextField
      fullWidth
      id="outlined-basic"
      label="NFT Video's name"
      variant="outlined"
      className="text-field"
      defaultValue={nftVideoName}
      onChange={(e) => setVideoName(e.target.value)}
    />
    <TextField
      fullWidth
      id="outlined-basic"
      label="Owner's name"
      variant="outlined"
      className="text-field"
      defaultValue={ownerName}
      onChange={(e) => setOwnerName(e.target.value)}
    />
    <TextField
      fullWidth
      name="videoType"
      select
      label="Choose one option"
      variant="outlined"
      className="text-field"
      onChange={(e) => setVideoNFTType(e.target.value)}
      defaultValue=""
      ref={videoTypeRef}
    >
      <MenuItem value="Nature">Nature</MenuItem>
      <MenuItem value="Sport">Sport</MenuItem>
      <MenuItem value="People">People</MenuItem>
      <MenuItem value="Animals">Animals</MenuItem>
      <MenuItem value="Other">Other</MenuItem>
    </TextField>
    <Button
    disabled ={disabled}
      size="large"
      variant="contained"
      color="primary"
      onClick={handleSubmit}
    >
      Submit
    </Button>
  </form>
</div>

    </Card>
    </div>
  )
}

export default UploadVideo
