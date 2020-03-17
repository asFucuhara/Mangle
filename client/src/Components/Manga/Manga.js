import React from 'react';
import axios from 'axios';

import MangaInfoCard from './MangaInfoCard';
import ChapterListCard from './ChapterListCard';
import BundleList from './BundleList';
import MangaPopUp from './MangaPopUp';


import './Manga.css';

class Manga extends React.Component {
  state = {
    chapterList: [],
    selectedMap: new Map(), //index of chapterList
    showPopup: false
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    //todo: Route to get chapters of a specified manga//update state only once
    axios.get(`/api/chapter`).then(resp => {
      const chapterList = resp.data;
      this.setState({ chapterList });
    });
  }

  checkBoxIsChecked = (item, isChecked = false) => {
    //returns state of item checkbox and data entry for selectedMap and good funcinality of master check
    let aux = this.state.selectedMap.get(item);
    if (aux === undefined) {
      this.setState(prevState => ({
        selectedMap: prevState.selectedMap.set(item, isChecked)
      }));
      return isChecked;
    }
    return aux;
  }

  checkBoxChange = (e) => {
    const item = e.target.name;
    const isChecked = e.target.checked;
    this.setState(prevState => ({
      selectedMap: prevState.selectedMap
        .set(item, isChecked)
        .set('master', false)
    }));
  }

  checkBoxMasterChange = (e) => {
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
      <div>
        <button
          className="bundleBtn"
          onClick={() => this.setState({ showPopup: true })}
        >
          Bundle
        </button>

        <MangaInfoCard id={this.props.match.params.id} />

        <BundleList />

        <ChapterListCard
          chapterList={this.state.chapterList}
          selectedMap={this.state.selectedMap}
          checkBoxIsChecked={this.checkBoxIsChecked}
          checkBoxChange={this.checkBoxChange}
          checkBoxMasterChange={this.checkBoxMasterChange}
        />

        {/* Popup Component */}
        {this.state.showPopup ? (
          <MangaPopUp
            selectedList={this.state.chapterList.filter((value, index) => {
              return this.state.selectedMap.get(index.toString());
            })}
            close={() => this.setState({ showPopup: false })}
          />
        ) : null}
      </div>
    );
  }
}

export default Manga;
