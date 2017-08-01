import React from 'react';
import classnames from 'classnames';

export default class Image extends React.Component {

  onImageLoad() {
    if(this.isMounted()) {
      // dispatch loaded action
    }
  }


  render()  {
    const { className, ...props } = this.props
    const imgClassName = classNames(className, 'image', {
      'image-loaded': props.isLoaded
    })
    return <img {...props className={rootClassName} />
  }

}
