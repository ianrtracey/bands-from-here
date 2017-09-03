import React from 'react';
import { connect } from 'react-redux';

export class SelectionBar extends React.Component {
    render() {
        return (
            <div>
                <article className="fl ba dark-gray b--black-10 w-100 center">
                    <img src={"https://i.scdn.co/image/2f91c3cace3c5a6a48f3d0e2fd21364d4911b332"} className="db w-100 br2 br--top" alt="Photo of playlist" />
                    <div className="pa2 ph3-ns pb3-ns">
                        <div className="dt w-100 mt1">
                            <div className="dtc">
                                <h1 className="f7 f5-ns mv0">Bands from</h1>
                                <h1 className="f2 f3-ns mv0">San Francisco, CA</h1>
                            </div>
                        </div>
                        <p className="f6 lh-copy measure mt2 mid-gray">
                            56 Artists
      <a className="f7 grow no-underline br-pill ph3 pv2 mb2 dib white bg-black fr"
                                style={{ "background-color": "#1DB954" }}
                                target="_"
                                href={"#"}>
                                Open in Spotify</a>
                        </p>
                    </div>
                </article>
            </div>
        )

    }
}