import React, { useState } from 'react';
import axios from 'axios';

function DataEntryPage() {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
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

  return (
    <div>
      <h1>Data Entry Page: Submit Information</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Message:
          <input type="text" value={message} onChange={handleChange} />
        </label>
        <button type="submit" disabled={isLoading}>Submit</button>
      </form>
      {isLoading && <p>Enviando datos, por favor espere...</p>}
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
}

export default DataEntryPage;
