import React, {useState} from 'react'
import Web3 from 'web3'
import PolyGram from './abis/PolyGram.json'
import  {Navbar}  from './components/page-layout/navbar/Navbar'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './components/home-components/home/Home'
import ImageDetails from './components/home-components/image-details/ImageDetails'
import UploadPhoto from './components/create-a-post/upload-image/UploadPhoto'
import UploadVideo from './components/create-a-post/upload-video/UploadVideo'
import ImageGallery from './components/home-components/image-gallery/ImageGallery'
import VideoGallery from './components/home-components/video-gallery/VideoGallery'
import VideoDetails from './components/home-components/video-details/VideoDetails'
import './App.css';

function App() {
  const [account, setAccount] = useState('')
const [contractData, setContractData] = useState('')

const loadWeb3 = async () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum)
    await window.ethereum.request({ method: 'eth_requestAccounts' })
  } else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider)
  } else {
    window.alert(
      'Non-Ethereum browser detected. You should consider trying Metamask!',
    )
  }
}

const getContract = async () => {
  const web3 = window.web3
  const accounts = await web3.eth.getAccounts()
  setAccount(accounts[0])
  const networkId = await web3.eth.net.getId()
  const networkData = PolyGram.networks[networkId]

  if (networkData) {
    const abi = PolyGram.abi
    const address = PolyGram.networks[networkId].address
    const myContract = new web3.eth.Contract(abi, address)
    setContractData(myContract)
  } else {
    window.alert(
      'Contract is not deployed to the detected network. Connect to the correct network!',
    )
  }
}

const connectWallet = async () => {
  await loadWeb3()
  await getContract()
}

  return (
    <Router>
      <div>
        <Navbar account={account} connectWallet={connectWallet}/>
        <Route exact path="/" component={Home} />

        <Switch>
          <Route exact path="/upload-image" component={UploadPhoto} />
          <Route exact path="/upload-video" component={UploadVideo} />
          <Route exact path="/image-gallery" component={ImageGallery} />
          <Route exact path="/video-gallery" component={VideoGallery} />
          <Route path="/image-details/:imageId">

            <ImageDetails account={account} contractData={contractData}/>
          </Route>
          <Route path="/video-details/:videoId">
            <VideoDetails account={account} contractData={contractData}/>
          </Route>
        </Switch>
      </div>
    </Router>

  );
}

export default App;
