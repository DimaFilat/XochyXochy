import React, { Component } from 'react';
import {
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Container,
  Row,
  Col
} from 'reactstrap';
import {
  Image,
  Divider,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  List
} from 'semantic-ui-react';
import UserSmallWishList from './UserSmallWishList';
import WishListItem from './wishListItem';
import AddItem from './AddItem';
import NewDate from './NewDate';
import UserCelebrationList from './UserCelebrationList';
// import { connect } from 'tls';
import { connect } from 'react-redux';

class UserAccount extends Component {
  state = { addNewItem: false };

  addNewItem = event => {
    const { addNewItem } = this.state;
    event.preventDefault();
    if (addNewItem) {
      this.setState({
        addNewItem: false
      });
    } else {
      this.setState({
        addNewItem: true
      });
    }
  };

  render() {
    const { user } = this.props.user;
    console.log('!!!!', this.props.user);
    return (
      <div>
        <Container>
          <NewDate {...user} />
          <AddItem addNewItem={this.addNewItem} />
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    // ...state
    user: state.usersReducer.user // Flows in the state to props in a component
  };
};

export default connect(mapStateToProps)(UserAccount);
