/* eslint-disable react/jsx-indent */
import React, { Component } from 'react';
import { connect } from 'react-redux';
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
// import WishListItem from './wishListItem';
import AddItem from './AddItem';
import UserCelebrationList from './UserCelebrationList';
import { fetchThunk, sessionCheckThunk } from '../../redux/actions/users';

class UserAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addNewItem: false,
      addNewDate: false,
      showAllDate: false,
      dropdownOpen: false
    };
  }

  componentDidMount = () => {
    this.props.fetchCheckAuth();
  };

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };

  saveNewDate = async event => {
    event.preventDefault();
    if (event.target.name === 'title') {
      this.setState({
        ...this.state.users, //need to check if this.state.users needs .users???
        inputCelebrationTitle: event.target.value
      });
    } else {
      this.setState({
        ...this.state.users, //need to check if this.state.users needs .users???
        inputCelebrationDate: event.target.value
      });
    }

    const { _id } = this.props.user;
    // if (this.state.addNewDate) {
    //   this.setState({
    //     addNewDate: false
    //   });
    // } else {
    //   this.setState({
    //     addNewDate: true
    //   });
    // }
  };

  addNewDate = event => {
    // console.log(event.target);
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
    console.log(event.target);
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
    const spinner = <div>Loading...</div>;
    const location = this.props.location.pathname;
    const newDatePath = location + 'newCelebration';
    const {
      img,
      name,
      celebrationDate,
      wishItem
    } = this.props.usersReducer.user;

    return (
      <div>
        {this.props.usersReducer.user === '' ? (
          spinner
        ) : (
          <Container>
            <Row>
              <Col xs="3">
                <Container>
                  <Image src={img} size="Large" />
                </Container>
              </Col>
              <Col xs="9">
                <br />
                <Row>
                  <Col>
                    <h3>{name}</h3>
                  </Col>
                </Row>
                <br></br>
                <Row>
                  <Col>
                    {this.state.showAllDate ? (
                      <div>
                        <ul>
                          {celebrationDate.length
                            ? celebrationDate.map((element, index) => (
                                <UserCelebrationList
                                  id={index}
                                  key={index}
                                  title={element.title}
                                  date={element.date}
                                />
                              ))
                            : 'loading'}
                        </ul>
                      </div>
                    ) : (
                      <div>
                        {celebrationDate.length ? (
                          <div>
                            <Row>
                              <Col>
                                <h4>{celebrationDate[0].title}</h4>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <h5>{celebrationDate[0].date}</h5>
                              </Col>
                            </Row>
                          </div>
                        ) : (
                          'Ближайший праздник еще не добавлен'
                        )}
                      </div>
                    )}
                  </Col>
                  <Col>
                    <Button.Group size="medium">
                      <Button onClick={this.addNewDate}>Новый праздник</Button>
                      <Button.Or />
                      <Button onClick={this.showAllDate}>Все праздники</Button>
                    </Button.Group>
                  </Col>
                </Row>
                <Row>
                  <Col></Col>
                  <Col>
                    <Row>
                      <Col>
                        {this.state.addNewDate ? (
                          <Form
                            onChange={this.saveNewDate}
                            onSubmit={e => {
                              e.preventDefault();
                              this.saveNewDate;
                              this.props.fetchNewDate(this.state, newDatePath);
                            }}
                          >
                            <FormGroup>
                              <Input
                                // onChange={this.saveNewDate}
                                required
                                type="text "
                                name="title"
                                id="exampleDatetime"
                                placeholder="Your next big date"
                              />
                            </FormGroup>
                            <FormGroup>
                              <Input
                                // onChange={this.saveNewDate}
                                required
                                type="date"
                                name="date"
                                id="exampleDate"
                                placeholder="date placeholder"
                              />
                            </FormGroup>
                            <Button type="submit">Add Date</Button>
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
                          Добавить подарок
                        </Button>
                      </Col>
                      <Col xs="1"></Col>
                    </Row>
                    <ul>
                      {wishItem.length ? (
                        wishItem.map((element, index) => (
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
                      ) : (
                        <div>
                          <label htmlFor="">
                            У вас пока что нет подарков в вишлисте...
                          </label>
                          <br />
                        </div>
                      )}
                    </ul>
                  </div>
                ) : (
                  <AddItem addNewItem={this.addNewItem} location={location} />
                )}
              </Col>
              <Col xs="1" />
            </Row>
          </Container>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCheckAuth: () => dispatch(sessionCheckThunk()),
    fetchNewDate: (data, newDatePath) => dispatch(fetchThunk(data, newDatePath))
  };
};

const mapStateToProps = state => {
  return {
    ...state
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserAccount);
