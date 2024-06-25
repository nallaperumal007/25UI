import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import Colors from "../../constants/colors";
import styles from "../../styles/createcom.module.css";
import { Form, Row, Col, Button, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default class EmProjDet extends React.Component {
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
      arr_dropdown: []
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
  //#region Insert Function
  async insertRecord() {
    const {
      proj_name,
    } = this.state;

    try {
      const alertInitial = "";
      let alertText = alertInitial;

      if (proj_name === "") {
        alertText += ". Name\n";
      }

      if (alertText !== alertInitial) {
        Swal.fire({
          title: "Fill these fields:\n",
          html:
            '<pre style="display: flex;text-align: justify;flex-direction: column;align-items: center;line-height: 1.5">' +
            alertText +
            "</pre>",
          confirmButtonColor: Colors.primaryColor,
          width: Colors.width,
          allowOutsideClick: false,
        });
        return;
      }

      let data = {}
    }
    catch (err) {
      Swal.fire({
        text: err,
        confirmButtonColor: Colors.red,
        width: Colors.width,
        allowOutsideClick: false,
      });
      this.setState({ is_loading: false });
      console.log(err);
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    // Implement your submit logic here
    console.log("Form Submitted");
  };

  renderProjectDetails = () => {
    const {
      proj_name,
      start_date,
    } = this.state;
    return (
      <div className={styles.divMain1}>
        <fieldset className={styles.fieldsetWrapper}>
          <legend className={styles.legendsWrapper1}>Section 1</legend>
          <Row className={styles.formRow}>
            <Col md={6}>
              <Form.Group
                className={styles.controlGroup1}
                controlId="proj_name"
              >
                <Form.Label className={styles.required}>
                  Name
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  value={proj_name}
                  name="proj_name"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group
                className={styles.controlGroup1}
                controlId="start_date"
              >
                <Form.Label className={styles.required}>Start Date</Form.Label>
                <DatePicker
                  className={styles.date1}
                  dateFormat="dd-MM-yyyy"
                  selected={start_date}
                />
              </Form.Group>
            </Col>

            <Form.Group className={styles.controlGroup2} controlId="role_id">
              <Form.Control
                as="select"
                name="role_id"
                required
              >
                <option value="" disabled>
                  Select
                </option>
                <option value="1">Project Manager</option>
                <option value="2">Branch Manager</option>
              </Form.Control>
            </Form.Group>
          </Row>
        </fieldset>
      </div>
    );
  };

  renderAddressTable = () => {
    const {
      proj_name,
      start_date,
      arr_dropdown,
    } = this.state;
    return (
      <div className={styles.divMain1}>
        <fieldset className={styles.fieldsetWrapper}>
          <legend className={styles.legendsWrapper1}>Section 2</legend>
          <Row className={styles.formRow}>
            <Col md={6}>
              <Form.Group
                className={styles.controlGroup1}
                controlId="proj_name"
              >
                <Form.Label className={styles.required}>
                  Name
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  value={proj_name}
                  name="proj_name"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group
                className={styles.controlGroup1}
                controlId="start_date"
              >
                <Form.Label className={styles.required}>Start Date</Form.Label>
                <DatePicker
                  className={styles.date1}
                  dateFormat="dd-MM-yyyy"
                  selected={start_date}
                />
              </Form.Group>
            </Col>

            <Form.Group className={styles.controlGroup2} controlId="role_id">
              <Form.Control
                as="select"
                name="role_id"
                required
              >
                <option value="" disabled>
                  Select
                </option>
                {arr_dropdown.map((a) => (
                  <option value={a.id}>{a.name}</option>
                ))}
              </Form.Control>
            </Form.Group>
          </Row>
        </fieldset>
      </div>
    );
  };

  renderCreateRecordForm = () => {
    return (
      <Form onSubmit={this.handleSubmit} className={styles.formWrapper}>
        {this.renderProjectDetails()}
        {this.renderAddressTable()}
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
              <div class="bouncing-loader">
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
          />
          <div>
            <p className={styles.title}>
              {`${editable == undefined ? "Create" : editable ? "Update" : "View"
                } Details`}
            </p>

            {this.renderCreateRecordForm()}

            <div className={styles.button}>
              <div className={styles.button}>
                <button
                  className={`button`}
                  onClick={() =>
                    editable == undefined
                      ? this.insertRecord()
                      : editable && this.updateRecord()
                  }
                >
                  {"Submit"}
                </button>
              </div>
            </div>

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
