import * as css from './Count.styl'
import React, { PureComponent } from 'react'
import classnames from 'classnames';

interface Props {
  count: any
  category: any
  onClick: Function
}

const categoryLookup = (category) => ({
  'DOCUMENT': {
    className: css.document,
    label: 'documents',
  },
  'MESSAGE': {
    className: css.message,
    label: 'messages',
  },
  'PERSON': {
    className: css.person,
    label: 'people',
  },
  'EVENT': {
    className: css.event,
    label: 'events',
  },
}[category])

class Count extends PureComponent <Props, {}> {
  render() {
    const {
      count,
      category
    } = this.props;

    // Normally would handle this outside -- but out of time
    if(count === 'UNKNOWN'){
      return null;
    }

    const lookup = categoryLookup(category);

    return (
      <div
        className={classnames(css.container, lookup.className)}
        onClick={this.onClick}
        >
        <div className={css.offHover}>{count}</div>
        <div className={css.onHover}>{lookup.label} - {count}</div>
      </div>
    )
  }

  onClick = e => {
    e.preventDefault();
    this.props.onClick(this.props.category);
  }
}
export default Count;
