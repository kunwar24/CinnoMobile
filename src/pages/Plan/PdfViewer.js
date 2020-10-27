import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { MobilePDFReader } from 'reactjs-pdf-view';
import { utility } from '../../utility';

//redux actions
import { applicationSetting } from "../../redux/actions";

export default (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(applicationSetting({ title: props.match.params.planName }));
  }, []);
  return <div style={{ overflow: 'scroll', height: 600 }}>
    <MobilePDFReader url={utility.pdfUrl} />
  </div>
};
