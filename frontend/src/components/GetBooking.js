import React from 'react';

class GetBooking extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const tbody = {
      textAlign: 'center'
    };
    const table = {
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '70%'
    };
    return (
      <table style={table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Comments</th>
          </tr>
        </thead>
        <tbody>
          
        </tbody>
      </table>
    );
  }
}

export default GetBooking;