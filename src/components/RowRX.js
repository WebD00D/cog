import React, { PureComponent } from "react";
import Link from "gatsby-link";
import fire from "../fire";
import { Route, Redirect } from "react-router-dom";
import MapGL, { Marker, Popup, NavigationControl } from "react-map-gl";
import cx from "classnames";
import _ from "lodash";
import { connect } from "react-redux";
import "whatwg-fetch";
import "../layouts/css/fcss.css";
import "../layouts/css/entry.css";

import PageNav from "../components/PageNav";

class RowRX extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      rowOpen: false
    };
  }

  render() {

    const rx = this.props.rx;

    return (
      <div className="entry-row">
        <div className="entry-row__header">
          <div className="entry-row__title">
            <b>{rx.productName}</b>{" "}
            {this.state.rowOpen ? (
              <div onClick={() => this.props.openEditForm()} className="edit-info">EDIT INFO</div>
            ) : (
              ""
            )}
          </div>
          <div
            onClick={() => this.setState({ rowOpen: !this.state.rowOpen })}
            className="view"
          >
            {" "}
            {this.state.rowOpen ? "Close" : "View"}{" "}
            {this.state.rowOpen ? (
              <i className="fa fa-chevron-up" />
            ) : (
              <i className="fa fa-chevron-down" />
            )}
          </div>
        </div>
        <div
          className={cx([
            "entry-row__body ",
            { "entry-row__body--collapsed": !this.state.rowOpen }
          ])}
        >
          <div
            style={{
              marginTop: "30px",
              marginBottom: "30px",
              marginLeft: "30px",
              display: "flex",
              flexDirection: "column"
            }}
          >
            <div
              style={{
                marginBottom: "12px",
                display: "flex",
                flexDirection: "column"
              }}
            >
              <b>Date / Time:</b>
              <div>
                {rx.date} {rx.time}
              </div>
            </div>
            <div
              style={{
                marginBottom: "12px",
                display: "flex",
                flexDirection: "column"
              }}
            >
              <b>Product Type:</b>
              <div>{rx.productType}</div>
            </div>
            <div
              style={{
                marginBottom: "12px",
                display: "flex",
                flexDirection: "column"
              }}
            >
              <b>Prescribed By:</b>
              <div>{rx.prescribedBy}</div>
            </div>
            <div
              style={{
                marginBottom: "12px",
                display: "flex",
                flexDirection: "column"
              }}
            >
              <b>Strength:</b>
              <div>{rx.strength}</div>
            </div>
            <div
              style={{
                marginBottom: "12px",
                display: "flex",
                flexDirection: "column"
              }}
            >
              <b>Dose:</b>
              <div>{rx.dose}</div>
            </div>
            <div
              style={{
                marginBottom: "12px",
                display: "flex",
                flexDirection: "column"
              }}
            >
              <b>Times/Day:</b>
              <div>{rx.timesPerDay}</div>
            </div>
            <div
              style={{
                marginBottom: "12px",
                display: "flex",
                flexDirection: "column"
              }}
            >
              <b>Number of Days:</b>
              <div>{rx.numberOfDays}</div>
            </div>
            <div
              style={{
                marginBottom: "12px",
                display: "flex",
                flexDirection: "column"
              }}
            >
              <b>Purpose:</b>
              <div>{rx.purpose}</div>
            </div>
            <div
              style={{
                marginBottom: "12px",
                display: "flex",
                flexDirection: "column"
              }}
            >
              <b>Side Effects:</b>
              <div>{rx.sideEffects}</div>
            </div>
            <div
              style={{
                marginBottom: "12px",
                display: "flex",
                flexDirection: "column"
              }}
            >
              <b>Helped:</b>
              <div>{rx.helped}</div>
            </div>
            <div
              style={{
                marginBottom: "12px",
                display: "flex",
                flexDirection: "column"
              }}
            >
              <b>My Cost:</b>
              <div>${rx.myCost}</div>
            </div>
            <div
              style={{
                marginBottom: "12px",
                display: "flex",
                flexDirection: "column"
              }}
            >
              <b>Notes:</b>
              <div>{rx.notes}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({
  caregiverId,
  caregiverEmail,
  caregiverFirst,
  caregiverLast,
  patients,
  activePatientId,
  currentEntryType,
  rxEntries
}) => {
  return {
    caregiverId,
    caregiverEmail,
    caregiverFirst,
    caregiverLast,
    patients,
    activePatientId,
    currentEntryType,
    rxEntries
  };
};

const mapDispatchToProps = dispatch => {
  return {
    increment: () => dispatch({ type: `INCREMENT` })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RowRX);
