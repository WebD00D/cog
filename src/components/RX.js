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
import RowRX from "../components/RowRX";

class RX extends PureComponent {
  constructor(props) {
    super(props);

    this.openEditForm = this.openEditForm.bind(this);
    this.handleAddDisplay = this.handleAddDisplay.bind(this);
    this.handleAddRecord = this.handleAddRecord.bind(this);

    this.state = {
      addFormOpen: false,
      entryDate: '',
      entryTime: '',
      productType: '',
      prescribedBy: '',
      productName: '',
      strength: '',
      dose: '',
      timesPerDay: '',
      numberOfDays: '',
      purpose: '',
      sideEffects: '',
      helped: '',
      myCost: '',
      notes: ''
    };
  }

  openEditForm(record) {
    console.log("RECORD", record);
  }

  handleAddDisplay() {
    this.setState({
      addFormOpen: !this.state.addFormOpen
    });
  }

  handleAddRecord() {

    const dateTime = Date.now();

    fire
			.database()
			.ref(`entries/${this.props.activePatientId}/rx/${dateTime}`)
			.set({
        personId: this.props.activePatientId,
				entryDate: this.state.entryDate,
        entryTime: this.state.entryTime,
        productType: this.state.productType,
        prescribedBy: this.state.prescribedBy,
        productName: this.state.productName,
        strength: this.state.strength,
        dose: this.state.dose,
        timesPerDay: this.state.timesPerDay,
        numberOfDays: this.state.numberOfDays,
        purpose: this.state.purpose,
        sideEffects: this.state.sideEffects,
        helped: this.state.helped,
        myCost: this.state.myCost,
        notes: this.state.notes
			});

      this.setState({
        addFormOpen: false
      })

  }

  render() {
    let rxEntriesToDisplay;

    if (!this.props.rxEntries || this.props.rxEntries.length == 0) {
      rxEntriesToDisplay = <div>Full focus add new box</div>;
    } else {
      const rx = this.props.rxEntries;
      rxEntriesToDisplay = Object.keys(this.props.rxEntries).map(
        function(key) {
          return (
            <RowRX
              openEditForm={() => this.openEditForm(rx[key])}
              key={key}
              id={key}
              rx={rx[key]}
            />
          );
        }.bind(this)
      );
    }

    return (
      <div>
        {this.state.addFormOpen ? (
          <div className="add-form">
            <div className="add-form__form">
              <div className="add-form__header">Add Medicine</div>
              <i
                onClick={() => this.handleAddDisplay()}
                className="close-form-btn fa fa-close"
              />
              <div style={{ display: "flex", flexDirection: "column" }}>
              <div className="form-wrapper">
                <div className="input-wrap">
                  <label className="form-label">Date</label>
                  <input onChange={e => { this.setState({ entryDate: e.target.value }) }} className="form-input" />
                </div>
                <div className="input-wrap">
                  <label className="form-label">Time</label>
                  <input onChange={e => { this.setState({ entryTime: e.target.value }) }} className="form-input" />
                </div>
              </div>
                <div className="form-wrapper">
                  <div className="input-wrap">
                    <label className="form-label">Product Type</label>
                    <input onChange={e => { this.setState({ productType: e.target.value }) }} className="form-input" />
                  </div>
                  <div className="input-wrap">
                    <label className="form-label">Prescribed By</label>
                    <input onChange={e => { this.setState({ prescribedBy: e.target.value }) }} className="form-input" />
                  </div>
                </div>
                <div className="form-wrapper">
                  <div className="input-wrap">
                    <label className="form-label">Product Name</label>
                    <input onChange={e => { this.setState({ productName: e.target.value }) }} className="form-input" />
                  </div>
                  <div className="input-wrap">
                    <label className="form-label">Strength</label>
                    <input onChange={e => { this.setState({ strength: e.target.value }) }} className="form-input" />
                  </div>
                </div>
                <div className="form-wrapper">
                  <div className="input-wrap">
                    <label className="form-label">Dose</label>
                    <input onChange={e => { this.setState({ dose: e.target.value }) }} className="form-input" />
                  </div>
                  <div className="input-wrap">
                    <label className="form-label">Times / day</label>
                    <input onChange={e => { this.setState({ timesPerDay: e.target.value }) }} className="form-input" />
                  </div>
                </div>
                <div className="form-wrapper">
                  <div className="input-wrap">
                    <label className="form-label"># of Days</label>
                    <input onChange={e => { this.setState({ numberOfDays: e.target.value }) }} className="form-input" />
                  </div>
                  <div className="input-wrap">
                    <label className="form-label">Purpose</label>
                    <input onChange={e => { this.setState({ purpose: e.target.value }) }} className="form-input" />
                  </div>
                </div>
                <div className="form-wrapper">
                  <div className="input-wrap">
                    <label className="form-label">Side Effects</label>
                    <input onChange={e => { this.setState({ sideEffects: e.target.value }) }} className="form-input" />
                  </div>
                  <div className="input-wrap">
                    <label className="form-label">Helped?</label>
                    <input onChange={e => { this.setState({ helped: e.target.value }) }} className="form-input" />
                  </div>
                </div>
                <div className="form-wrapper">
                  <div className="input-wrap">
                    <label className="form-label">My Cost</label>
                    <input onChange={e => { this.setState({ myCost: e.target.value }) }} className="form-input" />
                  </div>
                  <div className="input-wrap">
                    <label className="form-label">Notes</label>
                    <input onChange={e => { this.setState({ notes: e.target.value }) }} className="form-input" />
                  </div>
                </div>
                <button
                  onClick={() => this.handleAddRecord()}
                  className="btn__addnew btn__addnew--sm"
                  style={{marginTop: '20px'}}
                >
                  Add Medicine
                </button>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}

        <div className="page-body">
          <div className="page-body-container">
            <div className="page-body__header">
              Rx, OTC, & Supplements
              <button
                onClick={() => this.handleAddDisplay()}
                className="btn__addnew"
              >
                Add New Medicine
              </button>
            </div>
            {rxEntriesToDisplay}
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

export default connect(mapStateToProps, mapDispatchToProps)(RX);
