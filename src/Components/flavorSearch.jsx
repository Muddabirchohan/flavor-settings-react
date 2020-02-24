import FilterResults from "react-filter-search";
import React, { Component } from "react";
import { Card, ListGroup, Button, Modal, Form } from "react-bootstrap";
import axios from "axios";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      value: "",
      update: false,
      close: false
    };
  }

  componentDidMount() {
    fetch("http://localhost:8005/prices/flavors")
      .then(response => response.json())
      .then(json => {
        console.log("json", json);
        this.setState({ data: json });
      });
  }

  handleChange = event => {
    const { value } = event.target;
    this.setState({ value });
  };

  updateFlavor(event) {
    this.setState({ update: !this.state.update, flavor: event.flavor });
    console.log("event", event);
  }

  saveChanges(event) {
    const { updatedMode, updatedPrice, updatedName, updatedType } = this.state;
    const { flavor } = this.state;
    const { name, price, com, mod } = flavor;
    const data = {
      updatedMode: updatedMode === undefined ? mod : updatedMode,
      updatedName: updatedName === undefined ? name : updatedName,
      updatedPrice: updatedPrice === undefined ? price : updatedPrice,
      updatedType: updatedType === undefined ? com : updatedType
    };
    axios
      .patch(`http://localhost:8005/prices/${name}/${com}/${mod}`, { data })
      .then(res => console.log(res.data.result));
  }

  handleClose() {
    console.log("close");
    this.setState({ update: !this.state.update });
  }

  changeName(e) {
    console.log("e", e.target.value);
    this.setState({ updatedName: e.target.value });
  }

  changeFlavorType(e) {
    this.setState({ updatedType: e.target.value });
  }

  changeFlavorMode(e) {
    this.setState({ updatedMode: e.target.value });
  }

  changeFlavorPrice(e) {
    this.setState({ updatedPrice: e.target.value });
  }

  render() {
    const { data, value, update } = this.state;
    return (
      <div>
        <input type="text" value={value} onChange={this.handleChange} />
        <FilterResults
          value={value}
          data={data}
          renderResults={results => (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              <ListGroup>
                {results.map(el => (
                  <div>
                    <Card>
                      <ListGroup.Item>{`${el.flavor.name}/${el.flavor.mod}/${el.flavor.com}/${el.flavor.price}`}</ListGroup.Item>
                      <Button
                        style={{ width: "200px" }}
                        onClick={this.updateFlavor.bind(this, el)}
                      >
                        update flavor
                      </Button>
                    </Card>
                  </div>
                ))}
              </ListGroup>
              <Modal show={update} onHide={() => this.handleClose()}>
                <Modal.Header closeButton>
                  <Modal.Title> Update Flavor</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group controlId="formGroupEmail">
                      <Form.Label> Flavor Name </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter name"
                        defaultValue={this.state.flavor?.name}
                        onChange={e => this.changeName(e)}
                      />
                    </Form.Group>

                    <Form.Group controlId="formGroupEmail">
                      <Form.Label> Flavor type </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter type"
                        defaultValue={this.state.flavor?.com}
                        onChange={e => this.changeFlavorType(e)}
                      />
                    </Form.Group>

                    <Form.Group controlId="formGroupEmail">
                      <Form.Label> Flavor mod </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter mod"
                        defaultValue={this.state.flavor?.mod}
                        onChange={e => this.changeFlavorMode(e)}
                      />
                    </Form.Group>

                    <Form.Group controlId="formGroupEmail">
                      <Form.Label> Flavor price </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter price"
                        defaultValue={this.state.flavor?.price}
                        onChange={e => this.changeFlavorPrice(e)}
                      />
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={() => this.handleClose()}
                  >
                    Close
                  </Button>
                  <Button variant="primary" onClick={() => this.saveChanges()}>
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          )}
        />
      </div>
    );
  }
}
