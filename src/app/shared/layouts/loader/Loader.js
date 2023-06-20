import React from 'react';
import LoadingBar from '../../components/loading/LoadingBar';
import './loader.css';

const Loader = () => (
  <div className="fallback-spinner">
    <div className="loading">
      <LoadingBar />
    </div>
  </div>
);
export default Loader;