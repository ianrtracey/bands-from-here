import React from 'react';
import { connect } from 'react-redux';

class SelectionBarImpl extends React.Component {
    render() {
        return (
            <div className="dt mw9 left pv1 pv1-m pv1-ns">
                <h2>Bands from</h2>
                <h1>{this.props.title}</h1>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        title: state.citySelector.label
    }
}

export const SelectionBar = connect(mapStateToProps)(SelectionBarImpl)