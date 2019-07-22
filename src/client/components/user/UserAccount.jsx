import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
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

export default class UserAccount extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,

      user: [
        { name: 'Jack', nextCelebration: 'Next Big Date' },
        { name: 'Mike', nextCelebration: 'Next Big Date' },
        { name: 'London', nextCelebration: 'Next Big Date' },
        { name: 'Willium', nextCelebration: 'Next Big Date' }
      ],
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

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }
  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col xs="3">
              <Container>
                <Image
                  src="https://image.flaticon.com/icons/png/512/149/149071.png"
                  size="medium"
                />
              </Container>
            </Col>
            <Col xs="9">
              <br />
              <Row>
                <Col>
                  <h4>THIS USER NAME</h4>
                </Col>
              </Row>
              <br></br>
              <Row>
                <Col>THIS USER NEXT CELEB DATE</Col>
                <Col>
                  <Button.Group size="large">
                    <Button>One</Button>
                    <Button.Or />
                    <Button>Three</Button>
                  </Button.Group>
                </Col>
              </Row>
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col xs="1"></Col>
            <Col xs="10">
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
            </Col>
            <Col xs="1"></Col>
          </Row>
        </Container>
      </div>
    );
  }
}
