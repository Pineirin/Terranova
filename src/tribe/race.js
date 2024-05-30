import React from 'react';

function Race({ title, description, imageUrl, imageUrl2, tribes }) {
  return (
    <>
      <div className='fadeIn race-container tribe-race-panel'>
        <div className='tribe-race small-margins'>
          <h2>{title}</h2>
          <p>{description}</p>
          {imageUrl && <img className='image image-limit' src={imageUrl} alt={title}/>}
          {imageUrl2 && <img className='image image-limit' src={imageUrl2} alt={title}/>}
        </div>
        <div className='tribes'>
          {tribes}
        </div>
      </div>
    </>
  );
};

export default Race;