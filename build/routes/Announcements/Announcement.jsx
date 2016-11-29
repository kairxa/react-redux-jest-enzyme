import React from 'react';
import Markdown from 'react-markdown';
import { Link } from 'react-router';

import styles from './style.pcss';

import SettingsIcon from '../../images/ic_settings_24px.svg';

import datePrettifier from '../components/helpers/datePrettifier';

/**
 * Renders Announcement component in Announcements page.
 *
 * TODO: Finalize data model. owner and content are not finalized.
 *
 * @param {any} props
 */
const Announcement = props => (
  <section className={styles.containerAnnouncement}>
    <header className={styles.announcementHeader}>
      <div className={styles.profilePicture} style={{ backgroundImage: `url(${props.owner.picture})` }} />
      <div className={styles.profileName}>
        <Link to={`profile/${props.owner.id}`} className={styles.profileLink}>
          {props.owner.name}
        </Link>
        <span className={styles.profileTime}>
          {datePrettifier(props.content.createdAt, 'completeshort', 'Asia/Jakarta')}
        </span>
      </div>
      <div className={styles.settings}>
        <SettingsIcon className={styles.icon} />
      </div>
    </header>
    <section className={styles.announcementContent}>
      <Markdown source={props.content.title} />
      <div className={styles.announcementBanner}>
        <img src={props.content.cover} alt="Content" className={styles.bannerImage} />
      </div>
    </section>
  </section>
);

Announcement.propTypes = {
  owner: React.PropTypes.shape({
    name: React.PropTypes.string,
    id: React.PropTypes.string,
    picture: React.PropTypes.string,
  }),
  content: React.PropTypes.shape({
    title: React.PropTypes.string,
    cover: React.PropTypes.string,
    createdAt: React.PropTypes.string,
  }),
};

export default Announcement;
