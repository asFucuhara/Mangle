import React from 'react';

const MangaPopUp = props => {
  return (
    <div className="popup" onClick={props.close}>
      <div className="popup_inner" onClick={e => e.stopPropagation()}>
        <h1>Bundle</h1>
        <div>
          {props.selectedList.map(({ title }, index) => {
            return <p>{title}</p>;
          })}
        </div>

        <button onClick={null}>Bundle</button>
        <button onClick={props.close}>close me</button>
      </div>
    </div>
  );
};

export default MangaPopUp;
