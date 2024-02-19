import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './TransactionDetailsPage.css';

function TransactionDetailsPage() {
  const { transactionHash } = useParams();
  const [inputHash, setInputHash] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:5235/api/data/${inputHash}`);
      console.log(response.data);
      setMessage(response.data);
    } catch (error) {
      console.error('Error al verificar el hash:', error);
      setMessage('Error al verificar el hash. Por favor, inténtelo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setInputHash(e.target.value);
  };

  const extractUrlFromMessage = (message) => {
    const urlRegex = /(https?:\/\/[^\s]+)/;
    const urlMatch = message.match(urlRegex);
    if (urlMatch && urlMatch.length > 0) {
      return urlMatch[0];
    } else {
      return null;
    }
  };

  const url = message ? extractUrlFromMessage(message) : null;

  return (
    <div className="container">
      <h1>Transaction Details</h1>
      <div className="form-container">
        <p>Hash to search: {transactionHash}</p>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <input type="text" value={inputHash} onChange={handleChange} placeholder="Paste Hash" />
          </div>
          <button className="check-button" type="submit" disabled={isLoading}>Check Hash</button>
        </form>
        <div className="loading-message-container">
          {isLoading && <p>Verifying hash...</p>}
        </div>
        <div className="response-message-container">
          {message && (
            <div style={{ minHeight: '50px' }}>
              {url && (
                <a href={url} target="_blank" rel="noopener noreferrer">
                  Ver en PolygonScan
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TransactionDetailsPage;
