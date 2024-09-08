import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import styles from "../../styles/createcom.module.css";
import { Form, Row, Col, Button } from "react-bootstrap";

export default class Skill extends React.Component {
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
        contactName: "",
        mobileNumber: "",
        emailId: "",
        alternateMobileNumber: "",
        whatsappNumber: "",
        alternateEmailId: "",
      },
      formErrors: {
        contactName: "",
        mobileNumber: "",
        emailId: "",
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
      case "contactName":
        formErrors.contactName = value.trim() === "" ? "Please enter Contact Name" : "";
        break;
      case "mobileNumber":
        formErrors.mobileNumber = value.trim() === "" ? "Please enter Mobile Number" : "";
        break;
      case "emailId":
        formErrors.emailId = value.trim() === "" ? "Please enter Email ID" : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { contactName, mobileNumber, emailId, alternateMobileNumber, whatsappNumber, alternateEmailId } = this.state.formData;

    if (!this.formIsValid()) {
      alert("Please fill out all required fields.");
      return;
    }

    console.log("Form is valid. Submitting...");

    const data = {
      contactName,
      mobileNumber,
      emailId,
      alternateMobileNumber,
      whatsappNumber,
      alternateEmailId,
    };

    this.insertRecord(data);
  };

  formIsValid() {
    const { formData, formErrors } = this.state;

    return (
      formData.contactName.trim() !== "" &&
      formData.mobileNumber.trim() !== "" &&
      formData.emailId.trim() !== "" &&
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
          <legend className={styles.legendsWrapper1}>Base Details</legend>
          <Row className={styles.formRow}>
            <Col md={12}>
              <Form.Group className={styles.controlGroup1} controlId="contactName">
                <Form.Label className={styles.required}>Contact Name:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Contact Name"
                  value={formData.contactName}
                  name="contactName"
                  onChange={this.handleInputChange}
                  required
                />
                <span className={styles.error}>{formErrors.contactName}</span>
              </Form.Group>
            </Col>
          </Row>
        </fieldset>
      </div>
    );
  };

  renderProjectDetails = () => {
    const { formData, formErrors } = this.state;
    return (
      <div className={styles.divMain1}>
        <fieldset className={styles.fieldsetWrapper}>
          <legend className={styles.legendsWrapper1}>Contact Details</legend>
          <Row className={styles.formRow}>
            <Col md={4}>
              <Form.Group className={styles.controlGroup1} controlId="mobileNumber">
                <Form.Label className={styles.required}>Mobile Nr:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Mobile Number"
                  value={formData.mobileNumber}
                  name="mobileNumber"
                  onChange={this.handleInputChange}
                  required
                />
                <span className={styles.error}>{formErrors.mobileNumber}</span>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className={styles.controlGroup1} controlId="emailId">
                <Form.Label className={styles.required}>Email ID:</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email ID"
                  value={formData.emailId}
                  name="emailId"
                  onChange={this.handleInputChange}
                  required
                />
                <span className={styles.error}>{formErrors.emailId}</span>
              </Form.Group>
            </Col>
            <Col md={4} className="d-flex align-items-end">
              <Button className={styles.validateButton}>Validate Email</Button>
            </Col>
          </Row>
          <Row className={styles.formRow}>
            <Col md={4}>
              <Form.Group className={styles.controlGroup1} controlId="alternateMobileNumber">
                <Form.Label>Alternate Mobile Nr:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Alternate Mobile Number"
                  value={formData.alternateMobileNumber}
                  name="alternateMobileNumber"
                  onChange={this.handleInputChange}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className={styles.controlGroup1} controlId="whatsappNumber">
                <Form.Label>WhatsApp Number:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter WhatsApp Number"
                  value={formData.whatsappNumber}
                  name="whatsappNumber"
                  onChange={this.handleInputChange}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className={styles.controlGroup1} controlId="alternateEmailId">
                <Form.Label>Alternate Email ID:</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Alternate Email ID"
                  value={formData.alternateEmailId}
                  name="alternateEmailId"
                  onChange={this.handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>
        </fieldset>
      </div>
    );
  };
  renderCreateRecordForm = () => {
    return (
      <Form onSubmit={this.handleSubmit}>
       
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
          <Button type="submit" style={{ marginRight: '20px' }}>
            Create
          </Button>
        </div>
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
                ? "Create Contact Details"
                : this.state.editable
                ? "Update Contact Details"
                : "View Contact Details"}
            </p>

            {/* Render the base and project details forms */}
            {this.renderBaseDetails()}
            {this.renderProjectDetails()}

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
      </div>
    );
  }
}
