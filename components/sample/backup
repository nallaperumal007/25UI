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
      microservices: [
        { id: 1, name: 'Contact Details', checked: false, startDate: null, endDate: null },
        { id: 2, name: 'Tag Value Mapping', checked: false, startDate: null, endDate: null },
        { id: 3, name: 'Microservice 3', checked: false, startDate: null, endDate: null },
        { id: 4, name: 'Microservice 4', checked: false, startDate: null, endDate: null },
        { id: 5, name: 'Microservice n', checked: false, startDate: null, endDate: null }
      ],
      formData: {
        tenantName: '',
        fields2: '',
        fields3: '',
        fields4: ''
      },
      formErrors: {
        tenantName: '',
        fields2: '',
        fields3: '',
        fields4: ''
      },
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

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState(prevState => ({
      formData: {
        ...prevState.formData,
        [name]: value
      }
    }));
    this.validateField(name, value);
  };

  validateField(fieldName, value) {
    let formErrors = { ...this.state.formErrors };

    switch (fieldName) {
      case 'tenantName':
        formErrors.tenantName = value.trim() === '' ? 'Please enter Tenant Name' : '';
        break;
      case 'fields2':
        formErrors.fields2 = value.trim() === '' ? 'Please enter Fields2' : '';
        break;
      case 'fields3':
        formErrors.fields3 = '';
        break;
      case 'fields4':
        formErrors.fields4 = value.trim() === '' ? 'Please enter Fields4' : '';
        break;
      default:
        break;
    }

    this.setState({ formErrors });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { tenantName, fields2, fields4 } = this.state.formData;
    if (tenantName.trim() === '' || fields2.trim() === '' || fields4.trim() === '') {
      alert('Please fill out all required fields.');
      return;
    }
    console.log('Form is valid. Submitting...');
    this.insertRecord(); // Call your record insertion function here
  };

  handleCheckboxChange = (index) => {
    const microservices = [...this.state.microservices];
    microservices[index].checked = !microservices[index].checked;

    // Set start date to current date if checked, else set end date to current date
    if (microservices[index].checked) {
      microservices[index].startDate = new Date();
    } else {
      microservices[index].endDate = new Date();
    }

    this.setState({ microservices });
  };

  handleDateChange = (index, dateType, date) => {
    const microservices = [...this.state.microservices];
    microservices[index][dateType] = date;
    this.setState({ microservices });
  };

  insertRecord = () => {
    const { proj_name, formData, microservices } = this.state;

    // Prepare data to send to API
    const data = {
      proj_name: proj_name,
      tenantName: formData.tenantName,
      fields2: formData.fields2,
      fields3: formData.fields3,
      fields4: formData.fields4,
      microservices: microservices.map(ms => ({
        id: ms.id,
        name: ms.name,
        checked: ms.checked,
        startDate: ms.startDate,
        endDate: ms.endDate
      }))
    };

    // Make API request
    fetch('https://apidev.finari.com/paTenantDet/insertRecord', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any other headers here if needed
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Handle success response
        console.log('Success:', data);
        Swal.fire({
          title: 'Success!',
          text: 'Record inserted successfully',
          icon: 'success',
          confirmButtonColor: Colors.primaryColor,
          width: Colors.width,
          allowOutsideClick: false,
        });
        // Clear form or perform any other necessary actions after successful submission
      })
      .catch(error => {
        // Handle error
        console.error('Error:', error);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to insert record',
          icon: 'error',
          confirmButtonColor: Colors.red,
          width: Colors.width,
          allowOutsideClick: false,
        });
      });
  };

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
                <Form.Label className={styles.required}>Fields-2</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Fields-2"
                  value={formData.fields2}
                  name="fields2"
                  onChange={this.handleInputChange}
                  required
                />
                <span className={styles.error}>{formErrors.fields2}</span>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className={styles.controlGroup1} controlId="fields3">
                <Form.Label>Field-3</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Field-3"
                  value={formData.fields3}
                  name="fields3"
                  onChange={this.handleInputChange}
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
                            onChange={(date) => this.handleDateChange(index, 'startDate', date)}
                            dateFormat="dd-MM-yyyy"
                            placeholderText="DD-MM-YYYY"
                            className="form-control"
                          />
                        </td>
                        <td>
                          <DatePicker
                            selected={ms.endDate}
                            onChange={(date) => this.handleDateChange(index, 'endDate', date)}
                            dateFormat="dd-MM-yyyy"
                            placeholderText="DD-MM-YYYY"
                            className="form-control"
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
    const {
      editable,
      is_loading,
      editableOrder,
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
            alt="Close"
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
