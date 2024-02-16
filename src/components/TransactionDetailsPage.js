import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

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

  return (
    <div>
      <h1>Transaction Details Page</h1>
      <p>Transaction Hash: {transactionHash}</p>
      <form onSubmit={handleSubmit}>
        <label>
          Paste Hash:
          <input type="text" value={inputHash} onChange={handleChange} />
        </label>
        <button type="submit" disabled={isLoading}>Check Hash</button>
      </form>
      {isLoading && <p>Verifying hash...</p>}
      {message && (
        <p>
          {message.includes('Transaccion encontrada en PolygonScan:') && (
            <a href={message.split(': ')[1]} target="_blank" rel="noopener noreferrer">
              Ver en PolygonScan
            </a>
          )}
        </p>
      )}
    </div>
  );
}

export default TransactionDetailsPage;


