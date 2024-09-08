import React from "react";
import { Form, Row, Col, Button, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../../styles/createcom.module.css";

export default class Form2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tnnt_id: global.config.tnnt_id,
      username: global.config.username || "",
      role_id: global.config.user_role,
      is_loading: false,
      proj_name: "",
      type: "",
      makerRole: "",      // State to hold selected role for Maker
      checker1Role: "",   // State to hold selected role for Checker 1
      checker2Role: "",   // State to hold selected role for Checker 2
    };
  }

  componentDidMount() {
    const { editable, data, editableOrder } = this.props;
    // Initialize state based on props if needed
    if (editable !== undefined && data !== undefined) {
      this.setState({
        id: data,
        editableOrder: editableOrder,
      });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    // Implement your submit logic here
    console.log("Form Submitted");
  };

  handleRoleChange = (roleName, e) => {
    this.setState({ [roleName]: e.target.value });
  };

  renderProjectDetails = () => {
    const { proj_name, type } = this.state;
    return (
      <div className={styles.divMain1}>
        <fieldset className={styles.fieldsetWrapper}>
          <legend className={styles.legendsWrapper1}>Basic Details</legend>
          <Row className={styles.formRow}>
            <Col md={6}>
              <Form.Group className={styles.controlGroup1} controlId="proj_name">
                <Form.Label className={styles.required}>Microservice</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  value={proj_name}
                  onChange={(e) => this.setState({ proj_name: e.target.value })}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className={styles.controlGroup1} controlId="type">
                <Form.Label className={styles.required}>Type</Form.Label>
                <Form.Control
                  as="select"
                  value={type}
                  onChange={(e) => this.setState({ type: e.target.value })}
                  required
                >
                  <option value="" disabled>
                    Select
                  </option>
                  <option value="Type1">Direct Verify</option>
                  <option value="Type2">4-Eye Check</option>
                  <option value="Type3">6-Eye Check</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
        </fieldset>
      </div>
    );
  };

  renderRoleUserDetails = () => {
    const { makerRole, checker1Role, checker2Role } = this.state;
    return (
      <div className={styles.divMain1}>
        <fieldset className={styles.fieldsetWrapper}>
          <legend className={styles.legendsWrapper1}>Workflow</legend>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Actor</th>
                <th>Role Name</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Maker</td>
                <td>
                  <Form.Control
                    as="select"
                    value={makerRole}
                    onChange={(e) => this.handleRoleChange("makerRole", e)}
                    required
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    <option value="Admin Manager">Admin Manager</option>
                    <option value="Hr">HR</option>
                    <option value="Staff">Staff</option>
                    <option value="Project Manager">Project Manager</option>
                  </Form.Control>
                </td>
              </tr>
              <tr>
                <td>Checker 1</td>
                <td>
                  <Form.Control
                    as="select"
                    value={checker1Role}
                    onChange={(e) => this.handleRoleChange("checker1Role", e)}
                    required
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    <option value="Admin Manager">Admin Manager</option>
                    <option value="Hr">HR</option>
                    <option value="Staff">Staff</option>
                    <option value="Project Manager">Project Manager</option>
                  </Form.Control>
                </td>
              </tr>
              <tr>
                <td>Checker 2</td>
                <td>
                  <Form.Control
                    as="select"
                    value={checker2Role}
                    onChange={(e) => this.handleRoleChange("checker2Role", e)}
                    required
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    <option value="Admin Manager">Admin Manager</option>
                    <option value="Hr">HR</option>
                    <option value="Staff">Staff</option>
                    <option value="Project Manager">Project Manager</option>
                  </Form.Control>
                </td>
              </tr>
            </tbody>
          </Table>
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
    const { editable, is_loading } = this.state;

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
            alt="Close Button"
          />
          <div>
            <p className={styles.title}>
              {`${editable === undefined ? "Create" : editable ? "Update" : "View"
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
