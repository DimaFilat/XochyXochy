import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserCelebrationList from './UserCelebrationList';

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

class NewDate extends Component {
  state = {
    addNewDate: false,
    showAllDate: false,
    dropdownOpen: false
  };

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
    const { name } = this.props;
    return (
      <div>
        {console.log('NEWdate>>>>>>>>>', this.props)}
        <Row>
          <Col xs="3">
            <Container>
              <Image size="medium" />
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
                        <h4>this.state.user.celebrationDate.title</h4>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <h5>this.state.user.celebrationDate.date</h5>
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
              </div>
            ) : null}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    // ...state
    ...state.usersReducer.user // Flows in the state to props in a component
  };
};

export default connect(mapStateToProps)(NewDate);
