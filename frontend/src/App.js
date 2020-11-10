import logo from './logo.svg';
import './App.css';
import ListBookings from './components/ListBookings'
import AddBooking from './components/AddBooking'
import EditBooking from './components/EditBooking'
import GetBooking from './components/GetBooking'
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookings: [],
      addName: '',
      addComments: '',
      addDate: '',
      addStartTime: 'h:mm',
      addEndTime: 'h:mm',
      addMessage: '',
      updName: '',
      updComments: '',
      updMessage: '',
      updID: 0,
      updDate: '',
      updStartTime: 'h:mm',
      updEndTime: 'h:mm',
      fromDate: '',
      toDate: '',
      showHideAddBooking: false,
      showHideEditBooking: false,
      showHideAddBookingBtn: true,
      showHideEditBookingBtn: true,
      showHideHomepagegBtn: false
    }
  }

  componentDidMount() {
    fetch('/bookings')
      .then(res => res.json())
      .then((data) => {
        this.setState({ bookings: data })
        console.log('data:');
        console.log(data);
      })
      .catch((e) => console.log('error: ' + e));
  }

  convertTo24HrTime(time) {
    let hour = parseInt(time.split(':')[0]);
    let min = time.split(':')[1];
    hour += hour < 9 ? 12 : 0;
    return hour + ':' + min;
  }

  getBookingListByDate() {
    const fromDateTime = this.state.fromDate ? this.state.fromDate + ' 00:00' : this.state.fromDate;
    const toDateTime = this.state.toDate ? this.state.toDate + ' 23:59' : this.state.toDate;
    fetch('/bookingdates?date1=' + fromDateTime + '&date2=' + toDateTime)
      .then(res => res.json())
      .then((data) => {
        this.setState({ bookings: data })
        console.log('date data:');
        console.log(data);
      })
      .catch((e) => console.log('date error: ' + e));
  }

  getExistingBookings(startDate, endDate, isAddBooking, updID) {
    fetch('/existbooking?date1=' + startDate + '&date2=' + endDate + '&id=' + updID)
      .then(res => res.json())
      .then((data) => {
        console.log('exist data'); console.log(data);
        if (!data.length && isAddBooking) {
          this.addBooking(startDate, endDate);
        }
        else if (!data.length && !isAddBooking) {
          this.updateBooking(startDate, endDate);
        }
        else {
          alert('Selected time slot overlaps an existing one');
        }
      })
      .catch((e) => console.log('date error: ' + e));
  }

  async addBooking(startDateTime, endDateTime) {
    const { addName, addComments } = this.state;
    try {
      const post = await fetch('/booking?name=' + addName + '&comments=' + addComments + '&startDate=' + startDateTime + '&endDate=' + endDateTime, { method: 'POST' });
      const data = await post.json();
      console.log('POST data:');
      console.log(data);
      this.setState({ addMessage: 'Booking is successful. Page will reload in 5 seconds...' });
      setTimeout(() => window.location.reload(), 5000);
    }
    catch (e) {
      console.log('POST err: ' + e);
      this.setState({ addMessage: 'Booking has failed.' });
    };
  }

  async updateBooking(startDateTime, endDateTime) {
    const { updName, updComments, updID } = this.state;
    try {
      const post = await fetch('/booking?name=' + updName + '&comments=' + updComments + '&id=' + updID + '&startDate=' + startDateTime + '&endDate=' + endDateTime, { method: 'PUT' });
      const data = await post.json();
      console.log('PUT data:');
      console.log(data);
      this.setState({ updMessage: 'Updated successfully. Page will reload in 5 seconds...' });
      setTimeout(() => window.location.reload(), 5000);
    }
    catch (e) {
      console.log('PUT err: ' + e);
      this.setState({ updMessage: 'Update failed. Check booking ID' });
    }
  }

  async handleAddBooking() {
    const { addDate, addStartTime, addEndTime } = this.state;
    const startDateTime = addDate + ' ' + this.convertTo24HrTime(addStartTime);
    const endDateTime = addDate + ' ' + this.convertTo24HrTime(addEndTime);
    this.getExistingBookings(startDateTime, endDateTime, true, 0);
  }

  async handleUpdateBooking() {
    const { updDate, updStartTime, updEndTime, updID } = this.state;
    const startDateTime = updDate + ' ' + this.convertTo24HrTime(updStartTime);
    const endDateTime = updDate + ' ' + this.convertTo24HrTime(updEndTime);
    this.getExistingBookings(startDateTime, endDateTime, false, updID);
  }

  async handleDelete(id) {
    try {
      const post = await fetch('/booking?id=' + id, { method: 'DELETE' });
      console.log('DELETE data:');
      console.log(post);
      window.location.reload();
    }
    catch (e) {
      console.log('DELETE err: ' + e);
    };
  }

  handleChange(state, val) {
    switch (state) {
      case 'addName': this.setState({ addName: val }); break;
      case 'addComments': this.setState({ addComments: val }); break;
      case 'addDate': this.setState({ addDate: val }); break;
      case 'addStartTime': this.setState({ addStartTime: val }); break;
      case 'addEndTime': this.setState({ addEndTime: val }); break;
      case 'updName': this.setState({ updName: val }); break;
      case 'updComments': this.setState({ updComments: val }); break;
      case 'updMessage': this.setState({ updMessage: val }); break;
      case 'updID': this.setState({ updID: val }); break;
      case 'updDate': this.setState({ updDate: val }); break;
      case 'updStartTime': this.setState({ updStartTime: val }); break;
      case 'updEndTime': this.setState({ updEndTime: val }); break;
      case 'fromDate': this.setState({ fromDate: val }); break;
      case 'toDate': this.setState({ toDate: val }); break;
      default: break;
    }

  }

  handleDates(dateType, val) {
    switch (dateType) {
      case 'fromDate': this.setState({ fromDate: val }); break;
      case 'toDate': this.setState({ toDate: val }); break;
      default: break;
    }
  }

  handleShowHide(component) {
    switch (component) {
      case 'AddBooking': this.setState({
        showHideAddBooking: true,
        showHideEditBooking: false,
        showHideAddBookingBtn: false,
        showHideEditBookingBtn: false,
        showHideHomepagegBtn: true
      }); break;
      case 'EditBooking': this.setState({
        showHideAddBooking: false,
        showHideEditBooking: true,
        showHideAddBookingBtn: false,
        showHideEditBookingBtn: false,
        showHideHomepagegBtn: true
      }); break;
    }
  }

  handleReloadHomepage() {

  }

  render() {
    const h1 = {
      textAlign: 'center'
    };
    const table = {
      marginLeft: 'auto',
      marginRight: 'auto',
    };
    const {
      bookings,
      addComments,
      addName,
      addDate,
      addStartTime,
      addEndTime,
      addMessage,
      updName,
      updComments,
      updID,
      updMessage,
      updDate,
      updStartTime,
      updEndTime,
      fromDate,
      toDate,
      showHideAddBooking,
      showHideEditBooking,
      showHideAddBookingBtn,
      showHideEditBookingBtn,
      showHideHomepagegBtn } = this.state;

    return (
      <div>
        <h1 style={h1}>Doctor's Booking System</h1>
        <div>&nbsp;</div>
        <ListBookings
          bookings={bookings}
          onDelete={(id) => this.handleDelete(id)}
          fromDate={fromDate}
          toDate={toDate}
          onChange={(date, val) => this.handleChange(date, val)}
          onClick={() => this.getBookingListByDate()}
        />
        <div>&nbsp;</div>
        <table style={table}>
          <tbody>
            <tr>
              <td>&nbsp;{showHideAddBookingBtn && <button onClick={() => this.handleShowHide('AddBooking')}>Add an Appointment</button>}&nbsp;</td>
              <td>&nbsp;{showHideHomepagegBtn && <button onClick={() => window.location.reload()}>Return to Homepage</button>}&nbsp;</td>
              <td>&nbsp;{showHideEditBookingBtn && <button onClick={() => this.handleShowHide('EditBooking')}>Edit an Appointment</button>}&nbsp;</td>
            </tr>
          </tbody>
        </table>
        {showHideAddBooking && <AddBooking
          name={addName}
          comments={addComments}
          message={addMessage}
          date={addDate}
          startTime={addStartTime}
          endTime={addEndTime}
          onChange={(state, value) => this.handleChange(state, value)}
          onSubmit={() => this.handleAddBooking()}
        />}
        {showHideEditBooking && <EditBooking
          name={updName}
          comments={updComments}
          id={updID}
          message={updMessage}
          date={updDate}
          startTime={updStartTime}
          endTime={updEndTime}
          onChange={(state, value) => this.handleChange(state, value)}
          onSubmit={() => this.handleUpdateBooking()}
        />}
      </div>
    );
  }
}



export default App;
