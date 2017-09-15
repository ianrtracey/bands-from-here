import React, {
  Component,
  PropTypes
} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { changeSelect } from '../actions/';
import Main from '../components/AppComponent';
import { BrowserRouter } from 'react-router-dom';
/* Populated by react-webpack-redux:reducer */
class App extends Component {
  render() {
    const {actions, select} = this.props;

    return (
      <BrowserRouter>
        <Main actions={actions} select={select} />
      </BrowserRouter>
    );
  }
}
/* Populated by react-webpack-redux:reducer
 *
 * HINT: if you adjust the initial type of your reducer, you will also have to
 *       adjust it here.
 */
App.propTypes = {
  actions: PropTypes.shape({ changeSelect: PropTypes.func.isRequired }),
  select: PropTypes.shape({})
};
function mapStateToProps(state) {
  // eslint-disable-line no-unused-vars
  /* Populated by react-webpack-redux:reducer */
  const props = { select: state.select };
  return props;
}
function mapDispatchToProps(dispatch) {
  /* Populated by react-webpack-redux:action */
  const actions = { changeSelect };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
