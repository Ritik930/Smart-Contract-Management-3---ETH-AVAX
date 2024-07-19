// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Assessment {
    address payable public owner;
    uint256 public balance;
    uint256 public interestRate; // New state variable for interest rate
    uint256 public lastTransactionTime;

    event Deposit(uint256 amount);
    event Withdraw(uint256 amount);
    event Transfer(address indexed from, address indexed to, uint256 amount);
    event InterestRateChanged(uint256 newRate);

    constructor(uint256 initBalance) payable {
        owner = payable(msg.sender);
        balance = initBalance;
        interestRate = 5; // Default interest rate
        lastTransactionTime = block.timestamp;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "You are not the owner of this account");
        _;
    }

    function getBalance() public view returns (uint256) {
        return balance;
    }

    function checkLastTransaction() public view returns (uint256) {
        return lastTransactionTime;
    }

    function getInterestRate() public view returns (uint256) {
        return interestRate;
    }

    function deposit() public payable onlyOwner {
        uint256 _previousBalance = balance;
        balance += msg.value;
        assert(balance == _previousBalance + msg.value);
        lastTransactionTime = block.timestamp;
        emit Deposit(msg.value);
    }

    error InsufficientBalance(uint256 balance, uint256 withdrawAmount);

    function withdraw(uint256 _withdrawAmount) public onlyOwner {
        uint256 _previousBalance = balance;
        if (balance < _withdrawAmount) {
            revert InsufficientBalance({
                balance: balance,
                withdrawAmount: _withdrawAmount
            });
        }
        balance -= _withdrawAmount;
        payable(msg.sender).transfer(_withdrawAmount);
        assert(balance == (_previousBalance - _withdrawAmount));
        lastTransactionTime = block.timestamp;
        emit Withdraw(_withdrawAmount);
    }

    function transfer(address payable _to, uint256 _amount) public onlyOwner {
        uint256 _previousBalance = balance;
        if (balance < _amount) {
            revert InsufficientBalance({
                balance: balance,
                withdrawAmount: _amount
            });
        }
        balance -= _amount;
        _to.transfer(_amount);
        assert(balance == (_previousBalance - _amount));
        lastTransactionTime = block.timestamp;
        emit Transfer(msg.sender, _to, _amount);
    }

    function setOwner(address payable newOwner) public onlyOwner {
        owner = newOwner;
    }

    function setInterestRate(uint256 newRate) public onlyOwner {
        interestRate = newRate;
        emit InterestRateChanged(newRate);
    }

    function getTransactionHistory() public pure returns (string memory) {
    // Placeholder for transaction history logic
    return "Transaction history feature to be implemented";
}


    // Fallback function to handle unknown calls
    fallback() external {
        revert("Function does not exist");
    }
}
