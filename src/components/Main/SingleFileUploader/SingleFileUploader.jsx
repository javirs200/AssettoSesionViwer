import { useState, useEffect } from "react";
import toTimeTrack from "../../../utils/formatter";

const SingleFileUploader = () => {

  const [sesionfile, setSesionFile] = useState(null);
  const [sesionObj, setSesionObj] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoadingDemo, setIsLoadingDemo] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    if (e.target.files?.[0]) {
      setError('');
      setSesionObj(null);
      setSesionFile(e.target.files[0]);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setError('');
      setSesionObj(null);
      setSesionFile(file);
    }
  }

  const handleLoadDemo = async () => {
    setIsLoadingDemo(true);
    setError('');
    try {
      const response = await fetch(`${import.meta.env.BASE_URL}demo-session.json`);
      if (!response.ok) {
        throw new Error('The demo session could not be loaded. Please try again.');
      }
      const demoFile = new File([await response.text()], 'demo-session.json', {
        type: 'application/json',
      });
      setSesionObj(null);
      setSesionFile(demoFile);
    } catch (loadError) {
      setError(loadError.message || 'The demo session could not be loaded.');
    } finally {
      setIsLoadingDemo(false);
    }
  };

  useEffect(() => {
    async function fetchData() {
      if (sesionfile) {
        try {
          const raceObj = JSON.parse(await sesionfile.text());
          const laps = raceObj.sessions?.[0]?.laps;
          if (!Array.isArray(laps)) {
            throw new Error('This file does not contain session lap data.');
          }
          if (laps.length === 0) {
            setError('No laps were found in this session file.');
            return;
          }
          const mapedLapsByDriver = laps.reduce((groupedLaps, lap) => {
            const driver = raceObj.players?.[lap.car]?.name || lap.car;
            const group = groupedLaps[driver] || [];
            group.push(lap);
            groupedLaps[driver] = group;
            return groupedLaps;
          }, {});
          setSesionObj(mapedLapsByDriver);
        } catch (readError) {
          setError(readError instanceof SyntaxError
            ? 'This file is not valid JSON. Choose a Content Manager session file.'
            : readError.message || 'The session file could not be read.');
        }
      }
    }
    fetchData();
  }, [sesionfile])

  const drivers = sesionObj ? Object.entries(sesionObj) : [];
  const lapCount = drivers.reduce((max, [, laps]) => Math.max(max, laps.length), 0);

  return (
    <section className="session-panel">
      <div className="panel-heading">
        <div>
          <span className="panel-kicker">SESSION DATA</span>
          <h2>{sesionObj ? 'Lap time report' : 'Load a session'}</h2>
        </div>
        {sesionObj ? (
          <button className="reset-button" type="button" onClick={() => {
            setSesionObj(null);
            setSesionFile(null);
            setError('');
          }}>
            LOAD ANOTHER
          </button>
        ) : (
          <div className="panel-actions">
            <button
              className="reset-button demo-button"
              type="button"
              onClick={handleLoadDemo}
              disabled={isLoadingDemo}
            >
              {isLoadingDemo ? 'LOADING DEMO...' : 'TRY DEMO'}
            </button>
            <a
              className="download-demo"
              href={`${import.meta.env.BASE_URL}demo-session.json`}
              download="assetto-session-demo.json"
            >
              DOWNLOAD JSON
            </a>
          </div>
        )}
      </div>

      {sesionObj ? (
        <div className="results-content">
          <div className="session-summary">
            <div><span>FILE</span><strong>{sesionfile?.name}</strong></div>
            <div><span>DRIVERS</span><strong>{drivers.length}</strong></div>
            <div><span>LAPS</span><strong>{drivers.reduce((total, [, laps]) => total + laps.length, 0)}</strong></div>
          </div>
          <div className="table-scroll">
            <table className="timeTable">
              <thead>
                <tr>
                  <th scope="col">DRIVER / CAR</th>
                  {Array.from({ length: lapCount }, (_, index) => (
                    <th scope="col" key={index}>LAP {index + 1}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {drivers.map(([driver, laps]) => (
                  <tr key={driver}>
                    <th scope="row">{driver}</th>
                    {laps.map((lap, index) => (
                      <td key={`${driver}-${index}`}>{toTimeTrack(lap)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div
          className={`drop-area${isDragging ? ' is-dragging' : ''}`}
          onDragEnter={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragOver={(e) => e.preventDefault()}
          onDragLeave={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) setIsDragging(false);
          }}
          onDrop={handleDrop}
        >
          <input
            className="file-input"
            id="session-file"
            type="file"
            accept=".json,application/json"
            onChange={handleFileChange}
          />
          <label className="drop-area-content" htmlFor="session-file">
            <span className="upload-icon" aria-hidden="true">↑</span>
            <strong>Drop your session file here</strong>
            <span>or <span className="browse-link">browse files</span> on your computer</span>
            <span className="file-hint">JSON SESSION FILES · PROCESSED LOCALLY</span>
          </label>
        </div>
      )}
      {!sesionObj && (
        <details className="file-location">
          <summary>Where can I find my session files?</summary>
          <p>In File Explorer, paste this path into the address bar:</p>
          <code>%LOCALAPPDATA%\AcTools Content Manager\Progress\Sessions</code>
        </details>
      )}
      {error && <p className="upload-error" role="alert">{error}</p>}
    </section>
  );
};

export default SingleFileUploader;