import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../../styles/createcom2.module.css";
import { Form, Row, Col, Table, Button } from "react-bootstrap";

export default class Form3 extends React.Component {
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

  handleRoleChange = (roleName, e) => {
    this.setState({ [roleName]: e.target.value });
  };

  handleDateChange = (date) => {
    this.setState({ date });
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
              <tr>
                <td>1</td>
                <td>Arthi</td>
                <td>
                  <Form.Check type="checkbox" />
                </td>
                <td>
                  <Form.Check type="checkbox" />
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>Aswin</td>
                <td>
                  <Form.Check type="checkbox" />
                </td>
                <td>
                  <Form.Check type="checkbox" />
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
            <p className={styles.title}>
              {`${this.props.editable === undefined ? "Create" : this.props.editable ? "Update" : "View"
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
