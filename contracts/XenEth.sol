// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract XenEth {
    address public admin;

    struct User {
        string name;
        address userAddress;
    }

    struct Donation {
        address donor;
        uint256 amount;
        string message;
        string donorName;
    }

    mapping(string => User) public users;
    mapping(address => string) public addressToName;
    mapping(address => uint256) public balances;
    mapping(string => Donation[]) public donations;
    mapping(string => uint256) public totalDonations;
    mapping(string => uint256) public withdrawnDonations;

    event DonationReceived(string indexed recipientId, address indexed donor, uint256 amount, string message, string donorName);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    modifier onlyUser(string memory name) {
        require(users[name].userAddress == msg.sender, "Only the user can perform this action");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function registerUser(string memory name) public {
        require(users[name].userAddress == address(0), "Username is already taken");
        require(bytes(addressToName[msg.sender]).length == 0, "Address already registered with a username");

        users[name] = User(name, msg.sender);
        addressToName[msg.sender] = name;
    }

    function changeUserName(string memory oldName, string memory newName) public onlyUser(oldName) {
        require(bytes(newName).length > 0, "New username cannot be empty");
        require(users[newName].userAddress == address(0), "New username is already taken");

        users[newName] = users[oldName];
        users[newName].name = newName;
        addressToName[users[oldName].userAddress] = newName;

        delete users[oldName];
    }

    function getUserInfo() public view returns (string memory) {
        return users[addressToName[msg.sender]].name;
    }

    function donate(string memory recipientId, string memory message, string memory donorName) public payable {
        require(users[recipientId].userAddress != address(0), "Recipient not found");
        require(msg.value > 0, "Donation must be greater than zero");

        uint256 fee = (msg.value * 1) / 101; // 1% fee
        uint256 amount = msg.value - fee;

        balances[admin] += fee;
        balances[users[recipientId].userAddress] += amount;

        donations[recipientId].push(Donation(msg.sender, amount, message, donorName));

        totalDonations[recipientId] += msg.value;

        emit DonationReceived(recipientId, msg.sender, amount, message, donorName);
    }

    function getDonationsByAddress(address userAddress) public view returns (Donation[] memory) {
        string memory userId = addressToName[userAddress];
        require(bytes(userId).length > 0, "Recipient not found");
        return donations[userId];
    }

    function withdraw() public {
        uint256 amount = balances[msg.sender];
        require(amount > 0, "No funds to withdraw");

        string memory userId = addressToName[msg.sender];
        withdrawnDonations[userId] += amount;

        balances[msg.sender] = 0;

        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Withdrawal failed");
    }

    function withdrawFees() public onlyAdmin {
        uint256 amount = balances[admin];
        require(amount > 0, "No funds to withdraw");

        balances[admin] = 0;

        (bool success, ) = admin.call{value: amount}("");
        require(success, "Withdrawal failed");
    }

    function getTotalDonationsByRecipientId(string memory recipientId) public view returns (uint256) {
        return totalDonations[recipientId];
    }

    function getAvailableBalanceByRecipientId(string memory recipientId) public view returns (uint256) {
        return balances[users[recipientId].userAddress];
    }

    function getWithdrawnDonationsByRecipientId(string memory recipientId) public view returns (uint256) {
        return withdrawnDonations[recipientId];
    }

    function getTotalDonations(address recipientAddress) public view returns (uint256) {
        string memory userId = addressToName[recipientAddress];
        return totalDonations[userId];
    }

    function getAvailableBalance(address recipientAddress) public view returns (uint256) {
        return balances[recipientAddress];
    }

    function getWithdrawnDonations(address recipientAddress) public view returns (uint256) {
        string memory userId = addressToName[recipientAddress];
        return withdrawnDonations[userId];
    }

    receive() external payable {
        balances[admin] += msg.value;
    }
}
