import React from 'react';

const Labelbox = (props) => (
  <div className="labelbox"> 
    <div className="labelbox__title">{props.title}</div>
    <div className="labelbox__body">{props.children}</div>
  </div>
)

export default Labelbox;