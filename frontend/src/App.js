import React from 'react'
import './App.css';
import NetworkField from './components/NetworkField.js';
import axios from 'axios'

function App() {

  const networkUp = () =>{
    axios.get('http://localhost:4000/network-up')
      .then((res) =>{
        console.log(res)
      })
      .catch((err) =>{
        console.log(err)
      })
  }

  const networkDown = () =>{
    axios.get('http://localhost:4000/network-down')
      .then((res) =>{
        console.log(res)
      })
      .catch((err) =>{
        console.log(err)
      })
  }

  return (
    <div >
      
      <h1 className="text-center m-5">Decentralized Hyperledger Fabric Management System Using UI</h1>
      
      <div className="container text-center">
        <a className="btn btn-primary m-3"  onClick={networkUp}>Up</a>
        <a className="btn btn-danger m-3" onClick={networkDown}>Down</a>
        
      </div>
      
      <NetworkField/>
      
    </div>
  );
}

export default App;
