import React, { useState, useEffect, useRef } from "react";
import {
  PDFDownloadLink,
  Document,
  Page,
  PDFViewer,
} from "@react-pdf/renderer";
import PDFGenerator from "./Pages/PDFGenerator";
import axios from "axios";

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/id_data')
      .then(response => {
        setData(response.data);
        console.log(data);
      })
      .catch(error => {
        console.log('error')
        
        console.error('There was an error fetching the data!', error);
      });
      
  }, []);

  const idList = (data.length !== 0) ? [data[data.length - 1].yearbookId] : []; // Replace this with your actual list of ids
  // console.log("idList = ",idList);
  console.log(data)

  let ids = [];
  if(data.length !== 0 && data[data.length - 1].otherSelectedPeople === ""){
    ids = [];
  }
  else{
    ids = (data.length !== 0) ? [JSON.parse(data[data.length - 1].otherSelectedPeople)] : [];
  }
  const downloadAnchorRef = useRef(null);
  const [readyToDownload, setReadyToDownload] = useState(false);
  // useEffect(() => {
  //   const generatePDFs = async () => {
  //     for (const id of idList) {
  //       // Simulate the asynchronous PDF generation process with a timeout
  //       await new Promise((resolve) => setTimeout(resolve, 5000));
  //       // Actual PDF generation logic can be placed here
  //     }
  //     setReadyToDownload(true);
  //     download()
  //   };

  //   generatePDFs();
  // }, []);

  function download(){
    const downloadLinks = downloadAnchorRef.current.querySelectorAll('a');
    downloadLinks.forEach((link) => link.click());
  }

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      {/* <div ref={downloadAnchorRef}>
          {idList.map((entry, index) => (
            <PDFDownloadLink
              key={entry}
              document={<PDFGenerator id={entry} idList={ids[index]} />}
              fileName={`Yearbook(${entry})`}
            >
              {({ loading }) => (loading ? 'Loading document...' : `Yearbook(${entry})`)}
            </PDFDownloadLink>
          ))}
        </div> */}
      {idList.map((entry, index) => (
        <PDFViewer key={entry} style={{ width: "100%", height: "100%" }}>
          <PDFGenerator id={entry} idList={ids[index]} />
        </PDFViewer>
      ))}
      
    </div>
  );
};

export default App;
