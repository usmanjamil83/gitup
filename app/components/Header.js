// Include React
var React = require("react");

// Create the Header component
var Header = React.createClass({
  render: function() {
    return (
      <div className="nav-wrapper  teal teal lighten-2">
        <a href="/" className="brand-logo left">gitUp</a>
        <img src="./assets/img/logo_notxt_final.png" className="brand-logo center catopus"/>
        <ul id="nav-mobile" className="right">
          <li><a href="/">Home</a></li>
          <li><a href="profile">Profile</a></li>
        </ul>
      </div>
    	);
  }
});

// Export the component back for use in other files
module.exports = Header;