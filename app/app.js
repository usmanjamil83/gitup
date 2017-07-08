// Include the Main React Dependencies
var React = require("react");
var ReactDOM = require("react-dom");

// We need to include all of the components we are utilizing
var Header = require("./components/Header");

ReactDOM.render(
// Here we dump all of the components into a single main-container
  <Header />
  , document.getElementById("app")
);