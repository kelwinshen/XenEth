// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract XenEth {
    // Admin address
    address public admin;
    
    // Struct to hold user information
    struct User {
        string name;
        address userAddress;
    }

    // Struct to hold donation information
    struct Donation {
        address donor;
        uint256 amount;
        string message;
        string donorName;
    }
    
    // Mapping from user name (ID) to User struct
    mapping(string => User) public users;

    // Mapping from address to user name
    mapping(address => string) public addressToName;

    // Mapping to keep track of user balances
    mapping(address => uint256) public balances;

    // Mapping to keep track of donations for each user
    mapping(string => Donation[]) public donations;

    // Event to emit when a donation is received
    event DonationReceived(string indexed recipientId, address indexed donor, uint256 amount, string message, string donorName);

    // Modifier to check if the sender is the admin
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }
    
    // Modifier to check if the sender is the user
    modifier onlyUser(string memory name) {
        require(users[name].userAddress == msg.sender, "Only the user can perform this action");
        _;
    }
    
    constructor() {
        admin = msg.sender;
    }

    // Function to register a user
    function registerUser(string memory name) public {
        require(users[name].userAddress == address(0), "Username is already taken");
        require(bytes(addressToName[msg.sender]).length == 0, "Address already registered with a username");
        
        users[name] = User(name, msg.sender);
        addressToName[msg.sender] = name;
    }

    // Function to change user name
 function changeUserName(string memory oldName, string memory newName) public onlyUser(oldName) {
    require(bytes(newName).length > 0, "New username cannot be empty");
    require(users[newName].userAddress == address(0), "New username is already taken");

    users[newName] = users[oldName];
    users[newName].name = newName;
    addressToName[users[oldName].userAddress] = newName;

    delete users[oldName];
}

    function getUserInfo() public view returns (string memory){
        return users[addressToName[msg.sender]].name;
    }


    // Function to donate ETH to a recipient by their name (ID)
    function donate(string memory recipientId, string memory message, string memory donorName) public payable {
        require(users[recipientId].userAddress != address(0), "Recipient not found");
        require(msg.value > 0, "Donation must be greater than zero");

        uint256 fee = (msg.value * 1) / 101; // 1% fee
        uint256 amount = msg.value - fee;

        balances[admin] += fee;
        balances[users[recipientId].userAddress] += amount;

        donations[recipientId].push(Donation(msg.sender, amount, message, donorName));

        emit DonationReceived(recipientId, msg.sender, amount, message, donorName);
    }

 // Function to get donations for an address
    function getDonationsByAddress(address userAddress) public view returns (Donation[] memory) {
        string memory userId = addressToName[userAddress];
        require(bytes(userId).length > 0, "Recipient not found");
        return donations[userId];
    }


    // Function for recipients to withdraw their funds
    function withdraw() public {
        uint256 amount = balances[msg.sender];
        require(amount > 0, "No funds to withdraw");

        // Reset the balance to zero before transferring to prevent re-entrancy attacks
        balances[msg.sender] = 0;

        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Withdrawal failed");
    }

    // Function for admin to withdraw their fees
    function withdrawFees() public onlyAdmin {
        uint256 amount = balances[admin];
        require(amount > 0, "No funds to withdraw");

        // Reset the balance to zero before transferring to prevent re-entrancy attacks
        balances[admin] = 0;

        (bool success, ) = admin.call{value: amount}("");
        require(success, "Withdrawal failed");
    }

    // Fallback function to accept ETH
    receive() external payable {
        balances[admin] += msg.value;
    }
}
