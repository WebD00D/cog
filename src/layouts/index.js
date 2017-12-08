import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";
import Helmet from "react-helmet";
import Navbar from "../components/Navbar";
import fire from '../fire';
import { connect } from "react-redux";
import "./index.css";


class TemplateWrapper extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Helmet
          title="MAYA"
          meta={[
            { name: "description", content: "Sample" },
            { name: "keywords", content: "sample, something" }
          ]}
        />

        <div className="maya-wrapper">
          <Navbar />
          <div className="maya-body">
              {this.props.children()}
          </div>
        </div>
      </div>
    );
  }
}


TemplateWrapper.propTypes = {
  children: PropTypes.func
};

export default TemplateWrapper;
