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
    const {
      contactName,
      mobileNumber,
      emailId,
      alternateMobileNumber,
      whatsappNumber,
      alternateEmailId,
    } = this.state.formData;

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

  renderFormField = (label, name, maxLength) => {
    const { formData, formErrors } = this.state;
    const currentLength = formData[name].length;

    return (
      <Row className={styles.formRow} style={{ marginBottom: '15px' }}>
        <Col md={12}>
          <Form.Group className={styles.controlGroup1} controlId={name}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Form.Label className={styles.required} style={{ flexShrink: 0 }}>
                {label}:
              </Form.Label>
              <Form.Control
                type="text"
                placeholder={`Enter ${label}`}
                value={formData[name]}
                name={name}
                onChange={this.handleInputChange}
                maxLength={maxLength}
                style={{
                  marginLeft: '10px',
                  flexGrow: 1,
                }}
                required={name in this.state.formErrors}
              />
              <Form.Text className="text-muted" style={{ marginLeft: '10px', color: 'blue' }}>
                {currentLength}/{maxLength}
              </Form.Text>
            </div>
            <span className={styles.error}>{formErrors[name]}</span>
          </Form.Group>
        </Col>
      </Row>
    );
  };

  renderBaseDetails = () => {
    return (
      <div className={styles.divMain2}>
        <fieldset className={styles.fieldsetWrapper}>
          <legend className={styles.legendsWrapper1}>Base Details</legend>
          {this.renderFormField("Contact Name", "contactName", 50)}
        </fieldset>
      </div>
    );
  };

  renderProjectDetails = () => {
    return (
      <div className={styles.divMain1}>
        <fieldset className={styles.fieldsetWrapper}>
          <legend className={styles.legendsWrapper1}>Contact Details</legend>
          {this.renderFormField(" Mobile Number", "mobileNumber", 10)}
          {this.renderFormField(" Email      ID", "emailId", 50)}
          <Row className={styles.formRow}>
            <Col md={4} className="d-flex align-items-end">
              <Button className={styles.validateButton}>Validate Email</Button>
            </Col>
          </Row>
          {this.renderFormField("Alt Mobile  Number", "alternateMobileNumber", 10)}
          {this.renderFormField("WhatsApp    Number", "whatsappNumber", 10)}
          {this.renderFormField("Alternate Email ID", "alternateEmailId", 50)}
        </fieldset>
      </div>
    );
  };

  renderCreateRecordForm = () => {
    return (
      <Form onSubmit={this.handleSubmit}>
        {this.renderBaseDetails()}
        {this.renderProjectDetails()}
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
