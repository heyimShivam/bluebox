import React from 'react';
import loader from '../loader/loader2.gif'

    const Spinner = () => (
      <div className="spinner" >
        <img src={loader} alt="loading..." width='20' height='20'/>
      </div>
    );

    export default Spinner;