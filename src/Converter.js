import React, { useState } from 'react';

const Converter = () => {
  const [downloadSpeed, setDownloadSpeed] = useState(10);
  const [speedSelectValue, setSpeedSelectValue] = useState('Mbps');
  const [fileSize, setFileSize] = useState(1);
  const [fileSizeSelectValue, setFileSizeSelectValue] = useState('GB');
  const [showResult, setShowResult] = useState(false);

  function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);
    var s = Math.floor((d % 3600) % 60);

    var hDisplay = h > 0 ? h + (h === 1 ? ' hour, ' : ' hours, ') : '';
    var mDisplay = m > 0 ? m + (m === 1 ? ' minute, ' : ' minutes, ') : '';
    var sDisplay = s > 0 ? s + (s === 1 ? ' second' : ' seconds') : '';
    return hDisplay + mDisplay + sDisplay;
  }

  const result = () => {
    if (speedSelectValue === 'Mbps' && fileSizeSelectValue === 'MB') {
      let time = fileSize / (downloadSpeed / 8);
      return secondsToHms(time);
    }

    if (speedSelectValue === 'Mbps' && fileSizeSelectValue === 'GB') {
      let time = (fileSize * 1024) / (downloadSpeed / 8);
      return secondsToHms(time);
    }

    if (speedSelectValue === 'Gbps' && fileSizeSelectValue === 'GB') {
      let time = (fileSize * 1024) / ((downloadSpeed * 1024) / 8);
      console.log(time);
      return secondsToHms(time);
    }
  };

  const increaseSpeed = () => {
    setDownloadSpeed((oldSpeed) => {
      let newSpeed = parseInt(oldSpeed);
      return newSpeed + 1;
    });
  };

  const decreaseSpeed = () => {
    setDownloadSpeed((oldSpeed) => {
      let newSpeed = parseInt(oldSpeed);
      return newSpeed - 1;
    });
  };

  const increaseFileSize = () => {
    setFileSize((oldSize) => {
      let newSize = parseInt(oldSize);
      return newSize + 1;
    });
  };

  const decreaseFileSize = () => {
    setFileSize((oldSize) => {
      let newSize = parseInt(oldSize);
      return newSize - 1;
    });
  };

  return (
    <>
      <div className="container">
        <form onSubmit={(e) => e.preventDefault()}>
          {/* Download speed */}

          <div className="vertical-center">
            <div className="title">
              <h1>Download time calculator</h1>
              <h2>How long will it take to download?</h2>
            </div>
            <div className="card">
              <h2>How fast is your internet speed ?</h2>
              <label htmlFor="downloadSpeed">Download Speed</label>
              <button
                className="input-btn"
                type="button"
                onClick={increaseSpeed}
              >
                +
              </button>
              <input
                type="text"
                name="downloadSpeed"
                id="downloadSpeed"
                value={downloadSpeed}
                onChange={(e) => setDownloadSpeed(e.target.value)}
              />
              <button
                className="input-btn"
                type="button"
                onClick={decreaseSpeed}
              >
                -
              </button>
              <select
                name="downloadSpeed"
                value={speedSelectValue}
                onChange={(e) => setSpeedSelectValue(e.target.value)}
              >
                <option value="Mbps">Mbps</option>
                <option value="Gbps">Gbps</option>
              </select>
            </div>
            {/* FileSize */}
            <div className="card">
              <h2>What is the size of the file you want to download ?</h2>
              <label htmlFor="fileSize">Download Size</label>
              <button
                className="input-btn"
                type="button"
                onClick={increaseFileSize}
              >
                +
              </button>
              <input
                type="text"
                name="fileSize"
                id="fileSize"
                value={fileSize}
                onChange={(e) => setFileSize(e.target.value)}
              />
              <button
                className="input-btn"
                type="button"
                onClick={decreaseFileSize}
              >
                -
              </button>
              <select
                name="fileSize"
                value={fileSizeSelectValue}
                onChange={(e) => setFileSizeSelectValue(e.target.value)}
              >
                <option value="MB">MB</option>
                <option value="GB">GB</option>
              </select>
              <br />
              <button
                type="button"
                className="btn"
                onClick={() => setShowResult(true)}
              >
                Calculate
              </button>
            </div>
            {showResult && (
              <div className="card">
                <h2>
                  {`it would take ${result()} to transfer ${fileSize}
                  ${fileSizeSelectValue === 'GB' ? 'Gigabyte' : 'Megabyte'}
                  at ${
                    speedSelectValue === 'Mbps'
                      ? downloadSpeed / 8
                      : (downloadSpeed * 1024) / 8
                  } MB/s`}
                </h2>
              </div>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default Converter;
