import React from 'react';

function Panel({ title, description, imageUrl, onClick }) {
  return (
    <div onClick={onClick} className="panel width-20 fadeIn">
      <img src={imageUrl} alt={title} className='panel-image'/>
      <div className="panel-content">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Panel;