import React from 'react'
import "bootstrap/dist/css/bootstrap.css";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

export default function Tooltip(props) {
  return (

    <OverlayTrigger
      key="top"
      placement="top"
      overlay={
        <Tooltip id='tooltip-top'>
          {props.message}
        </Tooltip>
      }
    >
      {props.children}
    </OverlayTrigger>
  )
}
