import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Link from "gatsby-link";
import cx from "classnames";
import _ from "lodash";
import fire from '../fire';

import "../layouts/css/site.css";

class Navbar extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {

    }

  }

  render() {

    return (
      <div className="navbar">
        <img className="navbar__logo" src={require('../layouts/images/maya_logo.png')} />
        <div className="navbar__links">
          <Link className="navbar__link" to="/">Dashboard</Link>
          <Link className="navbar__link" to="/">Calendar</Link>
          <Link className="navbar__link" to="/make-entry">Make an Entry</Link>
          <Link className="navbar__link" to="/">All About Me</Link>
          <Link className="navbar__link" to="/">Notes</Link>
          <Link className="navbar__link" to="/">Reports</Link>
          <Link className="navbar__link" to="/">Analysis</Link>
          <Link className="navbar__link" to="/">Documents</Link>
          <Link className="navbar__link" to="/">Forms</Link>
        </div>

      </div>
    )

  }

}



export default Navbar;
