// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract VolcanoCoin is ERC20, Ownable {
    mapping(address => Payment[]) public transferred;

    struct Payment {
        uint256 amount;
        address recipient;
    }

    constructor() ERC20("Volcano", "VOL") {
        _mint(msg.sender, 10000);
    }

    function increaseSupply(uint256 amount) public onlyOwner {
        _mint(msg.sender, amount);
    }

    function transfer(address to, uint256 amount)
        public
        override
        returns (bool)
    {
        address owner = _msgSender();
        _transfer(owner, to, amount);
        recordPayment(owner, to, amount);
        return true;
    }

    function recordPayment(
        address _sender,
        address _receiver,
        uint256 _amount
    ) internal {
        Payment memory newPayment = Payment({
            amount: _amount,
            recipient: _receiver
        });
        transferred[_sender].push(newPayment);
    }

    function getTransfers(address from) public view returns (Payment[] memory) {
        return transferred[from];
    }
}
