import React2 from 'react';

class ListBookings extends React2.Component {
  constructor(props) {
    super(props);
    this.handleFromDate = this.handleFromDate.bind(this);
    this.handleToDate = this.handleToDate.bind(this);
  }

  formatDate(val) {
    let date = new Date(val);
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
    return monthNames[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
  }

  formatTime(val) {
    let date = new Date(val);
    let hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
    let AMPM = date.getHours() >= 12 ? 'pm' : 'am';
    return hours + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes() + ' ' + AMPM;
  }

  handleFromDate(e) {
    this.props.onChange('fromDate', e.target.value);
  }

  handleToDate(e) {
    this.props.onChange('toDate', e.target.value);
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
    const filter = {
      marginRight: '15%',
      marginLeft: 'auto'
    };
    const { bookings, fromDate, toDate, onDelete, onClick } = this.props;

    return (
      <div>
        <table style={filter}>
          <tbody>
            <tr>
              <th>Filter By Date</th>
              <td>&nbsp;</td>
              <td>From: <input type="date" name="fromDate" value={fromDate} onChange={this.handleFromDate} /></td>
              <td>To: <input type="date" name="toDate" value={toDate} onChange={this.handleToDate} /></td>
              <td><button onClick={() => onClick()}>Filter</button></td>
            </tr>
            <tr><td>&nbsp;</td></tr>
          </tbody>
        </table>

        <table style={table}>
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Name</th>
              <th>Comments</th>
              <th>Date</th>
              <th>From</th>
              <th>To</th>
              <th></th>
            </tr>
          </thead>
          <tbody style={tbody}>
            {bookings.map((booking, i) => (
              <tr key={i}>
                <td>{booking.id}</td>
                <td>{booking.name}</td>
                <td>{booking.comments}</td>
                <td>{this.formatDate(booking.startDate)}</td>
                <td>{this.formatTime(booking.startDate)}</td>
                <td>{this.formatTime(booking.endDate)}</td>
                <td><button onClick={() => onDelete(booking.id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
export default ListBookings;