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
          <Row>
            <Col xs="3">
              <Container>
                <Image src={img} size="medium" />
              </Container>
            </Col>
            <Col xs="9">
              <br />
              <Row>
                <Col>{/* <h3>{this.props.user.name}</h3> */}</Col>
              </Row>
              <br></br>
              <Row>
                <Col>
                  {this.state.showAllDate ? (
                    <div>
                      <ul>
                        {this.props.user.celebrationDate
                          ? this.props.user.celebrationDate.map(
                              (element, index) => (
                                <UserCelebrationList
                                  id={index}
                                  key={index}
                                  title={element.title}
                                  date={element.date}
                                />
                              )
                            )
                          : 'loading'}
                      </ul>
                    </div>
                  ) : (
                    <div>
                      <Row>
                        <Col>
                          <h4></h4>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <h5></h5>
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
                        What would you like to add to your WishList?
                      </Button>
                    </Col>
                    <Col xs="1"></Col>
                  </Row>

                  {/* <ul>
                    {this.props.user.wishItem.length
                      ? this.props.wishItem.map((element, index) => (
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
                      : 'ADD SOME GIF'}
                  </ul> */}
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
