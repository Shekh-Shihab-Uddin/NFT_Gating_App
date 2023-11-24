// contracts/MyNFT.sol
// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyNFT is ERC721URIStorage, Ownable{
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("Shihab", "SSU") {

    }

//NFT mintin/creating
//tokenURI= we will get a link of the item that we will upload on IPFS or server
    function awardItem(address player, string memory tokenURI)
        public
        onlyOwner
        returns (uint256)
    {
        uint256 newItemId = _tokenIds.current();
        _mint(player, newItemId);
        _setTokenURI(newItemId, tokenURI);

        _tokenIds.increment();
        return newItemId;
    }
}

//Contract deployed to address: 0xeEDBC7c07eCBae6761d235F8Be50E03a074dFd20
//from address: 0xeCbc9da4d09A4a5059e6f119444e0CF04288F9ad