import "chai";

import { ethers } from "hardhat";
import { expect } from "chai";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { MyToken } from "../typechain-types";
import { parse } from "path";

// Start with a describe block to group your tests
describe("MyToken", function () {
  // Declare some variables to use in your tests
  let myToken: MyToken;
  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;
  let minter: SignerWithAddress;

  // Use a beforeEach block to set up your tests
  beforeEach(async function () {
    // Deploy a new instance of the MyToken contract
    [owner, addr1, addr2, minter] = await ethers.getSigners();
    const MyToken = await ethers.getContractFactory("MyToken");
    myToken = await MyToken.deploy();
    myToken.grantRole(myToken.MINTER_ROLE(), minter.address);

    // Mint some tokens to the contract owner
    await myToken.mint(owner.address, 100, 1);
    await myToken.mint(owner.address, 200, 1);
    await myToken.mint(addr2.address, 100, 1);
  });

  
  it("should be able to buy tokens", async function () {
    // Mint some tokens to the fromAccount


    // Call the buyFraction function with the correct amount of funds
    const amount = 2;
    const id =3
    const pricePerFraction = await myToken.getPricePerFraction(3, addr2.address);
    const value = amount * parseInt(pricePerFraction.toString());
    const addr1Balance = await addr1.getBalance();
    const buy =  myToken.connect(addr1).buyFraction(amount, id, addr2.address, { value: value, gasLimit: 3e5 });
    expect(buy).to.emit(myToken, "TransferSingle").withArgs(myToken.address, addr2.address, addr1.address, 3, amount);
    await buy.catch(e => console.log(e));


  });

  it("should revert if not enough funds are sent", async function () {

    // Call the buyFraction function with the correct amount of funds
    const amount = 10;
    const id =1
    const pricePerFraction = await myToken.getPricePerFraction(3, addr2.address);
    const value = (amount * parseInt(pricePerFraction.toString())) - 1;
    await expect(myToken.connect(addr1).buyFraction(amount, id, addr2.address, { value: value })).to.be.revertedWith('Not enough funds sent');

  });



  it("should revert if not enough tokens are available", async function () {
      
      const amount = 1000;
      const id =1
      const pricePerFraction = await myToken.getPricePerFraction(3, addr2.address);
      const value = amount * parseInt(pricePerFraction.toString());
      await expect(myToken.connect(addr1).buyFraction(amount, id, addr2.address, { value: value })).to.be.revertedWith('ERC1155: insufficient balance for transfer');
  
  });

  // Write a test to check that the contract owner can set the URI
  it("should allow the contract owner to set the URI", async function () {
    // Call the setURI function with a new URI
    await myToken.connect(owner).setURI("ipfs://new-uri");

    // Check that the URI was updated
    const uri = await myToken.uri(1);
    expect(uri).to.equal("ipfs://new-uri");
  });

  // Write a test to check that a non-owner cannot set the URI
  it("should not allow a non-owner to set the URI", async function () {
    // Call the setURI function with a new URI from a non-owner address
    await expect(myToken.connect(addr1).setURI("ipfs://new-uri")).to.be.revertedWith(
      `AccessControl: account ${addr1.address.toLowerCase()} is missing role 0x7804d923f43a17d325d77e781528e0793b2edd9890ab45fc64efd7b4b427744c`,
    );

    // Check that the URI was not updated
    const uri = await myToken.uri(1);
    expect(uri).to.equal("ipfs://{id}");
  });

  // Write a test to check that a user can transfer tokens to another user
  it("should allow a user to transfer tokens to another user", async function () {
    // Get the balance of the contract owner before the transfer
    const balanceBefore = await myToken.balanceOf(owner.address, 1);

    // Transfer a token from the contract owner to addr1
    await myToken.safeTransferFrom(owner.address, addr1.address, 1, 1, [], { gasLimit: 3e7 });

    // Get the balance of the contract owner after the transfer
    const balanceAfter = await myToken.balanceOf(owner.address, 1);

    // Check that the balance was updated correctly
    expect(balanceBefore).to.equal(100);
    expect(balanceAfter).to.equal(99);

    // Check that the balance of addr1 was updated correctly
    const addr1Balance = await myToken.balanceOf(addr1.address, 1);
    expect(addr1Balance).to.equal(1);
  });
  it("should should not allow an unauthorized user to transfer tokens to another user", async function () {
    // Get the balance of the contract owner before the transfer
    const balanceBefore = await myToken.balanceOf(owner.address, 1);

    // Transfer a token from the contract owner to addr1
    await expect(
      myToken.connect(addr1).safeTransferFrom(owner.address, addr1.address, 1, 1, [], { gasLimit: 3e7 }),
    ).to.be.revertedWith(`ERC1155: caller is not token owner or approved`);

    // Get the balance of the contract owner after the transfer
    const balanceAfter = await myToken.balanceOf(owner.address, 1);

    // Check that the balance was updated correctly
    expect(balanceBefore).to.equal(100);
    expect(balanceAfter).to.equal(100);

    // Check that the balance of addr1 was updated correctly
    const addr1Balance = await myToken.balanceOf(addr1.address, 1);
    expect(addr1Balance).to.equal(0);
  });

  it("should not allow an unauthorized user to pause the contract", async function () {
    // Get the balance of the contract owner before the transfer
    const balanceBefore = await myToken.balanceOf(owner.address, 1);

    // Transfer a token from the contract owner to addr1
    await expect(myToken.connect(addr1).pause()).to.be.revertedWith(
      `AccessControl: account ${addr1.address.toLowerCase()} is missing role 0x65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a`,
    );

    // Get the balance of the contract owner after the transfer
    const balanceAfter = await myToken.balanceOf(owner.address, 1);

    // Check that the balance was updated correctly
    expect(balanceBefore).to.equal(100);
    expect(balanceAfter).to.equal(100);

    // Check that the balance of addr1 was updated correctly
    const addr1Balance = await myToken.balanceOf(addr1.address, 1);
    expect(addr1Balance).to.equal(0);
  });
  it("should not allow an unauthorized user to unpause the contract", async function () {
    // Transfer a token from the contract owner to addr1
    await expect(myToken.connect(addr1).unpause()).to.be.revertedWith(
      `AccessControl: account ${addr1.address.toLowerCase()} is missing role 0x65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a`,
    );
  });

  it("should allow the contract owner to pause the contract", async function () {
    // Get the balance of the contract owner before the transfer

    // Transfer a token from the contract owner to addr1
    const pause = await myToken.pause();

    expect(pause).to.emit(myToken, "Paused").withArgs(owner.address);
    expect(
      myToken.connect(owner).safeTransferFrom(owner.address, addr1.address, 1, 1, [], { gasLimit: 3e7 }),
    ).to.be.revertedWith("Pausable: paused");
  });

  it("should allow the contract owner to unpause the contract", async function () {
    // Get the balance of the contract owner before the transfer
    // console.log("balanceBefore", balanceBefore)

    // await myToken.getRoleAdmin(role)
    await myToken.pause();
    const tryTransfer = myToken
      .connect(owner)
      .safeTransferFrom(owner.address, addr1.address, 1, 1, [], { gasLimit: 3e7 });
    expect(tryTransfer).to.be.revertedWith("Pausable: paused");
    await tryTransfer.catch(e => e);
    // console.log("balanceRightAfterPause", await myToken.balanceOf(owner.address, 1))
    await myToken.unpause();
    // console.log("balanceAfterUnpause", await myToken.balanceOf(owner.address, 1))

    // expect(unpause).to.emit(myToken, "Unpaused").withArgs(owner.address);
    await myToken.connect(owner).safeTransferFrom(owner.address, addr1.address, 1, 1, [], { gasLimit: 3e7 });
    const balanceAfter = await myToken.balanceOf(owner.address, 1);

    // Check that the balance was updated correctly
    // expect(balanceBefore).to.equal(100);
    expect(balanceAfter).to.equal(99);
  });

  it("should mint multiple tokens to a recipient", async function () {
    // Mint two tokens to the recipient
    const to = addr1.address;
    const amounts = [10, 20];
    await myToken.connect(minter).mintBatch(to, amounts, 10);
    // Check that the recipient has the correct balances
    const balance1 = await myToken.balanceOf(to, 4);
    const balance2 = await myToken.balanceOf(to, 5);
    expect(balance1).to.equal(10);
    expect(balance2).to.equal(20);
  });

  it("should not allow a non-minter to mint batch tokens", async function () {
    // Try to mint a token from a non-minter address
    const to = addr1.address;
    const amounts = [10];
    await expect(myToken.connect(addr1).mintBatch(to, amounts, 10)).to.be.revertedWith(
      "AccessControl: account " + addr1.address.toLowerCase() + " is missing role " + (await myToken.MINTER_ROLE()),
    );

    // Check that the token was not minted
    const balance = await myToken.balanceOf(to, 1);
    expect(balance).to.equal(0);
  });
  it("should not allow a non-minter to mint btokens", async function () {
    // Try to mint a token from a non-minter address
    const to = addr1.address;
    const amount = 10;
    await expect(myToken.connect(addr1).mint(to, amount, 10)).to.be.revertedWith(
      "AccessControl: account " + addr1.address.toLowerCase() + " is missing role " + (await myToken.MINTER_ROLE()),
    );

    // Check that the token was not minted
    const balance = await myToken.balanceOf(to, 1);
    expect(balance).to.equal(0);
  });

  it("should support ERC165 and ERC1155 interfaces", async function () {
    // Check that the contract supports the ERC165 and ERC1155 interfaces
    const supportsERC165 = await myToken.supportsInterface("0x01ffc9a7");
    const supportsERC1155 = await myToken.supportsInterface("0xd9b67a26");
    expect(supportsERC165).to.equal(true);
    expect(supportsERC1155).to.equal(true);
  });

  it("should not support other interfaces", async function () {
    // Check that the contract does not support an arbitrary interface
    const supportsOther = await myToken.supportsInterface("0x12345678");
    expect(supportsOther).to.equal(false);
  });




});
