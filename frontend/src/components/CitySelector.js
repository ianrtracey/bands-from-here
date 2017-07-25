import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { changeSelection } from '../actions/citySelectorActions';

class CitySelectorImpl extends React.Component {


  render() {
    const options = [
      { value: 'one', label: 'One' },
      { value: 'two', label: 'Two' }
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

