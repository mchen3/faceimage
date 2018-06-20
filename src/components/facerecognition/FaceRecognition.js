import React from 'react';

const FaceRecognition = ( { imageUrl } ) => {
  return  (
    <div className='center'>
      <img alt='' src={ imageUrl } width='350px' height='250px' />
    </div>
  );
}    

export default FaceRecognition;