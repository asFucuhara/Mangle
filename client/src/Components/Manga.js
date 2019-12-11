import React from 'react';
import axios from 'axios';

import './Manga.css';

class Manga extends React.Component {
  state = {
    chapterList: []
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    console.log('id', id);
    axios.get(`/api/manga/${id}`).then(resp => {
      const chapterList = resp.data;
      this.setState({ chapterList });
    });
  }

  render() {
    return (
      <div className="tableCard">
        <table>
          <tr>
            <th className="checkbox">
              <input type="checkbox"></input>
            </th>
            <th className="vol">Vol.</th>
            <th className="titulo">Titulo</th>
            <th>Relesed</th>
            <th>Downloaded</th>
            <th>Kindle</th>
          </tr>
          {this.state.chapterList.map(
            ({
              chapterNumber,
              title,
              dateSentKindle,
              dateDownloaded,
              dateReleased
            }) => {
              return (
                <tr>
                  <td className="checkbox">
                    <input type="checkbox"></input>
                  </td>
                  <td className="vol">{chapterNumber}</td>
                  <td>{title}</td>
                  <td>{dateSentKindle}</td>
                  <td>{dateDownloaded}</td>
                  <td>{dateReleased}</td>
                </tr>
              );
            }
          )}
        </table>
      </div>
    );
  }
}

export default Manga;
