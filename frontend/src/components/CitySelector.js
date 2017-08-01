import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { changeSelection } from '../actions/citySelectorActions';

class CitySelectorImpl extends React.Component {


  render() {
    const options = [
      { value: 'san-francisco-ca-us', label: 'San Francisco, CA',
        image: 'https://farm8.staticflickr.com/7361/9259021382_486a9c8609_b.jpg'
      },
      { value: 'ny-ny-us', label: 'New York, NY',
        image: 'https://farm3.staticflickr.com/2370/2242260216_cb3d4e1fcd_b.jpg' },
        { value: 'austin-tx-us', label: 'Austin, TX',
          image: 'https://farm1.staticflickr.com/562/18863195504_a2faefd215_z.jpg' },
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

