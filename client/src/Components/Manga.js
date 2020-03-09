import React from 'react';
import axios from 'axios';

import './Manga.css';

class Manga extends React.Component {
  state = {
    chapterList: [],
    selectedMap: new Map(), //index of chapterList
    showPopup: false
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    //todo: Route to get chapters of a specified manga
    axios.get(`/api/chapter`).then(resp => {
      const chapterList = resp.data;
      this.setState({ chapterList });
    });
    console.log(this.state.selectedMap.get('master'));
  }

  checkBoxIsChecked(item, isChecked = false) {
    let aux = this.state.selectedMap.get(item);
    if (aux === undefined) {
      this.setState(prevState => ({
        selectedMap: prevState.selectedMap.set(item, isChecked)
      }));
      return isChecked;
    }
    return aux;
  }

  checkBoxChange(e) {
    const item = e.target.name;
    const isChecked = e.target.checked;
    this.setState(prevState => ({
      selectedMap: prevState.selectedMap
        .set(item, isChecked)
        .set('master', false)
    }));
  }

  checkBoxMasterChange(e) {
    const item = e.target.name;
    const isChecked = e.target.checked;
    const aux = [[item, isChecked]];

    this.state.selectedMap.forEach((value, key) => {
      aux.push([key, isChecked]);
    });
    this.setState(prevState => ({
      selectedMap: new Map(aux)
    }));
  }

  render() {
    return (
      <div
        className="tableCard"
        onClick={() => this.setState({ setState: false })}
      >
        <div className="services">
          <button onClick={() => this.setState({ showPopup: true })}>
            Bundle
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th className="checkbox">
                <input
                  type="checkbox"
                  name="master"
                  checked={this.checkBoxIsChecked('master')}
                  onChange={this.checkBoxMasterChange.bind(this)}
                ></input>
              </th>
              <th className="vol">Vol.</th>
              <th className="titulo">Titulo</th>
              <th>Relesed</th>
              <th>Downloaded</th>
              <th>Kindle</th>
            </tr>
          </thead>
          <tbody>
            {this.state.chapterList.map(
              (
                {
                  _id,
                  chapterNumber,
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
                        checked={this.checkBoxIsChecked(index.toString())}
                        onChange={this.checkBoxChange.bind(this)}
                      ></input>
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
          </tbody>
        </table>

        {/* Popup Component */}
        {this.state.showPopup ? (
          <div
            className="popup"
            onClick={() => this.setState({ showPopup: false })}
          >
            <div className="popup_inner" onClick={e => e.stopPropagation()}>
              <h1>Bundle</h1>
              <div>
                {this.state.chapterList.map(({ title }, index) => {
                  if (this.state.selectedMap.get(index.toString())) {
                    return <p>{title}</p>;
                  }
                  return null;
                })}
              </div>

              <button onClick={null}>Bundle</button>
              <button onClick={() => this.setState({ showPopup: false })}>
                close me
              </button>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Manga;
