import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Row, Col, Button } from "react-bootstrap";
import styles from "../../styles/createcom2.module.css"; // Ensure this points to your actual stylesheet

export default class Temp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        microservice: "",
        endPoint: "",
        apiMethod: "",
        url: "",
        headerToken: "",
        request: "",
        expectedResponse: "",
        actualResponse: "",
      },
      formErrors: {
        microservice: "",
        endPoint: "",
        apiMethod: "",
        url: "",
        headerToken: "",
      },
      apiResponse: "",
      apiError: "",
    };
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
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
      case "microservice":
        formErrors.microservice = value.trim() === "" ? "Please select Microservice" : "";
        break;
      case "endPoint":
        formErrors.endPoint = value.trim() === "" ? "Please enter End Point" : "";
        break;
      case "apiMethod":
        formErrors.apiMethod = value.trim() === "" ? "Please select API Method" : "";
        break;
      case "url":
        formErrors.url = value.trim() === "" ? "Please enter URL" : "";
        break;
      case "headerToken":
        formErrors.headerToken = value.trim() === "" ? "Please enter Header Token" : "";
        break;
      default:
        break;
    }
    this.setState({ formErrors });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (!this.formIsValid()) {
      alert("Please fill out all required fields.");
      return;
    }
    const data = { ...this.state.formData };
    this.insertRecord(data);
  };

  formIsValid() {
    const { formData, formErrors } = this.state;
    return (
      formData.microservice.trim() !== "" &&
      formData.endPoint.trim() !== "" &&
      formData.apiMethod.trim() !== "" &&
      formData.url.trim() !== "" &&
      formData.headerToken.trim() !== "" &&
      Object.values(formErrors).every((error) => error === "")
    );
  }

  insertRecord = (data) => {
    // Placeholder for save logic
    console.log("Inserting Record:", data);
  };

  handleTest = async (event) => {
    event.preventDefault();
    if (!this.formIsValid()) {
      alert("Please fill out all required fields.");
      return;
    }
    
    const { apiMethod, url, headerToken, request } = this.state.formData;

    try {
      const response = await fetch(url, {
        method: apiMethod,
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': headerToken,
        },
        body: apiMethod === 'GET' || apiMethod === 'DELETE' ? null : JSON.stringify(JSON.parse(request)),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        if (errorText.includes("<!DOCTYPE") || errorText.includes("<html")) {
          throw new Error("Unexpected HTML response. Check the URL or server.");
        }
        throw new Error(errorText);
      }

      const data = await response.json();
      if (this._isMounted) {
        this.setState({
          apiResponse: JSON.stringify(data, null, 2),
          apiError: "",
        });
      }
    } catch (error) {
      if (this._isMounted) {
        this.setState({
          apiResponse: "",
          apiError: error.message,
        });
      }
    }
  };

  renderFormField = (label, name, placeholder, isDropdown = false, maxLength, options = []) => {
    const { formData, formErrors } = this.state;
    const currentLength = formData[name].length;

    return (
      <Row style={{ marginBottom: "15px" }} key={name}>
        <Col md={12}>
          <Form.Group controlId={name}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Form.Label style={{ width: "250px", fontWeight: "bold" }}>
                {label}:<span style={{ color: "red" }}> *</span>
              </Form.Label>
              {!isDropdown ? (
                <Form.Control
                  type="text"
                  placeholder={placeholder}
                  value={formData[name]}
                  name={name}
                  onChange={this.handleInputChange}
                  style={{ flexGrow: 1 }}
                  maxLength={maxLength}
                  required
                />
              ) : (
                <Form.Control
                  as="select"
                  value={formData[name]}
                  name={name}
                  onChange={this.handleInputChange}
                  style={{ flexGrow: 1 }}
                >
                  <option value="">Select {label}</option>
                  {options.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </Form.Control>
              )}
              <Form.Text className="text-muted">
                ({currentLength}/{maxLength || 50})
              </Form.Text>
            </div>
            <span style={{ color: "red", fontSize: "12px" }}>{formErrors[name]}</span>
          </Form.Group>
        </Col>
      </Row>
    );
  };

  renderTextAreaField = (label, name, maxLength) => {
    const { formData } = this.state;
    const currentLength = formData[name].length;

    return (
      <Row style={{ marginBottom: "15px" }} key={name}>
        <Col md={12}>
          <Form.Group controlId={name}>
            <Form.Label style={{ width: "250px", fontWeight: "bold" }}>
              {label}
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              value={formData[name]}
              name={name}
              onChange={this.handleInputChange}
              style={{ flexGrow: 1 }}
              maxLength={maxLength}
            />
            <Form.Text className="text-muted" style={{ textAlign: "right" }}>
              ({currentLength}/{maxLength})
            </Form.Text>
          </Form.Group>
        </Col>
      </Row>
    );
  };

  renderForm = () => {
    return (
      <Form onSubmit={this.handleSubmit}>
        {/* Basic Details */}
        <div className={styles.divMain2}>
          <fieldset className={styles.fieldsetWrapper}>
            <legend className={styles.legendsWrapper1}>Basic Details</legend>
            {this.renderFormField("Microservice", "microservice", "Select Microservice", true, 50, [
              "MicroService-1",
              "MicroService-2",
              "MicroService-3",
            ])}
            {this.renderFormField("End Point", "endPoint", "Enter End Point", false, 100)}
            {this.renderFormField("API Method", "apiMethod", "Select API Method", true, 50, [
              "GET",
              "POST",
              "PUT",
              "DELETE",
              "PATCH",
              "Head",
              "Options"
            ])}
            {this.renderFormField("URL", "url", "Enter URL", false, 200)}
            {this.renderFormField("HeaderToken", "headerToken", "Enter Header Token", false, 50)}
          </fieldset>
        </div>

        {/* Request */}
        <div className={styles.divMain2}>
          <fieldset className={styles.fieldsetWrapper}>
            <legend className={styles.legendsWrapper1}>Request</legend>
            {this.renderTextAreaField("Request", "request", 1000)}
          </fieldset>
        </div>

        {/* Expected Response */}
        <div className={styles.divMain2}>
          <fieldset className={styles.fieldsetWrapper}>
            <legend className={styles.legendsWrapper1}>Expected Response</legend>
            {this.renderTextAreaField("Expected Response", "expectedResponse", 1000)}
          </fieldset>
        </div>

        {/* Actual Response */}
        <div className={styles.divMain2}>
          <fieldset className={styles.fieldsetWrapper}>
            <legend className={styles.legendsWrapper1}>Actual Response</legend>
             <Form.Group controlId="apiResponse">
              <Form.Control
                as="textarea"
                rows={5}
                value={this.state.apiResponse}
                readOnly
                style={{ marginTop: "15px" }}
              />
              <Form.Text className="text-danger" style={{ textAlign: "right" }}>
                {this.state.apiError}
              </Form.Text>
            </Form.Group>
          </fieldset>
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
          <Button type="button" onClick={this.handleTest} style={{ marginRight: "20px" }}>
            Test
          </Button>
          <Button type="submit">Save</Button>
        </div>
      </Form>
    );
  };

  render() {
    return (
      <div className={styles.mainWrapper}>
        <div className={styles.wrapper}>
          <p className={styles.title}>Create API Details</p>
          {this.renderForm()}
          <p style={{ color: "red", marginLeft: "3px", fontSize: "15px" }}>
            * are mandatory fields
          </p>
        </div>
      </div>
    );
  }
}
