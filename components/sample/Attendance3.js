import React from "react";
import { Form, Row, Col, Button, Table } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../../styles/createcom.module.css";

export default class Attendance3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tnnt_id: global.config.tnnt_id,
      username: global.config.username || "",
      role_id: global.config.user_role,
      is_loading: false,
      proj_name: "",
      type: "",
      makerRole: "",
      checker1Role: "",
      checker2Role: "",
      date: new Date(), // State for date picker
      attendance: ["WFO", "WFH", "WFH-NATIVE", "WFO-ONSITE"], // Dropdown options
      staffAttendance: {
        1: { name: "Arthi", attendance: "", permission: false },
        2: { name: "Aswin", attendance: "", permission: false }
      }
    };
  }

  componentDidMount() {
    const { editable, data, editableOrder } = this.props;
    if (editable !== undefined && data !== undefined) {
      this.setState({
        id: data,
        editableOrder: editableOrder,
      });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form Submitted", this.state.staffAttendance);
  };

  handleRoleChange = (roleName, e) => {
    this.setState({ [roleName]: e.target.value });
  };

  handleDateChange = (date) => {
    this.setState({ date });
  };

  handleAttendanceChange = (staffId, e) => {
    const newAttendance = { ...this.state.staffAttendance };
    newAttendance[staffId].attendance = e.target.value;
    this.setState({ staffAttendance: newAttendance });
  };

  handlePermissionChange = (staffId, e) => {
    const newPermission = { ...this.state.staffAttendance };
    newPermission[staffId].permission = e.target.checked;
    this.setState({ staffAttendance: newPermission });
  };

  renderProjectDetails = () => {
    const { date } = this.state;
    return (
      <div className={styles.divMain1}>
        <fieldset className={styles.fieldsetWrapper}>
          <legend className={styles.legendsWrapper1}>Basic Details</legend>
          <Row style={{ marginBottom: "15px" }}>
            <Col md={12}>
              <Form.Group controlId="date" style={{ margin: 0 }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Form.Label
                    style={{
                      marginBottom: "0",
                      width: "150px",
                      fontWeight: "bold",
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                    }}
                  >
                    Date:<span style={{ color: "red" }}> *</span>
                  </Form.Label>
                  <Form.Control
                    type="date"
                    value={date.toISOString().split('T')[0]} // Format date to yyyy-mm-dd
                    onChange={(e) => this.handleDateChange(new Date(e.target.value))}
                    style={{
                      flexGrow: 1,
                      padding: "10px",
                      fontSize: "16px",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                      marginLeft: "20px",
                    }}
                    required
                  />
                </div>
              </Form.Group>
            </Col>
          </Row>
        </fieldset>
      </div>
    );
  };


  renderRoleUserDetails = () => {
    const { staffAttendance, attendance } = this.state;
    return (
      <div className={styles.divMain1}>
        <fieldset className={styles.fieldsetWrapper}>
          <legend className={styles.legendsWrapper1}>Staff Details</legend>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Staff ID</th>
                <th>Staff Name</th>
                <th>Attendance</th>
                <th>Permission</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(staffAttendance).map(staffId => (
                <tr key={staffId}>
                  <td>{staffId}</td>
                  <td>{staffAttendance[staffId].name}</td>
                  <td>
                    <Form.Control
                      as="select"
                      value={staffAttendance[staffId].attendance}
                      onChange={(e) => this.handleAttendanceChange(staffId, e)}
                    >
                      <option value="">Select</option>
                      {attendance.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </Form.Control>
                  </td>
                  <td>
                    <Form.Check
                      type="checkbox"
                      checked={staffAttendance[staffId].permission}
                      onChange={(e) => this.handlePermissionChange(staffId, e)}
                    />
                  </td>
                </tr>
              ))}
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