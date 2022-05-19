import React from 'react';
import loader from '../loader/cart2.gif'

    const LoadingSpinner = () => (
      <div className="loadingclass" >
        <img src={loader} alt="loading..." width='60' height='60'/>
      </div>
    );

    export default LoadingSpinner;