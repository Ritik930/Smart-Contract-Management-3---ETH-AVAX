# Smart-Contract-Management-3---ETH-AVAX
# Decentralized Assessment Portal

Welcome to the Decentralized Assessment Portal! This project allows users to manage ETH transactions such as depositing, withdrawing, and transferring funds using the MetaMask wallet. 

## Features
- Connect to MetaMask wallet
- View account balance and transaction history
- Deposit ETH
- Withdraw ETH
- Transfer ETH to another address
- Change contract owner
- Update interest rate

## Prerequisites
- [MetaMask](https://metamask.io/download.html) browser extension
- Node.js and npm

## Getting Started

### Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/decentralized-assessment-portal.git
    cd decentralized-assessment-portal
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

### Running the Application
1. Start the local blockchain using Hardhat:
    ```bash
    npx hardhat node
    ```

2. Deploy the smart contract:
    ```bash
    npx hardhat run scripts/deploy.js --network localhost
    ```

3. Start the frontend application:
    ```bash
    npm run dev
    ```

4. Open your browser and navigate to:
    ```
    http://localhost:3000
    ```

## Usage

### Connecting MetaMask
- Install MetaMask from [here](https://metamask.io/download.html).
- Connect your MetaMask wallet by clicking the "Connect MetaMask wallet" button.

### Account Actions
- **Deposit ETH**: Click "Deposit ETH" and enter the amount to deposit.
- **Withdraw ETH**: Click "Withdraw ETH" and enter the amount to withdraw.
- **Transfer ETH**: Click "Transfer ETH", enter the recipient address and the amount to transfer.
- **Change Owner**: Click "Change Owner" and enter the new owner's address.
- **Set Interest Rate**: Click "Set Interest Rate" and enter the new interest rate.
- **Get Transaction History**: Click "Get Transaction History" to view your transaction history.

## Contract Details
- **Contract Address**: `0x5FbDB2315678afecb367f032d93F642f64180aa3`
- **ABI**: The ABI is located in `artifacts/contracts/Assessment.sol/Assessment.json`.

## Code Structure

### Frontend
- **pages/index.js**: Main React component for the homepage.
- **styles/Home.module.css**: CSS styles for the homepage.

### Smart Contract
- **contracts/Assessment.sol**: Solidity smart contract code.
- **scripts/deploy.js**: Script to deploy the smart contract.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact
If you have any questions or feedback, please contact Ritik Kumar at(https://www.linkedin.com/in/ritik-kumar-8376ba225/)).

---

Made with ❤️ by Ritik Kumar
