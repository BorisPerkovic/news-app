import React, { useState, useEffect } from 'react';
import { logFilesCommunicator } from '../../../Communicators/LogFilesCommunicator/LogFilesCommunicator';
import { LOG_FILES } from '../../../Constants/endpoints';

import classes from "./Logs.module.css";

const Logs = () => {

  const [logFile, setLogFile] = useState("");
  const [content, setContent] = useState("");

  const logFileHandler = (event) => {
    setLogFile(event.target.value);
  };

  const getLogFiles = async () => {
    const response = await logFilesCommunicator.getNewsList(logFile);
    setContent(response.split("<br />"));
  };

  useEffect(() => {
    getLogFiles();
  }, [logFile]);

  return (
    <article className={classes["logs__form"]}>
      <h2>Logs Files Section</h2>
        <select name="logs" id="logs" onChange={logFileHandler}>
            <option value="0">--Choose log file--</option>
            {LOG_FILES.map((item, index) => <option key={index} value={item}>{item}</option> )}
        </select>
        {content.length > 0 && content.map((item, index) => <p key={index}>{item}</p>)}
    </article>
  );
};

export default Logs;
