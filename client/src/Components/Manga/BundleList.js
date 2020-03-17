import React from 'react';
import axios from 'axios';
//  _id
//   name: String,
//   bundled: Array,
//   path: String,
//   dateBundled: Date
class BundleList extends React.Component {
  state = {
    bundleList: []
  };

  componentDidMount() {
    //todo get bundle specific for a manga
    axios.get('/api/bundle').then(resp => {
      const bundleList = resp.data;
      //this.setState({ bundleList });
    });
  }
  render() {
    return (
      <div className="card">
        {/* todo Show less and show more or/and hide all */}
        <div className="title">Bundles. </div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {this.state.bundleList.map(({ _id, name, dateBundled }, index) => {
              return (
                <tr key={_id}>
                  <td>{name}</td>
                  <td>{dateBundled}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default BundleList;
