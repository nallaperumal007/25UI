import React from "react";
import { Form, Row, Col, Button, Table } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../../styles/createcom.module.css";

export default class CreateTemplate extends React.Component {
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
    const { proj_name, type } = this.state;
    const maxLength = 50;
    const currentLength = proj_name.length;

    return (
      <div className={styles.divMain1}>
        <fieldset className={styles.fieldsetWrapper}>
          <legend className={styles.legendsWrapper1}>Basic Details</legend>
          <Row className={styles.formRow}>
            <Col md={12}>
            <Form.Group className={styles.controlGroup1} controlId="name">
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                  <Form.Label className={styles.required} style={{ marginBottom: '0', flexShrink: 0 }}>
                    Name:
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter name"
                    required
                    maxLength={maxLength}
                    value={proj_name}
                    onChange={(e) => this.setState({ proj_name: e.target.value })}
                    style={{ marginLeft: '10px', flexGrow: 1 }}
                  />
                  <Form.Text
                    className="text-muted"
                    style={{ marginLeft: '10px', color: 'blue' }} // Style for the character count
                  >
                    ({currentLength}/{maxLength})
                  </Form.Text>
                </div>
              </Form.Group>
            </Col>





            <Col md={12}>
              <Form.Group className={styles.controlGroup1} controlId="type">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Form.Label className={styles.required} style={{ marginBottom: '0', flexShrink: 0 }}>
                    Template Type:<span style={{ color: 'red' }}> </span>
                  </Form.Label>
                  <div style={{ display: 'flex', alignItems: 'center', marginLeft: '20px' }}>
                    <Form.Check
                      inline
                      type="checkbox"
                      label="Letter"
                      checked={type === 'Letter'}
                      onChange={(e) => this.setState({ type: e.target.checked ? 'Letter' : '' })}
                    />
                    <Form.Check
                      inline
                      type="checkbox"
                      label="Email"
                      checked={type === 'Email'}
                      onChange={(e) => this.setState({ type: e.target.checked ? 'Email' : '' })}
                      style={{ marginLeft: '15px' }} 
                    />
                  </div>
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
