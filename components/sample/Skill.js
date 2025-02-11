import React from "react";
import { Form, Row, Col, Button, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../../styles/createcom.module.css";

export default class Skill extends React.Component {
  constructor(props) {
    super(props);
    const stateData = {
      skill_name: "",
      description: "",
      dynamicRows: [{ id: 1, skillSetName: "" }],
    };

    this.state = {
      ...stateData,
    };
  }

  handleAddRow = () => {
    const { dynamicRows } = this.state;
    const newRow = { id: dynamicRows.length + 1, skillSetName: "" };
    this.setState({ dynamicRows: [...dynamicRows, newRow] });
  };

  handleSkillSetChange = (index, event) => {
    const { dynamicRows } = this.state;
    dynamicRows[index].skillSetName = event.target.value;
    this.setState({ dynamicRows });
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    // Implement your submit logic here
    console.log("Form Submitted", this.state);
  };

  renderBasicDetails = () => {
    const { skill_name, description } = this.state;
    const skillNameMaxLength = 50;
    const descriptionMaxLength = 200;

    return (
      <div className={styles.divMain1}>
        <fieldset className={styles.fieldsetWrapper}>
          <legend className={styles.legendsWrapper1}>Basic Details</legend>
          <Row className={styles.formRow}>
            <Col md={6}>
              <Form.Group className={styles.controlGroup1} controlId="skill_name">
                <Form.Label className={styles.required}>Skill Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter skill name"
                  value={skill_name}
                  name="skill_name"
                  onChange={this.handleInputChange}
                  maxLength={skillNameMaxLength}
                  required
                />
                <Form.Text className="text-muted">
                  {skill_name.length}/{skillNameMaxLength}
                </Form.Text>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className={styles.controlGroup1} controlId="description">
                <Form.Label className={styles.required}>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Enter description"
                  value={description}
                  name="description"
                  onChange={this.handleInputChange}
                  maxLength={descriptionMaxLength}
                  required
                />
                <Form.Text className="text-muted">
                  {description.length}/{descriptionMaxLength}
                </Form.Text>
              </Form.Group>
            </Col>
          </Row>
        </fieldset>
      </div>
    );
  };

  renderSkillSetDetails = () => {
    const { dynamicRows } = this.state;
    return (
      <div className={styles.divMain1}>
        <fieldset className={styles.fieldsetWrapper}>
          <legend className={styles.legendsWrapper1}>Skill Set Details</legend>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>id</th>
                <th>Skill Set Name</th>
              </tr>
            </thead>
            <tbody>
              {dynamicRows.map((row, index) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>
                    <Form.Control
                      type="text"
                      value={row.skillSetName}
                      onChange={(e) => this.handleSkillSetChange(index, e)}
                      required
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button onClick={this.handleAddRow}>+</Button>
        </fieldset>
      </div>
    );
  };

  renderCreateRecordForm = () => {
    return (
      <Form onSubmit={this.handleSubmit} className={styles.formWrapper}>
        {this.renderBasicDetails()}
        {this.renderSkillSetDetails()}
        <Button type="submit">Submit</Button>
      </Form>
    );
  };

  render() {
    const { setVisibility } = this.props;
    const { is_loading } = this.state;

    return (
      <div className={styles.mainWrapper}>
        {is_loading && (
          <div className={"loadingWrapper"}>
            <div className={"innerLoadingWrapper"}>
              <div className="bouncing-loader">
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
        )}

        <div className={styles.wrapper} onClick={(e) => e.stopPropagation()}>
          <img
            src="/assets/close-red.png"
            className={styles.closeButton}
            onClick={() => setVisibility(false)}
          />
          <div>
            <p className={styles.title}>Create Skill Details</p>
            {this.renderCreateRecordForm()}
            <div>
              <p style={{ color: "red", marginLeft: "3px", fontSize: "15px" }}>
                * are mandatory fields
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
