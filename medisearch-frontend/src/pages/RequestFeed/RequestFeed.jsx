import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import RequestCard from "../../components/RequestCard/RequestCard";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./RequestFeed.module.css";
import { abi, contractAddress } from "../../data/metamask";
import { ethers, utils } from "ethers";

export default function RequestFeed() {
  const [cards, setCards] = useState([]);

  const handleAcceptRequest = (acceptedRequest) => {
    // Implement the logic to accept the request
    // console.log("Accepted request ID:", acceptedRequest.id);
  };

  useEffect(() => {
    async function getReq() {
      if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);
        try {
          const tx = await contract.getPending();
          const array = tx.map((item) => item.toString());
          console.log(array)
      
          const requests = []; 

          for (var i = 0; i < array.length; i++) {
            const index = parseInt(array[i], 10); 
            const prescription = await contract.getPrescription(index);
            const arrayx = prescription.map((item) => item.toString());
 
            requests.push({
              prescriptionId: arrayx[0],
              operatorId: arrayx[2],
              symptoms: arrayx[5],
              disease: arrayx[6],
            });
          }

          setCards(requests.map((request) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={request.id}>
              <RequestCard request={request} onAccept={handleAcceptRequest} />
            </Grid>
          )));
        } catch (error) {
          alert("Error writing to contract: " + error.message);
        }
      } else {
        alert("MetaMask is not installed.");
      }
    }

    getReq();
  }, []);

  return (
    <>
      <Navbar />
      <div className={styles.feed}>
        <div className={styles.title}>
          <h1>Request Feed</h1>
        </div>
        <Grid container spacing={2}>
          {cards}
        </Grid>
      </div>
    </>
  );
}
