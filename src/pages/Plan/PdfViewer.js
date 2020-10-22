import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
// import { PDFViewer } from "react-view-pdf";
// import { MobilePDFReader, PDFReader } from 'reactjs-pdf-reader';
// import { MobilePDFReader } from 'react-read-pdf';
import { MobilePDFReader } from 'reactjs-pdf-view';

//redux actions
import { applicationSetting } from "../../redux/actions";

export default (props) => {
  const dispatch = useDispatch();
  const pdfData = require("../../Docs/0410100.pdf");
  useEffect(() => {
    dispatch(applicationSetting({ title: props.match.params.planName }));
  }, []);
  // return (
  //   // <PDFViewer
  //   //   document={{
  //   //     url: "https://arxiv.org/pdf/quant-ph/0410100.pdf"
  //   //   }}
  //   // />
  //   <PDFViewer url={pdfData} />
  // );
  // return <div style={{ overflow: 'scroll', height: 600 }}>
  //   <MobilePDFReader url="https://arxiv.org/pdf/quant-ph/0410100.pdf" />
  // </div>
  // return <PDFReader url={"https://arxiv.org/pdf/quant-ph/0410100.pdf"}></PDFReader>
  return <div style={{ overflow: 'scroll', height: 600 }}>
    <MobilePDFReader url={pdfData} />
  </div>
};
