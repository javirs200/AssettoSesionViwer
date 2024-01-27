const toAsteriscString = (num) => {
  num = num.toString();
  while (num.length < 4) num = "0" + num;
  return "#" + num;
}

export default toAsteriscString;