import * as css from './Result.styl'
import React, { PureComponent } from 'react'
import classnames from 'classnames';

import Tag from './Tag';

interface Props {
  record: any
  setSearchCategory: Function
  setSearchSource: Function
}

// NOTE: All of this code is basically hard-coded. In a real implementation
// we would want to abstract this to a schema driven UI.

const BULLET_CLASS = {
  'DOCUMENT': css.documentBullet,
  'MESSAGE': css.messageBullet,
  'PERSON': css.personBullet,
  'EVENT': css.eventBullet,
}

class ResultDocument extends PureComponent <Props, {}> {
  render() {
    return (
      <div className={css.result}>
        {/* <div className={classnames(css.bullet, BULLET_CLASS[record.category])}>•</div> */}
        <div className={css.body}>
          {this.renderBody()}
          {this.renderTags()}
        </div>
      </div>
    )
  }

  renderBody() {
    const { record } = this.props;
    switch (record.source) {
      case 'DROPBOX':
        return this.renderDropboxBody();
      case 'SLACK':
        return this.renderSlackBody();
      case 'CALENDAR':
        return this.renderCalendarBody();
      case 'CONTACTS':
        return this.renderContactBody();
      case 'TWITTER':
        return this.renderTweetBody();
      default:
        break;
    }
  }

  renderTimestamp() {
    const { record: { timestamp }} = this.props;
    return `(make pretty) ${timestamp}`;
  }

  renderDropboxBody() {
    const { record: { details } } = this.props;
    return (
      <div className={css.body}>
        <div className={css.title}>{details.title}</div>
        <div className={css.subTitle}>{details.path}</div>
        <div className={css.timestamp}>{this.renderTimestamp()}</div>
      </div>
    )
  }

  renderSlackBody() {
    const { record: { details } } = this.props;
    return (
      <div className={css.body}>
        <div className={css.title}>{details.author} <span className={css.channel}>#{details.channel}</span></div>
        <div className={css.quote}>{details.message}</div>
        <div className={css.timestamp}>{this.renderTimestamp()}</div>
      </div>
    )
  }

  renderCalendarBody() {
    const { record: { details } } = this.props;
    return (
      <div className={css.body}>
        <div className={css.title}>{details.title}</div>
        <div className={css.subTitle}>{details.invitees.join(', ')}</div>
        <div className={css.timestamp}>{this.renderTimestamp()}</div>
      </div>
    )
  }

  renderContactBody() {
    const { record: { details } } = this.props;
    return (
      <div className={css.body}>
        <div className={css.title}>{details.name} - {details.company}</div>
        <div className={css.timestamp}>{this.renderTimestamp()}</div>
      </div>
    )
  }

  renderTweetBody() {
    const { record: { details } } = this.props;
    return (
      <div className={css.body}>
        <div className={css.title}>{details.user}</div>
        <div className={css.quote}>{details.message}</div>
        <div className={css.timestamp}>{this.renderTimestamp()}</div>
      </div>
    )
  }

  renderTags() {
    const { record } = this.props;
    const tags = [];

    tags.push({
      label: headlineIt(record.source),
      className: css.tagSource,
      onClick: () => this.props.setSearchSource(record.source)
    })

    tags.push({
      label: headlineIt(record.category),
      className: css[`tag${headlineIt(record.category)}`],
      onClick: () => this.props.setSearchCategory(record.category)
    })

    return (
      <div className={css.tags}>
        {tags.map(tag => <Tag key={tag.label} {...tag} />)}
      </div>
    )
  }

  setSearchCategory = e => {
    e.preventDefault();
    this.props.onClick(this.props.category);
  }
}

const headlineIt = (val) => val.charAt(0).toUpperCase() + val.toLowerCase().slice(1)

export default ResultDocument;
