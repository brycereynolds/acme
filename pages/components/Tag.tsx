import * as css from './Tag.styl'
import React, { PureComponent } from 'react'
import classnames from 'classnames';

interface Props {
  label: string
  className: string
  onClick: Function
}

class ResultDocument extends PureComponent <Props, {}> {
  render() {
    const {
      label,
      className,
    } = this.props;

    return (
      <div className={classnames(css.tag, className)} onClick={this.onClick}>{label}</div>
    )
  }
  onClick = e => {
    e.preventDefault();
    this.props.onClick();
  }
}
export default ResultDocument;
