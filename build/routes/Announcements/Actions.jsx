import React from 'react';
import { Link } from 'react-router';

import styles from './style.pcss';

import SearchIcon from '../../images/ic_search_24px.svg';

/**
 * Renders Actions component in Announcements page.
 *
 * @param {any} props
 */
const Actions = props => (
  <section className={styles.containerActions}>
    <div className={styles.containerActionsLeft}>
      <form
        className={styles.containerInput}
        id="searchAnnouncementsString"
        onSubmit={props.onSubmitSearchString}
      >
        <input
          type="text"
          name="search"
          id="search"
          className={styles.inputText}
          placeholder="Search"
          onChange={props.onChangeSearchString}
        />
        <button className={styles.inputAction}>
          <SearchIcon />
        </button>
      </form>
      <form
        className={styles.containerInput}
        id="searchAnnouncementsDate"
        onSubmit={props.onSubmitSearchDate}
      >
        <input
          type="date"
          name="date"
          id="date"
          className={styles.inputText}
          placeholder="Search by Date (YYYY/MM/DD)"
          onChange={props.onChangeSearchDate}
        />
        <button type="submit" className={styles.inputAction}>
          <SearchIcon />
        </button>
      </form>
    </div>
    <div className={styles.containerActionsRight}>
      <Link to="somewhere" className={styles.button}>
        NEW ANNOUNCEMENT
      </Link>
    </div>
  </section>
);

Actions.propTypes = {
  onChangeSearchString: React.PropTypes.func.isRequired,
  onChangeSearchDate: React.PropTypes.func.isRequired,
  onSubmitSearchString: React.PropTypes.func.isRequired,
  onSubmitSearchDate: React.PropTypes.func.isRequired,
};

export default Actions;
