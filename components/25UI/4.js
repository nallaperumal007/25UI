import React from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { FaCalendarAlt } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../../styles/createcom.module.css";

export default class Deliverable extends React.Component {
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
      deliverableName: "", // New state for deliverable name
      plannedStartDate: null, // State for planned start date
      plannedEndDate: null, // State for planned end date
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
    console.log("Form Submitted");
  };

  handleDeliverableNameChange = (e) => {
    this.setState({ deliverableName: e.target.value });
  };

  handlePlannedStartDateChange = (date) => {
    this.setState({ plannedStartDate: date });
  };

  handlePlannedEndDateChange = (date) => {
    this.setState({ plannedEndDate: date });
  };

  renderProjectDetails = () => {
    const { deliverableName, plannedStartDate, plannedEndDate } = this.state;
    return (
      <div className={styles.divMain1}>
        <fieldset className={styles.fieldsetWrapper}>
          <legend className={styles.legendsWrapper1}>Basic Details</legend>
          <Row className={styles.formRow}>
            <Col md={12}>
              <Form.Group className={styles.controlGroup1} controlId="deliverableName">
                <Form.Label className={styles.required}>
                  Deliverable Name: <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Form.Control
                    type="text"
                    placeholder="Enter Deliverable Name"
                    value={deliverableName}
                    onChange={this.handleDeliverableNameChange}
                    maxLength="50"
                    style={{ marginRight: "10px" }}
                  />
                  <span>({deliverableName.length}/50)</span>
                </div>
              </Form.Group>
            </Col>

            <Col md={12}>
              <Form.Group className={styles.controlGroup1} controlId="plannedStartDate">
                <Form.Label>Planned Start Date:</Form.Label>
                <div style={{ position: 'relative' }}>
                  <DatePicker
                    selected={plannedStartDate}
                    onChange={this.handlePlannedStartDateChange}
                    dateFormat="yyyy-MM-dd"
                    className="form-control"
                    placeholderText="Select Start Date"
                    style={{ paddingRight: '30px' }}
                  />
                  <FaCalendarAlt
                    onClick={() => this.startDatePickerRef.current.setOpen(true)}
                    style={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      pointerEvents: 'auto',
                      color: '#6c757d',
                      fontSize: '16px',
                      cursor: 'pointer'
                    }}
                  />
                </div>
              </Form.Group>
            </Col>

            <Col md={12}>
              <Form.Group className={styles.controlGroup1} controlId="plannedEndDate">
                <Form.Label>Planned End Date:</Form.Label>
                <div style={{ position: 'relative' }}>
                  <DatePicker
                    selected={plannedEndDate}
                    onChange={this.handlePlannedEndDateChange}
                    dateFormat="yyyy-MM-dd"
                    className="form-control"
                    placeholderText="Select End Date"
                    style={{ paddingRight: '30px' }}
                  />
                  <FaCalendarAlt
                    onClick={() => this.endDatePickerRef.current.setOpen(true)}
                    style={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      pointerEvents: 'auto',
                      color: '#6c757d',
                      fontSize: '16px',
                      cursor: 'pointer'
                    }}
                  />
                </div>
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
        {this.renderProjectDetails()}
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
          <Button type="submit" style={{ marginRight: "20px" }}>
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
            alt="Close Button"
          />
          <div>
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