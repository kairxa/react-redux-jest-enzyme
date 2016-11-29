import React from 'react';
import { connect } from 'react-redux';

import getAnnouncementsAction, { getAnnouncementsSelector } from '../../redux/getAnnouncements';

import Actions from './Actions';
import Announcement from './Announcement';

import styles from './style.pcss';

export const mapStateToProps = state => ({
  announcements: getAnnouncementsSelector(state.getAnnouncements).announcements,
});

/**
 * Renders Announcements page.
 *
 * @export
 * @class Announcements
 * @extends {React.Component}
 */
export class Announcements extends React.Component {
  /**
   * Creates an instance of Announcements.
   *
   * @param {any} props
   *
   * @memberOf Announcements
   */
  constructor(props) {
    super(props);

    this.state = {
      searchString: '',
      searchDate: '',
    };

    this.handleChangeSearchString = this.handleChangeSearchString.bind(this);
    this.handleChangeSearchDate = this.handleChangeSearchDate.bind(this);
    this.handleSubmitSearchString = this.handleSubmitSearchString.bind(this);
    this.handleSubmitSearchDate = this.handleSubmitSearchDate.bind(this);
  }

  /**
   * Handles change event from input:text#search
   *
   * @param {Event} event
   *
   * @memberOf Announcements
   */
  handleChangeSearchString(event) {
    this.setState({
      searchString: event.target.value,
    });
  }

  /**
   * Handles change event from input:date#date
   *
   * @param {Event} event
   *
   * @memberOf Announcements
   */
  handleChangeSearchDate(event) {
    const newDate = new Date(event.target.value);
    this.setState({
      searchDate: newDate.toISOString(),
    });
  }

  /**
   * Handles submit event from form#searchAnnouncementsString
   *
   * @param {Event} event
   *
   * @memberOf Announcements
   */
  handleSubmitSearchString(event) {
    event.preventDefault();

    this.props.dispatch(getAnnouncementsAction(this.state.searchString));
  }

  /**
   * Handles submit event from form#searchAnnouncementsDate
   *
   * @param {Event} event
   *
   * @memberOf Announcements
   */
  handleSubmitSearchDate(event) {
    event.preventDefault();

    this.props.dispatch(getAnnouncementsAction(this.state.searchDate));
  }

  /**
   * TODO: Finalize data model with backend.
   * announcement.owner and announcement.content are not finalized.
   *
   * @returns
   *
   * @memberOf Announcements
   */
  render() {
    return (
      <article className={styles.container}>
        <Actions
          onChangeSearchString={this.handleChangeSearchString}
          onChangeSearchDate={this.handleChangeSearchDate}
          onSubmitSearchString={this.handleSubmitSearchString}
          onSubmitSearchDate={this.handleSubmitSearchDate}
        />
        {this.props.announcements ? this.props.announcements.map((announcement, key) => (
          <Announcement
            key={key}
            owner={announcement.owner}
            content={announcement.content}
          />
        )) : ''}
      </article>
    );
  }
}

Announcements.propTypes = {
  dispatch: React.PropTypes.func,
  announcements: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      owner: React.PropTypes.shape({}),
      content: React.PropTypes.shape({}),
    })
  ),
};

export default connect(mapStateToProps)(Announcements);
