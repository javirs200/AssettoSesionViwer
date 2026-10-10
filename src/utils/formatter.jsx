

const toTimeTrack = (L) => {
  if (!L) {
    return "No time"
  } else if (L.time) {
    if (L.time >= 0) {
      return formatTime(L.time)
    } else if (L.time === -1) {
      // off track lap , pick sector times and sum them up
      let totalTime = 0
      L.sectors.forEach((SectorTime) => {
        totalTime += SectorTime
      })
      return `${formatTime(totalTime)} (off track)`
    }else {
      return "No time"
    }
  }
}

const formatTime = (time) => {
  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor(time / 1000) % 60;
  const milliseconds = time % 1000;
  return `${minutes}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(3, '0')}`;
};

export default toTimeTrack;