import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import Colors from "../../constants/colors";
import styles from "../../styles/createcom.module.css";
import { Form, Row, Col, Button, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default class EmProjDet extends React.Component {
  constructor(props) {
    super(props);
    const stateData = {
      tnnt_id: global.config.tnnt_id,
      username: "",
      role_id: global.config.user_role,
      is_loading: false,
      selectedData: undefined,
      editable: undefined,
      proj_name: "",
      start_date: "",
      arr_dropdown: [],
      dynamicRows: [{ id: 1, roleName: "" }],
    };
    stateData.editable = props.editable;
    if (props.data !== undefined) {
      stateData.id = props.data;
      stateData.editableOrder = props.editableOrder;
    }

    this.state = {
      ...stateData,
    };
  }

  componentDidMount() {
    const username = global.config.username;
    if (username != null && username !== undefined) {
      this.setState({
        username: username,
        tnnt_id: global.config.tnnt_id,
      });
    }
  }

  handleAddRow = () => {
    const { dynamicRows } = this.state;
    const newRow = { id: dynamicRows.length + 1, roleName: "" };
    this.setState({ dynamicRows: [...dynamicRows, newRow] });
  };

  handleRoleChange = (index, event) => {
    const { dynamicRows } = this.state;
    dynamicRows[index].roleName = event.target.value;
    this.setState({ dynamicRows });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    // Implement your submit logic here
    console.log("Form Submitted");
  };

  renderProjectDetails = () => {
    const {
      proj_name,
      start_date,
    } = this.state;
    return (
      <div className={styles.divMain1}>
        <fieldset className={styles.fieldsetWrapper}>
          <legend className={styles.legendsWrapper1}>Basic Details</legend>
          <Row className={styles.formRow}>
            <Col md={6}>
              <Form.Group
                className={styles.controlGroup1}
                controlId="proj_name"
              >
                <Form.Label className={styles.required}>
                  End User Name
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  value={proj_name}
                  name="proj_name"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group
                className={styles.controlGroup1}
                controlId="field2"
              >
                <Form.Label className={styles.required}>Field-2</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Field-2"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group
                className={styles.controlGroup1}
                controlId="field3"
              >
                <Form.Label className={styles.required}>Field-3</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Field-3"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group
                className={styles.controlGroup1}
                controlId="field4"
              >
                <Form.Label className={styles.required}>Field-4</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Field-4"
                />
              </Form.Group>
            </Col>
          </Row>
        </fieldset>
      </div>
    );
  };

  renderRoleUserDetails = () => {
    const { dynamicRows } = this.state;
    return (
      <div className={styles.divMain1}>
        <fieldset className={styles.fieldsetWrapper}>
          <legend className={styles.legendsWrapper1}>Role User Details</legend>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>id</th>
                <th>Role Name</th>
              </tr>
            </thead>
            <tbody>
              {dynamicRows.map((row, index) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>
                    <Form.Control
                      as="select"
                      value={row.roleName}
                      onChange={(e) => this.handleRoleChange(index, e)}
                      required
                    >
                      <option value="" disabled>
                        Select
                      </option>
                      <option value="Senior Project Manager">
                        Senior Project Manager
                      </option>
                      <option value="Project Manager">
                        Project Manager
                      </option>
                      <option value="Branch Manager">Branch Manager</option>
                      <option value="Line Manager">Line Manager</option>
                      <option value="Role User n-1">Role User n-1</option>
                    </Form.Control>
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
        {this.renderProjectDetails()}
        {this.renderRoleUserDetails()}
        <Button type="submit">Submit</Button>
      </Form>
    );
  };

  render() {
    const { setVisibility } = this.props;
    const {
      editable,
      is_loading,
    } = this.state;

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
            <p className={styles.title}>
              {`${editable == undefined ? "Create" : editable ? "Update" : "View"
                } Details`}
            </p>

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