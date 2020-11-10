import React from 'react';

class AddBooking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ampmStartTime: 'am',
      ampmEndTime: 'am'
    }
    this.handleName = this.handleName.bind(this);
    this.handleComments = this.handleComments.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.handleStartTime = this.handleStartTime.bind(this);
    this.handleEndTime = this.handleEndTime.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setAmPmStartTime = this.setAmPmStartTime.bind(this);
    this.setAmPmEndTime = this.setAmPmEndTime.bind(this);
    this.checkIfTimeIsReversed = this.checkIfTimeIsReversed.bind(this);
  }

  handleName(e) {
    this.props.onChange('addName', e.target.value);
  }

  handleComments(e) {
    this.props.onChange('addComments', e.target.value);
  }

  handleDate(e) {
    const date = new Date(e.target.value);
    if (date.getDay()) {
      this.props.onChange('addDate', e.target.value);
    }
    else {
      alert('Booking on a Sunday is not allowed')
      this.props.onChange('addDate', '');
    }
  }

  handleStartTime(e) {
    this.props.onChange('addStartTime', e.target.value);
  }

  handleEndTime(e) {
    this.props.onChange('addEndTime', e.target.value);
  }

  handleSubmit() {
    if (!this.props.date) {
      alert('Please select a date');
    }
    else if (this.validateTime()) {
      this.props.onSubmit();
    }
  }

  convertToMinutes(time, ampm) {
    let result;
    let hour = parseInt(time.split(':')[0]);
    let min = parseInt(time.split(':')[1]);
    hour += ampm === 'pm' && hour < 12 ? 12 : 0;
    result = hour *= 60;
    result += min;
    return result;
  }

  checkIfWithinTimeLimit(time, isStartTime) {
    const { ampmStartTime, ampmEndTime } = this.state;
    let hour = parseInt(time.split(':')[0]);
    let min = parseInt(time.split(':')[1]);
    let ampm = isStartTime ? ampmStartTime : ampmEndTime;
    if ((ampm == 'am' && (hour < 9 || hour == 12)) || (ampm == 'pm' && hour > 5 && hour < 12) || (ampm == 'pm' && (hour >= 5 && hour < 12 && min > 0))) {
      alert('Time should be within 9:00 am and 5:00 pm');
      return false;
    }
    return true;
  }

  checkIfTimeIsReversed() {
    const { ampmStartTime, ampmEndTime } = this.state;
    const { startTime, endTime } = this.props;
    if (this.convertToMinutes(endTime, ampmEndTime) - this.convertToMinutes(startTime, ampmStartTime) <= 0) {
      alert('Starting time cannot be less than or similar to ending time');
      return false;
    }
    return true;
  }

  validateTime() {
    return this.checkIfWithinTimeLimit(this.props.startTime, true)
      && this.checkIfWithinTimeLimit(this.props.endTime, false)
      && this.checkIfTimeIsReversed();
  }

  setAmPmStartTime(e) {
    this.setState({ ampmStartTime: e.target.value });
  }

  setAmPmEndTime(e) {
    this.setState({ ampmEndTime: e.target.value });
  }

  optionAmPmStartTime() {
    return (
      <select id="ampmOptStrtTm" onChange={this.setAmPmStartTime}>
        <option value="am">am</option>
        <option value="pm">pm</option>
      </select>
    );
  }

  optionAmPmEndTime() {
    return (
      <select id="ampmOptEndTm" onChange={this.setAmPmEndTime}>
        <option value="am">am</option>
        <option value="pm">pm</option>
      </select>
    );
  }

  render() {
    const { name, comments, date, startTime, endTime, message } = this.props;
    const msg = {
      textAlign: 'center'
    };
    const table = {
      marginLeft: 'auto',
      marginRight: 'auto',
    };
    return (
      <div>
        <h2 style={msg}>Book an Appointment</h2>
        <h3 style={msg}>{message}</h3>
        <table style={table}>
          <tbody>
            <tr>
              <td>Name:</td><td><input name="name" value={name} onChange={this.handleName} /></td>
            </tr>
            <tr>
              <td>Comments:</td><td><input name="comments" value={comments} onChange={this.handleComments} /></td>
            </tr>
            <tr>
              <td>Date:</td><td><input type="date" name="comments" value={date} onChange={this.handleDate} /></td>
            </tr>
            <tr>
              <td>From:</td><td><input name="startTime" value={startTime} onChange={this.handleStartTime} />{this.optionAmPmStartTime()}</td>
            </tr>
            <tr>
              <td>To:</td><td><input name="endTime" value={endTime} onChange={this.handleEndTime} />{this.optionAmPmEndTime()}</td>
            </tr>
            <tr>
              <td></td><td><button onClick={() => this.handleSubmit()}>Submit</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };
}

export default AddBooking;