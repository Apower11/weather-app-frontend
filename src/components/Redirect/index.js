import { Component } from 'preact';
import { route } from 'preact-router';

// This is a redirect component which essentially detects
// a certain route that's passed in, and if that route
// has been passed in, it redirects to a different route
// which is also passed in.

export default class Redirect extends Component {
  componentWillMount() {
    route(this.props.to, true);
  }

  render() {
    return null;
  }
}