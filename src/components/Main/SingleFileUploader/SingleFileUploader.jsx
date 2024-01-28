import React, { useState, useEffect } from "react";
import toTimeTrack from "../../../utils/formatter";

const SingleFileUploader = () => {

  const [sesionfile, setSesionFile] = useState(null);

  const [sesionObj, setSesionObj] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files) {
      const file0 = e.target.files[0]
      // console.log('manual load : ', file0);
      setSesionFile(file0);
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault()
    const [item] = e.dataTransfer.items;
    const fileDroped = item.getAsFile()
    // console.log('Droped load : ', fileDroped);
    setSesionFile(fileDroped);
  }

  useEffect(() => {
    async function fetchData() {
      if (sesionfile) {
        const RaceObj = JSON.parse(await sesionfile.text());
        console.log('useEffect : ', RaceObj);
        setSesionObj(RaceObj)
        const mapedLapsByDriver = RaceObj.sessions[0].laps.reduce((mapedLaps, item) => {
          const group = (mapedLaps[item.car] || []);
          group.push(item);
          mapedLaps[item.car] = group;
          return mapedLaps;
        }, {});
        // console.log('vueltas : ', mapedLapsByDriver);
        setSesionObj(mapedLapsByDriver)

      }

    }
    fetchData();
  }, [sesionfile])

  const drawList = () => {

    const myList = []

    const buildCols = (laps) => {

      const cols = []

      for (const l of laps) {
        const element = <td>
          {toTimeTrack(l.time)}
        </td>
        cols.push(element)
      }

      return cols

    }

    for (const key in sesionObj) {
      if (Object.hasOwnProperty.call(sesionObj, key)) {
        
        const element =
          <tr>
            <td>
              {key.toString()}
            </td>
            {buildCols(sesionObj[key])}
          </tr>;

        myList.push(element);

      }
    }
    return myList
  }

  return (
    <>
      <div className="SingleFileUploader">
        {sesionObj ? <>
          <table className="timeTable">
            <th>
              <td>driver</td>
            </th>
            {drawList()}
          </table>
        </>
          : <input className="dropAerea" id="file" type="file" onChange={handleFileChange} onDrop={handleDrop} />}
      </div>
    </>
  );
};

export default SingleFileUploader;