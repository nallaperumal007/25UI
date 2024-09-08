import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import Colors from "../../constants/colors";
import styles from "../../styles/createcom.module.css";
import { Form, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default class Form1 extends React.Component {
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
        tenantName: "",
        fields2: null,
        fields3: null,
        fields4: "",
        fields5: "",
      },
      formErrors: {
        tenantName: "",
        fields2: "",
        fields3: "",
        fields4: "",
        fields5: "",
      },
      microservices: [
        { id: 1, name: "Contact Details", checked: false, startDate: null, endDate: null },
        { id: 2, name: "Tag Value Mapping", checked: false, startDate: null, endDate: null },
        { id: 3, name: "Microservice 3", checked: false, startDate: null, endDate: null },
        { id: 4, name: "Microservice 4", checked: false, startDate: null, endDate: null },
        { id: 5, name: "Microservice n", checked: false, startDate: null, endDate: null },
      ],
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
      case "tenantName":
        formErrors.tenantName = value.trim() === "" ? "Please enter Tenant Name" : "";
        break;
      case "fields2":
        formErrors.fields2 = value.trim() === "" ? "Please enter Start Date" : "";
        break;
      case "fields4":
        formErrors.fields4 = value.trim() === "" ? "Please enter Fields-4" : "";
        break;
      case "fields5":
        formErrors.fields5 = value.trim() === "" ? "Please enter Field-5" : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { tenantName, fields2, fields3, fields4, fields5 } = this.state.formData;
    const { id } = this.state;

    if (!this.formIsValid()) {
      alert("Please fill out all required fields.");
      return;
    }

    console.log("Form is valid. Submitting...");

    const data = {
      id: id || 32, 
      clt_ref_id: "123",
      tnnt_name: tenantName,
      abbr: tenantName, 
      database_name: "TestDB1",
      user_name: "SmokeTest1",
      admin_password: "SmokeTest1",
      start_date: fields2,
      end_date: fields3,
      email_from_id: fields4,
      whatsapp_from_id: fields5,
      language_id: 1,
      lc_status_id: 1,
      is_active: "active",
      created_by: "smoketest",
    };

    this.insertRecord(data);
  };

  formIsValid() {
    const { formData, formErrors } = this.state;

    return (
      formData.tenantName.trim() !== "" &&
      formData.fields4.trim() !== "" &&
      formData.fields5.trim() !== "" &&
      Object.values(formErrors).every((error) => error === "")
    );
  }

  insertRecord = (data) => {
    fetch("https://apidev.finari.com/paTenantDet/insertRecord", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        Swal.fire({
          title: "Success!",
          text: "Record inserted successfully",
          icon: "success",
          confirmButtonColor: Colors.primaryColor,
          width: Colors.width,
          allowOutsideClick: false,
        });
        
      })
      .catch((error) => {
        console.error("Error:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to insert record",
          icon: "error",
          confirmButtonColor: Colors.red,
          width: Colors.width,
          allowOutsideClick: false,
        });
      });
  };

  handleCheckboxChange = (index) => {
    const { microservices } = this.state;
    const updatedMicroservices = [...microservices];

    updatedMicroservices[index].checked = !updatedMicroservices[index].checked;

    
    if (updatedMicroservices[index].checked) {
      updatedMicroservices[index].startDate = new Date();
      updatedMicroservices[index].endDate = null;
    } else {
      updatedMicroservices[index].startDate = new Date();
      updatedMicroservices[index].endDate = new Date();
    }

    this.setState({ microservices: updatedMicroservices });
  };

  handleDateChange = (index, dateType, date) => {
    const { microservices } = this.state;
    const updatedMicroservices = [...microservices];
    updatedMicroservices[index][dateType] = date;
    this.setState({ microservices: updatedMicroservices });
  };

  formatDate(date) {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  renderProjectDetails = () => {
    const { formData, formErrors } = this.state;
    return (
      <div className={styles.divMain1}>
        <fieldset className={styles.fieldsetWrapper}>
          <legend className={styles.legendsWrapper1}>Basic Details</legend>
          <Row className={styles.formRow}>
            <Col md={6}>
              <Form.Group className={styles.controlGroup1} controlId="tenantName">
                <Form.Label className={styles.required}>Tenant Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Tenant Name"
                  value={formData.tenantName}
                  name="tenantName"
                  onChange={this.handleInputChange}
                  required
                />
                <span className={styles.error}>{formErrors.tenantName}</span>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className={styles.controlGroup1} controlId="fields2">
                <Form.Label className={styles.required}>Start Date</Form.Label>
                <DatePicker
                  selected={formData.fields2}
                  onChange={(date) =>
                    this.setState((prevState) => ({
                      formData: {
                        ...prevState.formData,
                        fields2: date,
                      },
                    }))
                  }
                  dateFormat="dd-MM-yyyy"
                  placeholderText="DD-MM-YYYY"
                  className="form-control"
                  name="fields2"
                />
                <span className={styles.error}>{formErrors.fields2}</span>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className={styles.controlGroup1} controlId="fields3">
                <Form.Label>End Date</Form.Label>
                <DatePicker
                  selected={formData.fields3}
                  onChange={(date) =>
                    this.setState((prevState) => ({
                      formData: {
                        ...prevState.formData,
                        fields3: date,
                      },
                    }))
                  }
                  dateFormat="dd-MM-yyyy"
                  placeholderText="DD-MM-YYYY"
                  className="form-control"
                  name="fields3"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className={styles.controlGroup1} controlId="fields4">
                <Form.Label className={styles.required}>Fields-4</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Fields-4"
                  value={formData.fields4}
                  name="fields4"
                  onChange={this.handleInputChange}
                  required
                />
                <span className={styles.error}>{formErrors.fields4}</span>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className={styles.controlGroup1} controlId="fields5">
                <Form.Label className={styles.required}>Field-5</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Field-5"
                  value={formData.fields5}
                  name="fields5"
                  onChange={this.handleInputChange}
                  required
                />
                <span className={styles.error}>{formErrors.fields5}</span>
              </Form.Group>
            </Col>
          </Row>
        </fieldset>
      </div>
    );
  };

  renderMicroservicesTable = () => {
    const { microservices } = this.state;
    return (
      <div className={styles.divMain1}>
        <fieldset className={styles.fieldsetWrapper}>
          <legend className={styles.legendsWrapper1}>Microservices</legend>
          <Row className={styles.formRow}>
            <Col md={12}>
              <div className="table-responsive">
                <table className={`table ${styles.microservicesTable}`}>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Microservice name</th>
                      <th>Select</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {microservices.map((ms, index) => (
                      <tr key={ms.id}>
                        <td>{ms.id}</td>
                        <td>{ms.name}</td>
                        <td>
                          <input
                            type="checkbox"
                            checked={ms.checked}
                            onChange={() => this.handleCheckboxChange(index)}
                          />
                        </td>
                        <td>
                          <DatePicker
                            selected={ms.startDate}
                            onChange={(date) =>
                              this.handleDateChange(index, "startDate", date)
                            }
                            dateFormat="dd-MM-yyyy"
                            placeholderText="DD-MM-YYYY"
                            className="form-control"
                            disabled={!ms.checked}
                          />
                        </td>
                        <td>
                          <DatePicker
                            selected={ms.endDate}
                            onChange={(date) =>
                              this.handleDateChange(index, "endDate", date)
                            }
                            dateFormat="dd-MM-yyyy"
                            placeholderText="DD-MM-YYYY"
                            className="form-control"
                            disabled={!ms.checked}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Col>
          </Row>
        </fieldset>
      </div>
    );
  };

  renderCreateRecordForm = () => {
    return (
      <Form onSubmit={this.handleSubmit} className={styles.formWrapper}>
        {this.renderProjectDetails()}
        {this.renderMicroservicesTable()}
        <div className={styles.button}>
          <button type="submit" className={`btn ${styles.submitButton}`}>
            Submit
          </button>
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
                ? "Create Details"
                : this.state.editable
                ? "Update Details"
                : "View Details"}
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
