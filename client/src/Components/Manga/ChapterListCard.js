import React from 'react';

const ChapterListCard = (props) => {
  return (
    <div className="tableCard">
      <div className="services"></div>
      <table>
        <thead>
          <tr>
            <th className="checkbox">
              <input
                type="checkbox"
                name="master"
                checked={props.checkBoxIsChecked('master')}
                onChange={props.checkBoxMasterChange.bind(this)}
              ></input>
            </th>
            <th className="vol">Vol.</th>
            <th>Ch.</th>
            <th className="titulo">Titulo</th>
            <th>Relesed</th>
            <th>Downloaded</th>
            <th>Kindle</th>
          </tr>
        </thead>
        <tbody>
          {props.chapterList.map(
            (
              {
                _id,
                chapter,
                volume,
                title,
                dateSentKindle,
                dateDownloaded,
                dateReleased
              },
              index
            ) => {
              return (
                <tr key={_id}>
                  <td className="checkbox">
                    <input
                      type="checkbox"
                      name={index}
                      checked={props.checkBoxIsChecked(index.toString())}
                      onChange={props.checkBoxChange.bind(this)}
                    ></input>
                  </td>
                  <td className="vol">{volume}</td>
                  <td>{chapter}</td>
                  <td>{title}</td>
                  <td>{dateSentKindle}</td>
                  <td>{dateDownloaded}</td>
                  <td>{dateReleased}</td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ChapterListCard;
