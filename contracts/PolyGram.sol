//SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.9.0;
import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract PolyGram is ERC721 {

   constructor() ERC721("PolyGram", "PGM") public {}

   event PolyGramNFTCreated(
      uint tokenId,
      string imageURL,
      uint date,
      address payable from
   );
      function mintPolyGramNFT(string memory _tokenURI) external {
       uint _tokenId = totalSupply().add(1);
       _setTokenURI(_tokenId, _tokenURI);
         _safeMint(msg.sender, _tokenId);
       emit PolyGramNFTCreated(_tokenId, _tokenURI, now, msg.sender);
    }

}