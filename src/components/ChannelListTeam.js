import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { LoadingChannels } from './LoadingChannels';
import { Avatar } from './Avatar';
import { ChatDown } from './ChatDown';
import { withChatContext } from '../context';


import { languageChangedEvent } from "../utils";





/**
 * ChannelList - A preview list of channels, allowing you to select the channel you want to open
 * @example ./examples/ChannelList.md
 */
class ChannelListTeam extends PureComponent {
  static propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.bool,
    /** Stream chat client object */
    client: PropTypes.object,
    showSidebar: PropTypes.bool,
    language: PropTypes.string,
    /* HACK: */
    onSelectSort: PropTypes.func
  };

  static defaultProps = {
    error: false,
    language: localStorage.getItem('language')
  };

  onLanguageChange(event) {
    window.dplChatConfig.language = event.target.value;
    window.dispatchEvent(languageChangedEvent);
    localStorage.setItem('language', window.dplChatConfig.language);

  }



  onSortChange(event) {
    const sort = {
    }
    sort[event.target.value] = -1;
    this.props.onSelectSort(sort);
  }

  SortingSelect = () => (
    <div>
      <select
        className="str-chat__channel-list-team__header--button"
        onChange={(e) => this.onSortChange(e)}>
        <option value="last_message_at">
          Nachrichtendatum
          </option>
        <option value="created_at">
          Erstelldatum
          </option>
      </select>
    </div>
  )

  FilterSelect = () => (
    <div>
      <select
        className="str-chat__channel-list-team__header--button"
      >
        <option value="support">
          Support
        </option>
        <option value="anfrage">
          Anfrage
        </option>
        <option value="loadinglocation">
          Standort
        </option>
        <option value="buchung">
          Buchung
        </option>
        <option value="others">
          Others
        </option>
      </select>
    </div>
  )

  LanguageSelect = () => (
    <select id="select"
      className="str-chat__channel-list-team__header--button"
      onChange={this.onLanguageChange}
      defaultValue={this.props.language}
    //TODO: Load User Language and show new messages in the selected Language
    >
      <option value="en">Englisch</option>
      <option value="de">Deutsch</option>
      <option value="es">Spanisch</option>
      <option value="it">Italienisch</option>
      <option value="pl">Polnisch</option>
    </select>
  )

  render() {
    const { showSidebar } = this.props;
    if (this.props.error) {
      return <ChatDown type="Connection Error" />;
    } else if (this.props.loading) {
      return <LoadingChannels />;
    } else {
      return (
        <div className="str-chat__channel-list-team">
          {showSidebar && (
            <div className="str-chat__channel-list-team__sidebar">
              <div className="str-chat__channel-list-team__sidebar--top">
                <Avatar
                  image="https://cdn.dribbble.com/users/610788/screenshots/5157282/spacex.png"
                  size={50}
                />
              </div>
            </div>
          )}
          <div className="str-chat__channel-list-team__main">
            <div className="str-chat__channel-list-team__header">
              <div className="str-chat__channel-list-team__header--left">
                <Avatar
                  source={this.props.client.user.image}
                  name={
                    this.props.client.user.name || this.props.client.user.id
                  }
                  size={40}
                />
              </div>
              <div className="str-chat__channel-list-team__header--middle">
                <div className="str-chat__channel-list-team__header--title">
                  {this.props.client.user.name || this.props.client.user.id}
                </div>
                <div
                  className={`str-chat__channel-list-team__header--status ${this.props.client.user.status}`}
                >
                  {this.props.client.user.status}
                </div>
              </div>
              <div className="str-chat__channel-list-team__header--right">
                <this.LanguageSelect></this.LanguageSelect>
              </div>
            </div>

            <div id="style-channel-selection" className="str-chat__channel-list-team__header--button">
              <this.SortingSelect></this.SortingSelect>
              {/* TODO: make it working */}
              <this.FilterSelect></this.FilterSelect>
            </div>
            <div id="style-list" className=".str-chat__channel-preview-messenger-list">
              {this.props.children}
            </div>

          </div>
        </div>
      );
    }
  }
}

ChannelListTeam = withChatContext(ChannelListTeam);
export { ChannelListTeam };



