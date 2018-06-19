import React from 'react';
import Tilt from 'react-tilt'
import rocket from './rocket.png'
import './Logo.css'

const Logo = () => {
  return  (
    <div className='ma5 mt0'> 
      <Tilt className="Tilt br2 shadow-2" 
            options={{ max : 55,  scale: 1.2}} style={{ height: 150, width: 150 }}   >
        <div className="Tilt-inner pa3"> <img alt='' style={{paddingTop: '5px '}}src={rocket}/></div>
      </Tilt>
    </div>
  );
}  

export default Logo;