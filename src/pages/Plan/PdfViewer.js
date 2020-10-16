import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { PDFViewer } from "react-view-pdf";

//redux actions
import { applicationSetting } from "../../redux/actions";

export default (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(applicationSetting({ title: props.match.params.planName }));
  }, []);
  return (
    // <PDFViewer
    //   document={{
    //     url: "https://arxiv.org/pdf/quant-ph/0410100.pdf"
    //   }}
    // />
    <PDFViewer url="https://arxiv.org/pdf/quant-ph/0410100.pdf" />
  );
};
