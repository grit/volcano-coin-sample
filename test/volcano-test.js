const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('VolcanoCoin contract', function () {
  let VolcanoCoin;
  let volcanoCoin;
  let owner;
  let addr1;

  beforeEach(async function () {
    VolcanoCoin = await ethers.getContractFactory('VolcanoCoin');
    [owner, addr1] = await ethers.getSigners();
    volcanoCoin = await VolcanoCoin.deploy();
  });

  describe('Deployment', function () {
    it('Should set the right owner', async function () {
      expect(await volcanoCoin.owner()).to.equal(owner.address);
    });

    it('Should mint a total initial supply of 10000 tokens', async function () {
      expect(await volcanoCoin.totalSupply()).to.equal(10000);
    });

    it('Should assign the total supply of tokens to the owner', async function () {
      const ownerBalance = await volcanoCoin.balanceOf(owner.address);
      expect(await volcanoCoin.totalSupply()).to.equal(ownerBalance);
    });
  });

  describe('Supply Increase', function () {
    it('Should allow for total token supply to be increased', async function () {
      await volcanoCoin.increaseSupply(5000);
      expect(await volcanoCoin.totalSupply()).to.equal(15000);
    });

    it('Should revert if totalSupply() is called by non-owner', async function () {
      await expect(
        volcanoCoin.connect(addr1).increaseSupply(5000)
      ).to.be.revertedWith('Ownable: caller is not the owner');
    });
  });
});
