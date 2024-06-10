import moment from "moment";

export const FormatTimeStamp = (timestamp) => {
  const now = moment();
  const time = moment(timestamp);

  if (now.diff(time, 'seconds') < 60) {
    return "now";
  } else if (now.diff(time, 'minutes') < 60) {
    return `${now.diff(time, 'minutes')} minutes ago`;
  } else if (now.diff(time, 'hours') < 24) {
    return `${now.diff(time, 'hours')} hours ago`;
  } else if (now.diff(time, 'days') < 7) {
    return `${now.diff(time, 'days')} days ago`;
  } else {
    return time.format("MMM D, YYYY h:mm A");
  }
};
