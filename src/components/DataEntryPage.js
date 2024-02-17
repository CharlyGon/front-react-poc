import React, { useState } from 'react';
import axios from 'axios';
import './DataEntryPage.css';

function DataEntryPage() {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim() === '') {
      setResponseMessage('Error: El mensaje no puede estar vacío');
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:5235/api/data', { message });
      console.log(response.data);
      if (response.data.includes('Hash: 0x')) {
        const hash = response.data.split('Hash: ')[1];
        copyToClipboard(hash);
        setResponseMessage(`Transacción enviada correctamente. Hash: ${hash}`);
      } else {
        setResponseMessage(response.data);
      }
    } catch (error) {
      console.error('Error al enviar los datos:', error);
      setResponseMessage('Error: Hubo un problema al enviar los datos');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => alert('Hash copiado al portapapeles'))
      .catch((err) => console.error('Error al copiar al portapapeles:', err));
  };

  const handleButtonClick = (e) => {
    if (message.trim() === '') {
      alert('El mensaje no puede estar vacío');
      return;
    }
    handleSubmit(e);
  };

  return (
    <div className="container">
      <h1>Data Entry</h1>
      <div className="form-container">
        <p>Message:</p>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <input type="text" value={message} onChange={handleChange} placeholder="Write what you want" />
          </div>
          <button type="submit" onClick={handleButtonClick} disabled={isLoading}>Submit</button>
        </form>
        <div className="loading-message-container">
          {isLoading && <p>Enviando datos, por favor espere...</p>}
        </div>
        <div className="response-message-container">
          {responseMessage && <p>{responseMessage}</p>}
        </div>
      </div>
    </div>
  );
}

export default DataEntryPage;
