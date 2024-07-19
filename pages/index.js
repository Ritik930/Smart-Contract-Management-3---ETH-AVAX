import { useState, useEffect } from "react";
import { ethers } from "ethers";
import assessment_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [assessment, setAssessment] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [interestRate, setInterestRate] = useState(undefined);
  const [transactionHistory, setTransactionHistory] = useState([]);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const assessmentABI = assessment_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const accounts = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(accounts);
    }
  };

  const handleAccount = (accounts) => {
    if (accounts.length > 0) {
      console.log("Account connected:", accounts[0]);
      setAccount(accounts[0]);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    try {
      const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
      handleAccount(accounts);
      getAssessmentContract();
    } catch (error) {
      console.error("Error connecting account:", error);
    }
  };

  const getAssessmentContract = () => {
    if (ethWallet) {
      const provider = new ethers.providers.Web3Provider(ethWallet);
      const signer = provider.getSigner();
      const assessmentContract = new ethers.Contract(contractAddress, assessmentABI, signer);
      setAssessment(assessmentContract);
    }
  };

  const getBalance = async () => {
    if (assessment) {
      try {
        const balance = await assessment.getBalance();
        const formattedBalance = ethers.utils.formatEther(balance);
        setBalance(formattedBalance);
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    }
  };

  const fetchInterestRate = async () => {
    if (assessment) {
      try {
        const rate = await assessment.getInterestRate();
        setInterestRate(rate.toString());
      } catch (error) {
        console.error("Error fetching interest rate:", error);
      }
    }
  };

  const getTransactionHistory = async () => {
    if (assessment) {
      try {
        const history = await assessment.getTransactionHistory();
        setTransactionHistory(history.map(tx => tx.toString()));
      } catch (error) {
        console.error("Error fetching transaction history:", error);
      }
    }
  };

  const deposit = async () => {
    if (assessment) {
      try {
        const amount = prompt("Enter amount to deposit in ETH:");
        if (amount) {
          const tx = await assessment.deposit({ value: ethers.utils.parseEther(amount) });
          await tx.wait();
          getBalance();
        } else {
          console.log("Deposit cancelled: Invalid amount");
        }
      } catch (error) {
        console.error("Error depositing ETH:", error);
        alert(`Error: ${error.message}`);
      }
    }
  };

  const withdraw = async () => {
    if (assessment) {
      try {
        const amount = prompt("Enter amount to withdraw in ETH:");
        if (amount) {
          const tx = await assessment.withdraw(ethers.utils.parseEther(amount));
          await tx.wait();
          getBalance();
        } else {
          console.log("Withdrawal cancelled: Invalid amount");
        }
      } catch (error) {
        console.error("Error withdrawing ETH:", error);
        alert(`Error: ${error.message}`);
      }
    }
  };

  const transfer = async () => {
    if (assessment) {
      try {
        const recipient = prompt("Enter recipient address:");
        const amount = prompt("Enter amount to transfer in ETH:");
        if (recipient && amount) {
          const tx = await assessment.transfer(recipient, ethers.utils.parseEther(amount));
          await tx.wait();
          getBalance();
        } else {
          console.log("Transfer cancelled: Invalid recipient or amount");
        }
      } catch (error) {
        console.error("Error transferring ETH:", error);
        alert(`Error: ${error.message}`);
      }
    }
  };

  const changeOwner = async () => {
    if (assessment) {
      try {
        const newOwner = prompt("Enter new owner address:");
        if (newOwner) {
          const tx = await assessment.setOwner(newOwner);
          await tx.wait();
          console.log("Owner changed to:", newOwner);
        } else {
          console.log("Change owner cancelled: Invalid address");
        }
      } catch (error) {
        console.error("Error changing owner:", error);
        alert(`Error: ${error.message}`);
      }
    }
  };

  const updateInterestRate = async () => {
    if (assessment) {
      try {
        const newRate = prompt("Enter new interest rate:");
        if (newRate) {
          const tx = await assessment.setInterestRate(newRate);
          await tx.wait();
          fetchInterestRate();
        } else {
          console.log("Interest rate change cancelled: Invalid rate");
        }
      } catch (error) {
        console.error("Error changing interest rate:", error);
        alert(`Error: ${error.message}`);
      }
    }
  };

  const initUser = () => {
    if (!ethWallet) {
      return <p>Please install MetaMask to use this Bank.</p>;
    }

    if (!account) {
      return <button onClick={connectAccount}>Connect MetaMask wallet</button>;
    }

    if (balance === undefined) {
      getBalance();
    }

    if (interestRate === undefined) {
      fetchInterestRate();
    }

    return (
      <div>
        <p>Your Account: {account}</p>
        <p>Your Balance: {balance}</p>
        <p>Current Interest Rate: {interestRate}%</p>
        <p>Your Transaction History: {transactionHistory.join(', ')}</p>
        <button onClick={deposit}>Deposit ETH</button>
        <button onClick={withdraw}>Withdraw ETH</button>
        <button onClick={transfer}>Transfer ETH</button>
        <button onClick={changeOwner}>Change Owner</button>
        <button onClick={updateInterestRate}>Set Interest Rate</button>
        <button onClick={getTransactionHistory}>Get Transaction History</button>
      </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main className="container">
      <header>
        <h1>Welcome to the Decentralized Assessment Portal!</h1>
        <p><b>Here, Ritik Kumar</b></p>
      </header>
      {initUser()}
      <section className="info">
        <h2>About This Portal</h2>
        <p>This decentralized portal allows you to deposit, withdraw, and transfer ETH using your MetaMask wallet.</p>
        <p>Connect your MetaMask wallet to get started and manage your funds securely on the Ethereum blockchain.</p>
      </section>
      <section className="instructions">
        <h2>How to Use</h2>
        <ol>
          <li>Install MetaMask from <a href="https://metamask.io/download.html" target="_blank" rel="noopener noreferrer">here</a>.</li>
          <li>Connect your MetaMask wallet by clicking the button above.</li>
        </ol>
      </section>
    </main>
  );
}
