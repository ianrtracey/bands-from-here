import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { changeSelection } from '../actions/citySelectorActions';

class CitySelectorImpl extends React.Component {


  render() {
    const options = [
      { value: 'san-francisco-ca-us', label: 'San Francisco, CA' },
      { value: 'ny-ny-us', label: 'New York, NY' },
      { value: 'austin-tx-us', label: 'Austin, TX' },
      { value: 'boston-ma-us', label: 'Boston, MA'},
      { value: 'los-angeles-us', label: 'Los Angeles, CA' },
    ];
    return (
      <Select
      name="form-field-name"
      value={this.props.selected.value}
      options={options}
      onChange={this.props.onChange}
      />

    )

  }
}

const mapStateToProps = (state) => {
  return {
    selected: state.citySelection
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChange: selectorValue => {
      dispatch(changeSelection(selectorValue))
    }
  }
}

export const CitySelector = connect(
                              mapStateToProps,
                              mapDispatchToProps
)(CitySelectorImpl);

