import React, { useEffect, useState } from 'react'
import CircularStatic from '../../shared/CircularProgressLabelledComponent'
import ImageListItem from '@material-ui/core/ImageListItem'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import ImageListItemBar from '@material-ui/core/ImageListItemBar'
import { Grid } from '@material-ui/core'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { apiKey } from '../../../APIKEYS'
import { Link } from 'react-router-dom'
import './VideoGallery.css'
import placeholderVideoAssets from '../assets/VideoAssets'



function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function VideoGallery() {
  const [videoData, setVideoData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const loadNftVideo = async () => {
      try {
        setLoading(true)
        let cids = await fetch('https://api.nft.storage', {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        })
        cids = await cids.json()
        const temp = []
        for (let cid of cids.value) {
          if (cid?.cid) {
            let data = await fetch(
              `https://ipfs.io/ipfs/${cid.cid}/metadata.json`,
            )
            data = await data.json()

            const getVideo = (ipfsURL) => {
              if (!ipfsURL) return
              ipfsURL = ipfsURL.split('://')
              return 'https://ipfs.io/ipfs/' + ipfsURL[1]
            }

            data.image = await getVideo(data.image)
            data.cid = cid.cid
            data.created = cid.created
            temp.push(data)
          }
        }
        setVideoData(temp)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
    loadNftVideo()
  }, [])
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div style={{ minHeight: '70vh', paddingBottom: '3rem' }}>
      <Typography ml={2} variant='h4'>Videos</Typography>
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Latest Uploads" {...a11yProps(0)} />
          <Tab label="Last Week" {...a11yProps(1)} />
          <Tab label="All Time" {...a11yProps(2)} />
          <Tab label="Trending" {...a11yProps(3)} />
        </Tabs>
      </Box>
      {
  loading ? (
    <CircularStatic />
  ) : (
    <div style={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        {videoData.length ? (
          videoData.map((nftVideo, index) => (
            <Grid item xs={6} sm={3} key={index}>
              <ImageListItem style={{ height: '450px', listStyle: 'none' }}>
              <video width="320" height="400" controls>
                <source src={nftVideo.video}  type="video/mp4"/>
                <source src={nftVideo.video} type="video/ogg"/>
                Your browser does not support the video tag.
              </video>
                <ImageListItemBar
                  title={nftVideo.name}
                  subtitle={<span>by: {nftVideo.description}</span>}
                  actionIcon={
                    <IconButton
                      aria-label={`info about ${nftVideo.name}`}
                      className="icon"
                    >
                      <Button
                        variant="contained"
                        size="small"
                        component={Link}
                        to={`/video-details/${nftVideo.cid}`}
                        className="view-btn"
                      >
                        View
                      </Button>
                    </IconButton>
                  }
                />
              </ImageListItem>
            </Grid>
          ))
        ) : (
          // <h2 style={{marginLeft: "20px"}}>No Video Yet...</h2>
          placeholderVideoAssets.map((nftVideo, index) => (
            <Grid item xs={6} sm={3} key={index}>
              <ImageListItem style={{ height: '450px', listStyle: 'none' }}>
              <video width="320" height="400" controls>
                <source src={nftVideo.video}  type="video/mp4"/>
                <source src={nftVideo.video} type="video/ogg"/>
                Your browser does not support the video tag.
              </video>
                <ImageListItemBar
                  title={nftVideo.name}
                  subtitle={<span>by: {nftVideo.description}</span>}
                  actionIcon={
                    <IconButton
                      aria-label={`info about ${nftVideo.name}`}
                      className="icon"
                    >
                      <Button
                        variant="contained"
                        size="small"
                        component={Link}
                        to={`/image-details/${nftVideo.cid}`}
                        className="view-btn"
                      >
                        View
                      </Button>
                    </IconButton>
                  }
                />
              </ImageListItem>
            </Grid>
          )
          )
        )}
      </Grid>
    </div>
  )
}
    </Box>
    </div>
  );
}




