import moment from "moment";

export const formateDate = (someDate) => {
  let dateStringWithTime = moment(someDate).format('DD.MM.YYYY HH:mm');
  return `${dateStringWithTime}h`;
};