import React from "react";
import { Form, Row, Col, Button, Table, Dropdown } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import styles from "../../styles/createcom.module.css"; // Ensure the correct path to your CSS file

export default class EmProjDet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tnnt_id: global.config.tnnt_id,
      username: "",
      role_id: global.config.user_role,
      is_loading: false,
      proj_name: "",
      start_date: "",
      role_name: "",
      field2: "",
      field3: "",
      field4: "",
      microservices: [
        { id: 1, name: "Contact Details", permissions: { view: "", create: "", update: "", export: "" } },
        { id: 2, name: "Tag Value Mapping", permissions: { view: "", create: "", update: "", export: "" } },
        { id: 3, name: "Microservice-3", permissions: { view: "", create: "", update: "", export: "" } },
        { id: 4, name: "Microservice-4", permissions: { view: "", create: "", update: "", export: "" } },
        { id: 5, name: "Microservice-n", permissions: { view: "", create: "", update: "", export: "" } },
      ],
      formErrors: {
        role_name: false,
        field2: false,
        field3: false,
        field4: false,
      },
      alertMessages: {
        role_name: "Role Name is required.",
        field2: "Field-2 is required.",
        field3: "Field-3 is required.",
        field4: "Field-4 is required.",
      },
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

  handleSubmit = (event) => {
    event.preventDefault();

    // Check for mandatory fields
    const { role_name, field2, field3, field4 } = this.state;
    let formErrors = { ...this.state.formErrors };

    if (!role_name.trim()) {
      formErrors.role_name = true;
    } else {
      formErrors.role_name = false;
    }

    if (!field2.trim()) {
      formErrors.field2 = true;
    } else {
      formErrors.field2 = false;
    }

    if (!field3.trim()) {
      formErrors.field3 = true;
    } else {
      formErrors.field3 = false;
    }

    if (!field4.trim()) {
      formErrors.field4 = true;
    } else {
      formErrors.field4 = false;
    }

    // Update state with formErrors
    this.setState({ formErrors });

    // If any mandatory field is empty, prevent form submission
    if (formErrors.role_name || formErrors.field2 || formErrors.field3 || formErrors.field4) {
      return;
    }

    // Implement your submit logic here (e.g., API call, form submission)
    console.log("Form Submitted");
  };

  handlePermissionChange = (id, permission, value) => {
    const microservices = [...this.state.microservices];
    const index = microservices.findIndex((ms) => ms.id === id);
    microservices[index].permissions[permission] = value.label; // Assuming value.label holds the display text
    this.setState({ microservices });
  };

  renderBasicDetails = () => {
    const { role_name, field2, field3, field4, formErrors } = this.state;
    return (
      <div className={styles.divMain1}>
        <fieldset className={styles.fieldsetWrapper}>
          <legend className={styles.legendsWrapper1}>Basic Details</legend>
          <Row className="mb-3">
            <Col xs={12} md={6}>
              <Form.Group controlId="role_name">
                <Form.Label className={styles.required}>Role Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Role Name"
                  value={role_name}
                  onChange={(e) => this.setState({ role_name: e.target.value })}
                  isInvalid={formErrors.role_name}
                  required
                />
                <Form.Control.Feedback type="invalid">{this.state.alertMessages.role_name}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group controlId="field2">
                <Form.Label className={styles.required}>Field-2</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Field-2"
                  value={field2}
                  onChange={(e) => this.setState({ field2: e.target.value })}
                  isInvalid={formErrors.field2}
                  required
                />
                <Form.Control.Feedback type="invalid">{this.state.alertMessages.field2}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group controlId="field3">
                <Form.Label className={styles.required}>Field-3</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Field-3"
                  value={field3}
                  onChange={(e) => this.setState({ field3: e.target.value })}
                  isInvalid={formErrors.field3}
                  required
                />
                <Form.Control.Feedback type="invalid">{this.state.alertMessages.field3}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group controlId="field4">
                <Form.Label className={styles.required}>Field-4</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Field-4"
                  value={field4}
                  onChange={(e) => this.setState({ field4: e.target.value })}
                  isInvalid={formErrors.field4}
                  required
                />
                <Form.Control.Feedback type="invalid">{this.state.alertMessages.field4}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
        </fieldset>
      </div>
    );
  };

  renderMicroservicesTable = () => {
    return (
      <div className={styles.divMain1}>
        <fieldset className={styles.fieldsetWrapper}>
          <legend className={styles.legendsWrapper1}>Microservices</legend>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Microservice Name</th>
                <th>View</th>
                <th>Create</th>
                <th>Update</th>
                <th>Export</th>
              </tr>
            </thead>
            <tbody>
              {this.state.microservices.map((ms) => (
                <tr key={ms.id}>
                  <td>{ms.id}</td>
                  <td>{ms.name}</td>
                  
                  <td>
                    <Dropdown>
                      <Dropdown.Toggle variant="secondary" id={`dropdown-view-${ms.id}`}>
                        {ms.permissions.view || "Select View"}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item
                          onClick={() =>
                            this.handlePermissionChange(ms.id, "view", {
                              label: "View My Records",
                              value: "view_my_records",
                            })
                          }
                        >
                          View My Records
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() =>
                            this.handlePermissionChange(ms.id, "view", {
                              label: "View My Team Records",
                              value: "view_my_team_records",
                            })
                          }
                        >
                          View My Team Records
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() =>
                            this.handlePermissionChange(ms.id, "view", {
                              label: "View All Records",
                              value: "view_all_records",
                            })
                          }
                        >
                          View All Records
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() =>
                            this.handlePermissionChange(ms.id, "view", {
                              label: "Restricted",
                              value: "view_restricted",
                            })
                          }
                        >
                          Restricted
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                  <td>
                    <Dropdown>
                      <Dropdown.Toggle variant="secondary" id={`dropdown-create-${ms.id}`}>
                        {ms.permissions.create || "Select Create"}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item
                          onClick={() =>
                            this.handlePermissionChange(ms.id, "create", {
                              label: "Create Record for Me",
                              value: "create_record_for_me",
                            })
                          }
                        >
                          Create Record for Me
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() =>
                            this.handlePermissionChange(ms.id, "create", {
                              label: "Create Record for My Team",
                              value: "create_record_for_my_team",
                            })
                          }
                        >
                          Create Record for My Team
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() =>
                            this.handlePermissionChange(ms.id, "create", {
                              label: "Create Record for All",
                              value: "create_record_for_all",
                            })
                          }
                        >
                          Create Record for All
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() =>
                            this.handlePermissionChange(ms.id, "create", {
                              label: "Restricted",
                              value: "create_restricted",
                            })
                          }
                        >
                          Restricted
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                  <td>
                    <Dropdown>
                      <Dropdown.Toggle variant="secondary" id={`dropdown-update-${ms.id}`}>
                        {ms.permissions.update || "Select Update"}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item
                          onClick={() =>
                            this.handlePermissionChange(ms.id, "update", {
                              label: "Update My Records",
                              value: "update_my_records",
                            })
                          }
                        >
                          Update My Records
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() =>
                            this.handlePermissionChange(ms.id, "update", {
                              label: "Update Records of My Team",
                              value: "update_records_of_my_team",
                            })
                          }
                        >
                          Update Records of My Team
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() =>
                            this.handlePermissionChange(ms.id, "update", {
                              label: "Update All Records",
                              value: "update_all_records",
                            })
                          }
                        >
                          Update All Records
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() =>
                            this.handlePermissionChange(ms.id, "update", {
                              label: "Restricted",
                              value: "update_restricted",
                            })
                          }
                        >
                          Restricted
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                  <td>
                    <Dropdown>
                      <Dropdown.Toggle variant="secondary" id={`dropdown-export-${ms.id}`}>
                        {ms.permissions.export || "Select Export"}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item
                          onClick={() =>
                            this.handlePermissionChange(ms.id, "export", {
                              label: "Export",
                              value: "export",
                            })
                          }
                        >
                          Export
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() =>
                            this.handlePermissionChange(ms.id, "export", {
                              label: "Restricted",
                              value: "export_restricted",
                            })
                          }
                        >
                          Restricted
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </fieldset>
      </div>
    );
  };

  render() {
    const { is_loading, formErrors } = this.state;

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
            onClick={() => this.props.setVisibility(false)}
            alt="Close"
          />
          <div>
            <p className={styles.title}>
              {"Create Details"}
            </p>
            <Form onSubmit={this.handleSubmit} className={styles.formWrapper}>
              {this.renderBasicDetails()}
              {this.renderMicroservicesTable()}
              <div className={styles.button}>
                <Button type="submit">Submit</Button>
              </div>
              <div>
                <p style={{ color: "red", marginLeft: "3px", fontSize: "15px" }}>
                  * are mandatory fields
                </p>
              </div>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}
