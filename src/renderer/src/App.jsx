import Versions from './components/Versions'
import electronLogo from './assets/electron.svg'
import React, { useState, useEffect } from 'react';


function App() {
  const ipcHandle = () => window.electron.ipcRenderer.send('ping')
  const [updateMessage, setUpdateMessage] = useState("");
  
  useEffect(() => {
    window.electron.ipcRenderer.send("updateMessage");
    window.electron.ipcRenderer.once("update-message-reply", (_2, data) => {
      setUpdateMessage(data);
      if (data.includes('Güncelleme mevcut')) {
        setIsModalOpen(true);
      }
    });
    return () => {
      window.electron.ipcRenderer.removeAllListeners("update-message-reply");
    };
  }, []); console.log(updateMessage);

  return (
    <>
      <img alt="logo" className="logo" src={electronLogo} />
      <div className="creator">Powered by electron-vite</div>
      <div className="text">
        Build an Electron app with <span className="react">React</span>
      </div>
      <p className="tip">
        Please try pressing <code>F12</code> to open the devTool
      </p>
      <div className="actions">
        <div className="action">
          <a href="https://electron-vite.org/" target="_blank" rel="noreferrer">
            Documentation
          </a>
        </div>
        <div className="action">
          <a target="_blank" rel="noreferrer" onClick={ipcHandle}>
            Send IPC
          </a>
        </div>
      </div>
      <Versions></Versions>
    </>
  )
}

export default App

