

const toTimeTrack = (L) => {
  console.log('toTimeTrack : ', L);
  if (!L) {
    return "No time"
  } else if (L.time) {
    if (L.time >= 0) {
      let myTime = new Date(L.time);
      let formatedTime = myTime.getMinutes() + ':' + myTime.getSeconds() + '.' + myTime.getMilliseconds()
      return formatedTime
    } else if (L.time === -1) {
      // off track lap , pick sector times and sum them up
      let totalTime = 0
      L.sectors.forEach((SectorTime) => {
        totalTime += SectorTime
      })
      let myTime = new Date(totalTime);
      let formatedTime = myTime.getMinutes() + ':' + myTime.getSeconds() + '.' + myTime.getMilliseconds() + ' (off track)'
      return formatedTime
    }else {
      return "No time"
    }
  }
}

export default toTimeTrack;