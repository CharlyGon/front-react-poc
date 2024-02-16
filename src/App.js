import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DataEntryPage from './components/DataEntryPage';
import TransactionDetailsPage from './components/TransactionDetailsPage';

const App = () => {
  return (
    <Router>
      <header>
        <nav>
          <ul>

            <li><a href="/transaction/">transaction INFO</a></li>
          </ul>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<DataEntryPage />} />
        <Route exact path="/transaction" element={<TransactionDetailsPage />} />
        <Route path="/transaction/:transactionHash" element={<TransactionDetailsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
