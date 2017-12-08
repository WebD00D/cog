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
import "../layouts/css/site.css";

import PageNav from "../components/PageNav";


class EntryPage extends PureComponent {
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
          <div className="page-body-container">
              <div className="page-body__header">Make an entry</div>
              <div className="module-block__container">
                <Link to="/entry" onClick={() => this.props.setEntryType('RX') } className="module-block">
                  <img className="module-block__image" src={require('../layouts/images/icons/medicine@2x.png')}/>
                  <div className="module-block__title">Rx, OTC, & Supplements</div>
                </Link>
                <Link to="/entry" onClick={() => this.props.setEntryType('EXERCISE') } className="module-block">
                  <img className="module-block__image" src={require('../layouts/images/icons/excerise@2x.png')}/>
                  <div className="module-block__title">Exercise</div>
                </Link>
                <Link to="/entry" onClick={() => this.props.setEntryType('OBSERVATIONS') } className="module-block">
                  <img className="module-block__image" src={require('../layouts/images/icons/observations@2x.png')}/>
                  <div className="module-block__title">Observations</div>
                </Link>
                <Link to="/entry" onClick={() => this.props.setEntryType('MENSTRUAL') } className="module-block">
                  <img className="module-block__image" src={require('../layouts/images/icons/menstrual@2x.png')}/>
                  <div className="module-block__title">Menstrual</div>
                </Link>
                <Link to="/entry" onClick={() => this.props.setEntryType('MOOD') } className="module-block">
                  <img className="module-block__image" src={require('../layouts/images/icons/mood_1@2x.png')}/>
                  <div className="module-block__title">Mood</div>
                </Link>
                <Link to="/entry" onClick={() => this.props.setEntryType('BEHAVIORS') } className="module-block">
                  <img className="module-block__image" src={require('../layouts/images/icons/behavior@2x.png')}/>
                  <div className="module-block__title">Behaviors</div>
                </Link>
                <Link to="/entry" onClick={() => this.props.setEntryType('JOURNAL') } className="module-block">
                  <img className="module-block__image" src={require('../layouts/images/icons/journal@2x.png')}/>
                  <div className="module-block__title">Journal</div>
                </Link>
                <Link to="/entry" onClick={() => this.props.setEntryType('RESEARCH') } className="module-block">
                  <img className="module-block__image" src={require('../layouts/images/icons/research@2x.png')}/>
                  <div className="module-block__title">Research</div>
                </Link>
                <Link to="/entry" onClick={() => this.props.setEntryType('ALLERGIES') } className="module-block">
                  <img className="module-block__image" src={require('../layouts/images/icons/allergies_1@2x.png')}/>
                  <div className="module-block__title">Allergies</div>
                </Link>
                <Link to="/entry" onClick={() => this.props.setEntryType('SLEEP') } className="module-block">
                  <img className="module-block__image" src={require('../layouts/images/icons/sleep_1@2x.png')}/>
                  <div className="module-block__title">Sleep Schedule</div>
                </Link>
                <Link to="/entry" onClick={() => this.props.setEntryType('BATHROOM_1') } className="module-block">
                  <img className="module-block__image" src={require('../layouts/images/icons/#1@2x.png')}/>
                  <div className="module-block__title">Bathroom #1</div>
                </Link>
                <Link to="/entry" onClick={() => this.props.setEntryType('BATHROOM_2') } className="module-block">
                  <img className="module-block__image" src={require('../layouts/images/icons/#2@2x.png')}/>
                  <div className="module-block__title">Bathroom #2</div>
                </Link>
                <Link to="/entry" onClick={() => this.props.setEntryType('SYMPTOMS') } className="module-block">
                  <img className="module-block__image" src={require('../layouts/images/icons/symptoms@2x.png')}/>
                  <div className="module-block__title">Symptoms</div>
                </Link>
                <Link to="/entry" onClick={() => this.props.setEntryType('APPOINTMENTS') } className="module-block">
                  <img className="module-block__image" src={require('../layouts/images/icons/schedule@2x.png')}/>
                  <div className="module-block__title">Appointments</div>
                </Link>
                <Link to="/entry" onClick={() => this.props.setEntryType('STATS') } className="module-block">
                  <img className="module-block__image" src={require('../layouts/images/icons/bloodlevels@2x.png')}/>
                  <div className="module-block__title">Stats, Vitals, Labs, & Vaccines</div>
                </Link>
                <Link to="/entry" onClick={() => this.props.setEntryType('FOOD') } className="module-block">
                  <img className="module-block__image" src={require('../layouts/images/icons/food_1@2x.png')}/>
                  <div className="module-block__title">Food & Drink</div>
                </Link>
                <Link to="/entry" onClick={() => this.props.setEntryType('STATS') } className="module-block">
                  <img className="module-block__image" src={require('../layouts/images/icons/skills_1@2x.png')}/>
                  <div className="module-block__title">Skills & Independence</div>
                </Link>
                <Link to="/entry" onClick={() => this.props.setEntryType('INCOME') } className="module-block">
                  <img className="module-block__image" src={require('../layouts/images/icons/income@2x.png')}/>
                  <div className="module-block__title">Income & Expenses</div>
                </Link>
                <Link to="/entry" onClick={() => this.props.setEntryType('SEIZURE') } className="module-block">
                  <img className="module-block__image" src={require('../layouts/images/icons/income@2x.png')}/>
                  <div className="module-block__title">Seizure</div>
                </Link>
                <Link to="/entry" onClick={() => this.props.setEntryType('ABC') } className="module-block">
                  <img className="module-block__image" src={require('../layouts/images/icons/income@2x.png')}/>
                  <div className="module-block__title">ABC</div>
                </Link>


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
  currentEntryType
}) => {
  return { caregiverId, caregiverEmail, caregiverFirst, caregiverLast, patients, activePatientId, currentEntryType };
};

const mapDispatchToProps = dispatch => {
  return {
    setEntryType: (entryType) => dispatch({ type: `SET_ENTRY_TYPE`, entryType })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EntryPage);
