

const toTimeTrack = (num) => {
  let myTime = new Date(num);
  let formatedTime = myTime.getMinutes() + ':' + myTime.getSeconds() + '.' +  myTime.getMilliseconds()
  return formatedTime
}

export default toTimeTrack;