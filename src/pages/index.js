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
import "../layouts/css/homepage.css";

import PageNav from "../components/PageNav";

class IndexPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activePatientName: '...',
      activePatientURL: ''
    }
  }

  componentWillMount() {

    let patients = Object.keys(this.props.patients).map(function(key){
      console.log(this.props.patients[key])

      const patient = this.props.patients[key];

      const patientId = patient.patientId;
      if ( patientId === this.props.activePatientId ) {
        this.setState({
          activePatientName: patient.firstName,
          activePatientURL: patient.info.profileImageURL
        })
      }


    }.bind(this))

  }

  render() {

    return (
      <div>
        <PageNav />
        <div className="page-body">
          Quickness
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
  currentEntryType
}) => {
  return { caregiverId, caregiverEmail, caregiverFirst, caregiverLast, patients, activePatientId, currentEntryType };
};

const mapDispatchToProps = dispatch => {
  return {
    increment: () => dispatch({ type: `INCREMENT` })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);
