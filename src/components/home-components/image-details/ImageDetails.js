import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'
import { apiKey } from '../../../APIKEYS'
import placeholderImageAssets from '../assets/Imageassets'
import {
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  IconButton,
  Grid,
  Container,
  Typography,
  Button,
  Card,
  StylesProvider,
} from '@material-ui/core'
import './ImageDetails.css'


function ImageDetails({ account, contractData }) {
  const { imageId } = useParams()
  // Add state variables
  const [image, setImage] = useState('')
  const [imageName, setImageName] = useState('')
  const [imageOwnerName, setImageOwnerName] = useState('')
  const [imageCategory, setImageCategory] = useState('')
  const [input, setInput] = useState('')
  const [comment, setComment] = useState('')
  const [codeHash, setCodeHash] = useState('')


  useEffect(() => {
    if (imageId) {
      const getMetadata = async () => {
          setImage(placeholderImageAssets[parseInt(imageId)-1].image)
          setImageName(placeholderImageAssets[parseInt(imageId)].name)
          setImageOwnerName(placeholderImageAssets[parseInt(imageId)].description)
          setImageCategory(placeholderImageAssets[parseInt(imageId)].name)
      }
      getMetadata()
      getImage()
    }
  }, [imageId, contractData])

  const getImage = (ipfsURL) => {
  if (!ipfsURL) return
  ipfsURL = ipfsURL.split('://')
  return 'https://ipfs.io/ipfs/' + ipfsURL[1]
}


const mintNFT = async (imageId) => {
  try {
    const data = await contractData.methods
      .mintImageNFT(`https://${imageId}`)
      .send({ from: account })

    setCodeHash(data)
  } catch (err) {
    console.error(err)
  }
}

const handleChange = (event) => {
  setInput(event.target.value)
}

const handleSubmit = (event) => {
  event.preventDefault()
  setComment(input)
  setInput('')
}



  return (
    <StylesProvider injectFirst>
      <Container
        className="root-image-details"
        style={{ minHeight: '50vh', paddingBottom: '3rem' }}
      >
        <div className="">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} className="grid-container">
              <div className="flex-container">
  <h2>{`${imageName} the ${imageCategory}`}</h2>
</div>

<img className="img" src={image} alt="pet" />
<div className="flex-container">
  <div>
    <IconButton aria-label="add to favorites">
      <FavoriteIcon />
    </IconButton>

    <IconButton aria-label="share">
      <ShareIcon />
    </IconButton>
  </div>

  <Typography variant="body1" color="primary">
    0 Likes
  </Typography>
</div>

<Typography gutterBottom variant="subtitle1" className="details-text">
  Image's Details
</Typography>

<Typography variant="body2" gutterBottom className="details-text">
  Full rights and credits to the owner @{imageOwnerName}...
</Typography>




              
            </Grid>

            <Grid item xs={12} sm={6}>
              {/*Add Transaction Confirmation: */}
              {
  codeHash ? (
    <Card className="code-hash">
      <Typography gutterBottom variant="subtitle1">
        Confirmation Transaction:
      </Typography>
      <p>
        TransactionHash: <span>{codeHash.transactionHash}</span>{' '}
      </p>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={'https://mumbai.polygonscan.com/tx/' + codeHash.transactionHash}
      >
        <Button variant="contained" color="primary" className="wallet-btn">
          See transaction
        </Button>
      </a>
    </Card>
  ) : (
    ''
  )
}

              {/* Add form */}
              <form noValidate autoComplete="off">
  <TextField
    id="outlined-basic"
    label="Comment"
    variant="outlined"
    value={input}
    onChange={handleChange}
    className="text-field"
  />
</form>
<Button type="submit" variant="contained" onClick={handleSubmit}>
  Add comment
</Button>

              {/* Display comments  */}
              {
  comment ? (
    <ListItem style={{ paddingLeft: '0px' }}>
      <ListItemAvatar>
        <Avatar alt="Remy Sharp" />
      </ListItemAvatar>
      <ListItemText
        secondary={
          <React.Fragment>
            <Typography
              component="span"
              variant="body2"
              className="inline"
              color="textPrimary"
            >
              {account}:
            </Typography>
            {` ${comment}`}
          </React.Fragment>
        }
      />
    </ListItem>
  ) : (
    <h2>No comments</h2>
  )
}
            </Grid>
          </Grid>
        </div>
      </Container>
    </StylesProvider>
  )
}

export default ImageDetails
