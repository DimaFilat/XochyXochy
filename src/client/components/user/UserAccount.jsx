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
import UserCelebrationList from './UserCelebrationList';
// import { connect } from 'tls';
import { connect } from 'react-redux';

class UserAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addNewItem: false,
      addNewDate: false,
      showAllDate: false,
      dropdownOpen: false,
      user: {
        // name: 'Jack',
        img: 'https://image.flaticon.com/icons/png/512/149/149071.png',
        celebrationDate: { title: 'Easter', date: 'Dynamic Date' }
      },
      wishItem: [
        {
          title: 'Cart',
          img: 'https://image.flaticon.com/icons/png/512/149/149071.png',
          rating: '3',
          price: '1500',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          messenger: [
            { userId: '123123', text: 'some text' },
            { userId: '122211', text: 'some more text' }
          ],
          active: true,
          reserve: false
        },
        {
          title: 'Book',
          img: 'https://image.flaticon.com/icons/png/512/149/149071.png',
          rating: '1',
          price: '1213',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          messenger: [
            { userId: '123123', text: 'some text' },
            { userId: '122211', text: 'some more text' }
          ],
          active: true,
          reserve: false
        },
        {
          title: 'Whiskey',
          img: 'https://image.flaticon.com/icons/png/512/149/149071.png',
          rating: '5',
          price: '22',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          messenger: [
            { userId: '123123', text: 'some text' },
            { userId: '122211', text: 'some more text' }
          ],
          active: true,
          reserve: false
        }
      ]
    };
  }

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };

  addNewDate = event => {
    event.preventDefault();
    if (this.state.addNewDate) {
      this.setState({
        addNewDate: false
      });
    } else {
      this.setState({
        addNewDate: true
      });
    }
  };

  addNewItem = event => {
    event.preventDefault();
    if (this.state.addNewItem) {
      this.setState({
        addNewItem: false
      });
    } else {
      this.setState({
        addNewItem: true
      });
    }
  };

  showAllDate = event => {
    event.preventDefault();
    if (this.state.showAllDate) {
      this.setState({
        showAllDate: false
      });
    } else {
      this.setState({
        showAllDate: true
      });
    }
  };

  render() {
    console.log('!!!!',this.props.user);
    return (
      <div>
        <Container>
          <Row>
            <Col xs="3">
              <Container>
                <Image src={this.state.user.img} size="medium" />
              </Container>
            </Col>
            <Col xs="9">
              <br />
              <Row>
                <Col>
                  <h3>{this.props.user.name}</h3>
                </Col>
              </Row>
              <br></br>
              <Row>
                <Col>
                  {this.state.showAllDate ? (
                    <div>
                      <ul>
                        {this.state.showAllDate ? (
                          <UserCelebrationList />
                        ) : (
                          'loading'
                        )}
                      </ul>
                    </div>
                  ) : (
                    <div>
                      <Row>
                        <Col>
                          <h4>{this.state.user.celebrationDate.title}</h4>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <h5>{this.state.user.celebrationDate.date}</h5>
                        </Col>
                      </Row>
                    </div>
                  )}
                </Col>
                <Col>
                  <Button.Group size="medium">
                    <Button onClick={this.addNewDate}>New date</Button>
                    <Button.Or />
                    <Button onClick={this.showAllDate}>Show all dates</Button>
                  </Button.Group>
                </Col>
              </Row>
              <Row>
                <Col></Col>
                <Col>
                  <Row>
                    <Col>
                      {this.state.addNewDate ? (
                        <Form>
                          <FormGroup>
                            <Input
                              type="datetime"
                              name="datetime"
                              id="exampleDatetime"
                              placeholder="Your next big date"
                            />
                          </FormGroup>
                          <FormGroup>
                            <Input
                              type="date"
                              name="date"
                              id="exampleDate"
                              placeholder="date placeholder"
                            />
                          </FormGroup>
                          <Button onClick={this.addNewDate}>Add Date</Button>
                        </Form>
                      ) : (
                        ' '
                      )}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col xs="1"></Col>
            <Col xs="10">
              {!this.state.addNewItem ? (
                <div>
                  <Row>
                    <Col xs="1"></Col>
                    <Col xs="10">
                      <Button onClick={this.addNewItem}>
                        What would you like to add to your WishList?
                      </Button>
                    </Col>
                    <Col xs="1"></Col>
                  </Row>
                  <ul>
                    {this.state.wishItem
                      ? this.state.wishItem.map((element, index) => (
                          <UserSmallWishList
                            id={index}
                            key={index}
                            title={element.title}
                            img={element.img}
                            rating={element.rating}
                            price={element.price}
                            description={element.description}
                            active={element.active}
                            reserve={element.reserve}
                          />
                        ))
                      : 'loading'}
                  </ul>
                </div>
              ) : (
                <AddItem addNewItem={this.addNewItem} />
              )}
            </Col>
            <Col xs="1"></Col>
          </Row>
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
