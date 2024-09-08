import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import styles from "../../styles/createcom2.module.css";
import { Form, Row, Col, Button } from "react-bootstrap";

export default class Template extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tnnt_id: global.config.tnnt_id,
      username: global.config.username || "",
      role_id: global.config.user_role,
      is_loading: false,
      editable: props.editable,
      id: props.data,
      editableOrder: props.editableOrder,
      proj_name: "",
      formData: {
        projectName: "",
        deliverableName: "",
        billability: "",
        stakeholders: "",
        plannedStartDate: "",
        plannedEndDate: "",
        plannedDuration: "",
        plannedBudget: "",
      },
      formErrors: {
        projectName: "",
        deliverableName: "",
        billability: "",
        stakeholders: "",
      },
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [name]: value,
      },
    }));
    this.validateField(name, value);
  };

  validateField(fieldName, value) {
    let formErrors = { ...this.state.formErrors };

    switch (fieldName) {
      case "projectName":
        formErrors.projectName = value.trim() === "" ? "Please enter Project Name" : "";
        break;
      case "deliverableName":
        formErrors.deliverableName = value.trim() === "" ? "Please enter Deliverable Name" : "";
        break;
      case "billability":
        formErrors.billability = value.trim() === "" ? "Please enter Billability" : "";
        break;
      case "stakeholders":
        formErrors.stakeholders = value.trim() === "" ? "Please enter Stakeholders" : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const {
      projectName,
      deliverableName,
      billability,
      stakeholders,
      plannedStartDate,
      plannedEndDate,
      plannedDuration,
      plannedBudget,
    } = this.state.formData;

    if (!this.formIsValid()) {
      alert("Please fill out all required fields.");
      return;
    }

    console.log("Form is valid. Submitting...");

    const data = {
      projectName,
      deliverableName,
      billability,
      stakeholders,
      plannedStartDate,
      plannedEndDate,
      plannedDuration,
      plannedBudget,
    };

    this.insertRecord(data);
  };

  formIsValid() {
    const { formData, formErrors } = this.state;

    return (
      formData.projectName.trim() !== "" &&
      formData.deliverableName.trim() !== "" &&
      formData.billability.trim() !== "" &&
      formData.stakeholders.trim() !== "" &&
      Object.values(formErrors).every((error) => error === "")
    );
  }

  insertRecord = (data) => {
    // Simulate a network request
    console.log("Inserting Record:", data);
  };

  renderBaseDetails = () => {
    const { formData, formErrors } = this.state;
    return (
      <div className={styles.divMain2}>
        <fieldset className={styles.fieldsetWrapper}>
          <legend className={styles.legendsWrapper1}>Basic Details</legend>
          <Row style={{ marginBottom: '15px' }}>
            <Col md={12}>
            <Form.Group controlId="projectName" style={{ margin: 0 }}>
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <Form.Label style={{ 
      marginBottom: '0', 
      width: '150px', 
      fontWeight: 'bold', 
      whiteSpace: 'nowrap', 
      flexShrink: 0 
    }}>
      Project Name:<span style={{ color: 'red' }}> *</span>
    </Form.Label>
    <Form.Control
      type="text"
      placeholder="Enter Project Name"
      value={formData.projectName}
      name="projectName"
      onChange={this.handleInputChange}
      style={{
        flexGrow: 1,
        padding: '12px',
        fontSize: '16px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        marginLeft: '20px' 
      }}
      required
    />
  </div>
  <span style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>
    {formErrors.projectName}
  </span>
</Form.Group>

            </Col>
          </Row>
          <Row style={{ marginBottom: '15px' }}>
  <Col md={12}>
    <Form.Group controlId="deliverableName" style={{ margin: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Form.Label style={{ 
          marginBottom: '0', 
          width: '150px', 
          fontWeight: 'bold', 
          whiteSpace: 'nowrap', 
          flexShrink: 0 
        }}>
          Deliverable:<span style={{ color: 'red' }}> *</span>
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Deliverable Name"
          value={formData.deliverableName}
          name="deliverableName"
          onChange={this.handleInputChange}
          style={{
            flexGrow: 1, 
            padding: '10px',
            fontSize: '16px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            marginLeft: '20px' 
          }}
          required
        />
      </div>
      <span style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>
        {formErrors.deliverableName}
      </span>
    </Form.Group>
  </Col>
</Row>

<Row style={{ marginBottom: '15px' }}>
  <Col md={12}>
    <Form.Group controlId="billability" style={{ margin: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Form.Label style={{ 
          marginBottom: '0', 
          width: '150px', 
          fontWeight: 'bold', 
          whiteSpace: 'nowrap',
          flexShrink: 0
        }}>
          Billability:<span style={{ color: 'red' }}> *</span>
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Billability"
          value={formData.billability}
          name="billability"
          onChange={this.handleInputChange}
          style={{
            flexGrow: 1,
            padding: '10px',
            fontSize: '16px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            marginLeft: '20px' 
          }}
          required
        />
      </div>
      <span style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>
        {formErrors.billability}
      </span>
    </Form.Group>
  </Col>
</Row>

<Row style={{ marginBottom: '15px' }}>
  <Col md={12}>
    <Form.Group controlId="stakeholders" style={{ margin: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Form.Label style={{ 
          marginBottom: '0', 
          width: '150px', 
          fontWeight: 'bold', 
          whiteSpace: 'nowrap',
          flexShrink: 0
        }}>
          Stakeholders:<span style={{ color: 'red' }}> *</span>
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Stakeholders"
          value={formData.stakeholders}
          name="stakeholders"
          onChange={this.handleInputChange}
          style={{
            flexGrow: 1,
            padding: '10px',
            fontSize: '16px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            marginLeft: '20px' // Space between the label and the input field
          }}
          required
        />
      </div>
      <span style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>
        {formErrors.stakeholders}
      </span>
    </Form.Group>
  </Col>
</Row>

        </fieldset>
      </div>
    );
  };

  renderTimelinesAndBudget = () => {
    const { formData, formErrors } = this.state;
    return (
      <div className={styles.divMain2}>
        <fieldset className={styles.fieldsetWrapper}>
          <legend className={styles.legendsWrapper1}>Timelines & Budget</legend>
          <Row style={{ marginBottom: '15px' }}>
            <Col md={12}>
              <Form.Group controlId="plannedStartDate" style={{ margin: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Form.Label style={{ marginBottom: '0', width: '150px' }}>
                     StartDate:
                  </Form.Label>
                  <Form.Control
                    type="date"
                    value={formData.plannedStartDate}
                    name="plannedStartDate"
                    onChange={this.handleInputChange}
                    style={{
                      flexGrow: 1,
                      padding: '10px',
                      fontSize: '16px',
                      borderRadius: '5px',
                      border: '1px solid #ccc'
                    }}
                  />
                </div>
                <span style={{ color: 'red', fontSize: '12px' }}>
                  {formErrors.plannedStartDate}
                </span>
              </Form.Group>
            </Col>
          </Row>
          <Row style={{ marginBottom: '15px' }}>
            <Col md={12}>
              <Form.Group controlId="plannedEndDate" style={{ margin: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Form.Label style={{ marginBottom: '0', width: '150px' }}>
                     EndDate:
                  </Form.Label>
                  <Form.Control
                    type="date"
                    value={formData.plannedEndDate}
                    name="plannedEndDate"
                    onChange={this.handleInputChange}
                    style={{
                      flexGrow: 1,
                      padding: '10px',
                      fontSize: '16px',
                      borderRadius: '5px',
                      border: '1px solid #ccc'
                    }}
                  />
                </div>
                <span style={{ color: 'red', fontSize: '12px' }}>
                  {formErrors.plannedEndDate}
                </span>
              </Form.Group>
            </Col>
          </Row>
          <Row style={{ marginBottom: '15px' }}>
            <Col md={12}>
              <Form.Group controlId="plannedDuration" style={{ margin: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Form.Label style={{ marginBottom: '0', width: '150px' }}>
                     Duration (Days):
                  </Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter Duration"
                    value={formData.plannedDuration}
                    name="plannedDuration"
                    onChange={this.handleInputChange}
                    style={{
                      flexGrow: 1,
                      padding: '10px',
                      fontSize: '16px',
                      borderRadius: '5px',
                      border: '1px solid #ccc'
                    }}
                  />
                </div>
                <span style={{ color: 'red', fontSize: '12px' }}>
                  {formErrors.plannedDuration}
                </span>
              </Form.Group>
            </Col>
          </Row>
          <Row style={{ marginBottom: '15px' }}>
            <Col md={12}>
              <Form.Group controlId="plannedBudget" style={{ margin: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Form.Label style={{ marginBottom: '0', width: '150px' }}>
                     Budget:
                  </Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter Budget"
                    value={formData.plannedBudget}
                    name="plannedBudget"
                    onChange={this.handleInputChange}
                    style={{
                      flexGrow: 1,
                      padding: '10px',
                      fontSize: '16px',
                      borderRadius: '5px',
                      border: '1px solid #ccc'
                    }}
                  />
                </div>
                <span style={{ color: 'red', fontSize: '12px' }}>
                  {formErrors.plannedBudget}
                </span>
              </Form.Group>
            </Col>
          </Row>
        </fieldset>
      </div>
    );
  };

  renderCreateRecordForm = () => {
    return (
      <Form onSubmit={this.handleSubmit} className={styles.formWrapper}>
        {this.renderBaseDetails()}
        {this.renderTimelinesAndBudget()}
        
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
            alt="Close"
          />
          <div>
            <p className={styles.title}>
              {this.state.editable === undefined
                ? "Create Project Details"
                : this.state.editable
                ? "Update Project Details"
                : "View Project Details"}
            </p>

            {/* Render the form only if editable */}
            {this.state.editable !== false ? (
              this.renderCreateRecordForm()
            ) : (
              <p>View mode is not implemented yet.</p>
            )}
          </div>
            <div>
              <p style={{ color: "red", marginLeft: "3px", fontSize: "15px" }}>
                * are mandatory fields
              </p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
          <Button type="submit" style={{ marginRight: '20px' }}>
            Create
          </Button>
        </div>
        </div>
      </div>
    );
  }
}
