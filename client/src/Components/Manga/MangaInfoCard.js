import React from 'react';
import axios from 'axios';

import './MangaInfoCard.css';

class MangaInfoCard extends React.Component {
  state = {
    mangaInfo: {},
    title: '',
    cover: '',
    mangaInfoIsDisabled: true,
    editDisplay: 'inline',
    saveDisplay: 'none',
    cancelDisplay: 'none'
  };

  componentDidMount() {
    const id = this.props.id;
    axios.get(`/api/manga/${id}`).then(resp => {
      const mangaInfo = resp.data;
      this.setState({
        mangaInfo,
        title: mangaInfo.title,
        cover: mangaInfo.cover
      });
    });
  }

  editBtn(e) {
    this.setState({
        mangaInfoIsDisabled: false,
        editDisplay: 'none',
        saveDisplay: 'inline',
        cancelDisplay: 'inline'
      });
  }

  saveBtn(e) {
    const id = this.props.id;
    const { title, cover } = this.state;
    const body = {
      title,
      cover
    };
    axios.put(`/api/manga/${id}`, body).then(resp => {
      const mangaInfo = resp.data;
      this.setState({
        mangaInfo,
        title: mangaInfo.title,
        cover: mangaInfo.cover,
        mangaInfoIsDisabled: false,
        editDisplay: 'inline',
        saveDisplay: 'none',
        cancelDisplay: 'none'
      });
    });
  }

  cancelBtn(e) {
    const { title, cover } = this.state.mangaInfo;
    this.setState({
      title,
      cover,
      mangaInfoIsDisabled: true,
      editDisplay: 'inline',
      saveDisplay: 'none',
      cancelDisplay: 'none'
    });
  }

  render() {
    return (
      <div className="MangaInfoCard">
        <div className="mangaInfo">
          <img className="cover" alt="" src={this.state.mangaInfo.cover} />
          <div className="mangaTitle">
            <p>Title</p>
            <input
              value={this.state.title || ''}
              disabled={this.state.mangaInfoIsDisabled}
              onChange={e => this.setState({ title: e.target.value })}
            />
          </div>
          <div className="mangaSource">
            <p>Image Source</p>
            <input
              value={this.state.cover || ''}
              disabled={this.state.mangaInfoIsDisabled}
              onChange={e => this.setState({ cover: e.target.value })}
            />
          </div>
        </div>

        <div className="buttons">
          <button
            className="edit"
            onClick={this.editBtn.bind(this)}
            style={{ display: this.state.editDisplay }}
          >
            Edit
          </button>
          <button
            className="save"
            onClick={this.saveBtn.bind(this)}
            style={{ display: this.state.saveDisplay }}
          >
            Save
          </button>
          <button
            className="cancel"
            onClick={this.cancelBtn.bind(this)}
            style={{ display: this.state.cancelDisplay }}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }
}

export default MangaInfoCard;
