// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";


contract MyToken is ERC1155, AccessControl, Pausable, ERC1155Burnable {
    bytes32 public constant URI_SETTER_ROLE = keccak256("URI_SETTER_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    uint256 public id = 0;
    mapping(uint256 => mapping(address => uint256)) public pricesPerFraction;


    constructor() ERC1155("ipfs://{id}") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(URI_SETTER_ROLE, msg.sender);
        _grantRole(PAUSER_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
    }

    function setURI(string memory newuri) public onlyRole(URI_SETTER_ROLE) {
        _setURI(newuri);
    }

    function pause() public onlyRole(PAUSER_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(PAUSER_ROLE) {
        _unpause();
    }

    function getPricePerFraction(uint256 _id, address account) public view returns (uint256) {
        return pricesPerFraction[_id][account];
    }

    function mint(address account, uint256 amount, uint256 pricePerFraction)
        public
        onlyRole(MINTER_ROLE) returns (uint256)
    {
        _setApprovalForAll(address(this), account, true);
        _mint(account, ++id, amount, "");
        pricesPerFraction[id][account] = pricePerFraction;
        return id;
    }

    function mintBatch(address to, uint256[] memory amounts, uint256 pricePerFraction)
        public
        onlyRole(MINTER_ROLE)
    {
        uint256[] memory ids = new uint256[](amounts.length);
        for (uint i = 0; i < ids.length; i++) {
            ids[i] = ++id;
            pricesPerFraction[id][to] = pricePerFraction;
        }
        _setApprovalForAll(address(this), to, true);
        _mintBatch(to, ids, amounts, "");
    }

    //function to buy fractions of a listed nft
    function buyFraction(uint256 amount, uint256 _id, address fromAccount)
        public
        payable
    {
        require(msg.value >= amount * pricesPerFraction[id][fromAccount], "Not enough funds sent");

        (bool success, ) = fromAccount.call{value: msg.value}("");
        _safeTransferFrom(fromAccount, msg.sender, _id, amount, "");
    }

    function _beforeTokenTransfer(address operator, address from, address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        internal
        whenNotPaused
        override
    {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }

    // The following functions are overrides required by Solidity.

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC1155, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}