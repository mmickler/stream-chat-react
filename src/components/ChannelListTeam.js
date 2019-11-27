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

  onSortChange(event){
    var sort = { 
      
    }
    sort[event.target.value] = -1;
    //var sort =  { last_message_at: sortingOrder } //{sort: event.target.value,  };
    this.props.onSelectSort(sort);  
  }

  SortingButtons = () => {
    return (
      <select>
        <option onClick={
          () => this.onSortChange("last_message_at")
          // () => this.onSorting('last_message_at')
          }>
        Sotiere Channels last_message_at
      </option>
        <option onClick={() => this.onSortChange('updated_at')}>
          Sortiere updated_at
    </option>
        <option onClick={() => this.onSortChange('created_at')}>
          Sortiere created_at
    </option>
        <option onClick={() => this.onSortChange('member_count')}>
          Sortiere member_count
    </option>
      </select>
    )
  }

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
                
                <SortingButtons></SortingButtons>
                
                
                
                <select className="str-chat__channel-list-team__header--button" id="select"
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
              </div>
            </div>
            {this.props.children}
          </div>
        </div>
      );
    }
  }
}

ChannelListTeam = withChatContext(ChannelListTeam);
export { ChannelListTeam };


//TRY TO USE FIND A BLACE FOR MY BUTTONS


// onSorting = (type) => {
//   //TODO: Live Channel Update maybe put it in ChannelList
//   //didn't work right, maybe the wrong place
//   const sortingOrder = -1;
//   switch (type) {
//     case "last_message_at":
//       this.setState({ ...this.state, sort: { last_message_at: sortingOrder } })
//       console.log(this.state.searchInput)
//       break;
//     case "updated_at":
//       this.setState({ ...this.state, ...{ sort: { updated_at: sortingOrder } } })
//       console.log(this.state.searchInput)
//       break;
//     case "created_at":
//       this.setState({ ...{ sort: { created_at: sortingOrder } } })
//       console.log(this.state.searchInput)
//       break;
//     case "member_count":
//       this.setState({ sort: { member_count: sortingOrder } })
//       console.log(this.state.searchInput)
//       break;
//     default:
//       console.log(this.state.sort);
//       break;
//   }
// }


