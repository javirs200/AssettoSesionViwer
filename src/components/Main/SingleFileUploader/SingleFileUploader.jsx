import React, { useState } from "react";

const SingleFileUploader = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setStatus("initial");
      setFile(e.target.files[0]);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault()
    const [item] = e.dataTransfer.items;
    console.log(item.getAsFile());
  }

  return (
    <>
      <div className="SingleFileUploader">
        <input className="dropAerea" id="file" type="file" onChange={handleFileChange} onDrop={handleDrop}/>
      </div>
      {file && (
        <section>
          File details:
          <ul>
            <li>Name: {file.name}</li>
            <li>Type: {file.type}</li>
            <li>Size: {file.size} bytes</li>
          </ul>
        </section>
      )}

      {file && (
        <>{file.name}</>
      )}
    </>
  );
};

export default SingleFileUploader;