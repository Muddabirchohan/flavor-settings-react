import React, { Component } from "react";
import {
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  Button,
  Dropdown,
  ListGroup,
  Col
} from "react-bootstrap";
import axios from "axios";

export default class FlavorList extends Component {
  constructor() {
    super();
    this.state = {
      flavors: []
    };
  }

  componentDidMount() {
    axios("http://localhost:8005/prices/flavors").then(res => {
      const list = res.data;
      this.setState({
        flavors: list
      });
    });
  }

  render() {
    return (
      <div style={{ width: "600px" }}>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />

          <Button variant="outline-success">Search</Button>
        </Form>

        <Form>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridState">
              <Form.Control as="select">
                {this.state.flavors.map(item => {
                  return <option> {item.flavor.name} </option>;
                })}
              </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form.Row>
        </Form>
      </div>
    );
  }
}
