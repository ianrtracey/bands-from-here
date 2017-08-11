import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { changeSelection } from '../actions/citySelectorActions';

class CitySelectorImpl extends React.Component {

  render() {
    return (
      <Select
      name="form-field-name"
      value={this.props.value}
      options={this.props.options}
      onChange={this.props.onChange}
      />

    )

  }
}

const mapStateToProps = (state) => {
  console.log('state', state)
  return {
    label: state.citySelector.label,
    value: state.citySelector.value,
    options: state.citySelector.options.map((option) => {
      return {
        value: option.playlist_id,
        label: `${option.city}, ${option.state}`,
      }
    }),
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

