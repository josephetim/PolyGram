import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import { NFTStorage, File } from 'nft.storage'
import { createRef } from 'react'
import { apiKey } from '../../../APIKEYS'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';

import './UploadPhoto.css'
import {
  TextField,
  Container,
  StylesProvider,
  Typography,
  Button,
  IconButton,
  MenuItem,
} from '@material-ui/core'

function UploadPhoto() {
  // Add variables
  const history = useHistory()
  const [image, setImage] = useState('')
  const imageTypeRef = createRef()
  const [nftPhotoName, setnftPhotoName] = useState('')
  const [loading, setLoading] = useState(false)
  const [ownerName, setOwnerName] = useState('')
  const [imageName, setImageName] = useState('')
  const [imageType, setImageType] = useState('')
  const [disabled, setDisabled] = useState(true)
  const [imageNFTType, setImageNFTType] = useState('')

 const handleImage = (event) => {
  setImage(event.target.files[0])
  setImageName(event.target.files[0].name)
  setImageType(event.target.files[0].type)
  setDisabled(false)
}

const handleSubmit = async (event) => {
  event.preventDefault()

  try {
    setLoading(true)

    const client = new NFTStorage({ token: apiKey })
    const metadata = await client.store({
      name: nftPhotoName,
      description: `${ownerName}, ${imageNFTType}`,
      image: new File([image], imageName, { type: imageType }),
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
  image ? (
    <img src={URL.createObjectURL(image)} alt="image" className="img-preview" />
  ) : (
    <CardActionArea className='upload-card'>
    <PhotoCamera  sx={{ display: "flex"}} fontSize="large" id="flex"/>
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
       Upload An Image
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
      defaultValue={image}
      onChange={handleImage}
      type="file"
    />
    <label htmlFor="icon-button-photo">
      <IconButton color="primary" component="span">
        <PhotoCamera />
      </IconButton>
    </label>
    <TextField
      fullWidth
      id="outlined-basic"
      label="NFT Image name"
      variant="outlined"
      className="text-field"
      defaultValue={nftPhotoName}
      onChange={(e) => setImageName(e.target.value)}
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
      name="imageType"
      select
      label="Choose one option"
      variant="outlined"
      className="text-field"
      onChange={(e) => setImageNFTType(e.target.value)}
      defaultValue=""
      ref={imageTypeRef}
    >
      <MenuItem value="Nature">Nature</MenuItem>
      <MenuItem value="Sport">Sport</MenuItem>
      <MenuItem value="People">People</MenuItem>
      <MenuItem value="Animals">Animals</MenuItem>
      <MenuItem value="Other">Other</MenuItem>
    </TextField>
    <Button
    disabled={disabled}
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

export default UploadPhoto
