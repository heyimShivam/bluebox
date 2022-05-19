import React from 'react';
import loader from '../loader/mainloader.gif'

    const Mainloader = () => (
      <div className="Mainloader" >
        <img src={loader} alt="loading..." width='100' height='100'/>
      </div>
    );

    export default Mainloader;