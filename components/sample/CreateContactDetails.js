import React from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import styles from "../../styles/createcom.module.css";

export default class CreateContactDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contact_name: "",
      mobile_nr: "",
      alt_mobile_nr: "",
      whatsapp_nr: "",
      email_id: "",
      alt_email_id: "",
      formErrors: {
        contact_name: false,
        mobile_nr: false,
        email_id: false,
      },
      alertMessages: {
        contact_name: "Contact Name is required.",
        mobile_nr: "Mobile Number is required.",
        email_id: "Email ID is required.",
      },
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { contact_name, mobile_nr, email_id } = this.state;
    let formErrors = { ...this.state.formErrors };

    if (!contact_name.trim()) {
      formErrors.contact_name = true;
    } else {
      formErrors.contact_name = false;
    }

    if (!mobile_nr.trim()) {
      formErrors.mobile_nr = true;
    } else {
      formErrors.mobile_nr = false;
    }

    if (!email_id.trim()) {
      formErrors.email_id = true;
    } else {
      formErrors.email_id = false;
    }

    this.setState({ formErrors });

    if (formErrors.contact_name || formErrors.mobile_nr || formErrors.email_id) {
      return;
    }

    console.log("Form Submitted");
  };

  render() {
    const { contact_name, mobile_nr, alt_mobile_nr, whatsapp_nr, email_id, alt_email_id, formErrors } = this.state;

    return (
      <div className={styles.mainWrapper}>
        <Form onSubmit={this.handleSubmit} className={styles.formWrapper}>
          <div className={styles.divMain1}>
            <fieldset className={styles.fieldsetWrapper}>
              <legend className={styles.legendsWrapper1}>Basic Details</legend>
              <Row className="mb-3">
                <Col xs={12}>
                  <Form.Group controlId="contact_name">
                    <Form.Label className={styles.required}>Contact Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Contact Name"
                      value={contact_name}
                      onChange={(e) => this.setState({ contact_name: e.target.value })}
                      isInvalid={formErrors.contact_name}
                      required
                    />
                    <Form.Control.Feedback type="invalid">{this.state.alertMessages.contact_name}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
            </fieldset>
          </div>

          <div className={styles.divMain1}>
            <fieldset className={styles.fieldsetWrapper}>
              <legend className={styles.legendsWrapper1}>Contact Details</legend>
              <Row className="mb-3">
                <Col xs={12} md={6}>
                  <Form.Group controlId="mobile_nr">
                    <Form.Label className={styles.required}>Mobile Nr.</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Mobile Nr."
                      value={mobile_nr}
                      onChange={(e) => this.setState({ mobile_nr: e.target.value })}
                      isInvalid={formErrors.mobile_nr}
                      required
                    />
                    <Form.Control.Feedback type="invalid">{this.state.alertMessages.mobile_nr}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group controlId="email_id">
                    <Form.Label className={styles.required}>Email ID</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter Email ID"
                      value={email_id}
                      onChange={(e) => this.setState({ email_id: e.target.value })}
                      isInvalid={formErrors.email_id}
                      required
                    />
                    <Form.Control.Feedback type="invalid">{this.state.alertMessages.email_id}</Form.Control.Feedback>
                  </Form.Group>
                  <Button variant="primary" className={styles.validateButton}>Validate Email</Button>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col xs={12} md={6}>
                  <Form.Group controlId="alt_mobile_nr">
                    <Form.Label>Alternate Mobile Nr.</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Alternate Mobile Nr."
                      value={alt_mobile_nr}
                      onChange={(e) => this.setState({ alt_mobile_nr: e.target.value })}
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group controlId="whatsapp_nr">
                    <Form.Label>WhatsApp Nr.</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter WhatsApp Nr."
                      value={whatsapp_nr}
                      onChange={(e) => this.setState({ whatsapp_nr: e.target.value })}
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group controlId="alt_email_id">
                    <Form.Label>Alternate Email ID</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter Alternate Email ID"
                      value={alt_email_id}
                      onChange={(e) => this.setState({ alt_email_id: e.target.value })}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </fieldset>
          </div>

          <div className={styles.button}>
            <Button type="submit">Create</Button>
          </div>
          <div>
            <p style={{ color: "red", marginLeft: "3px", fontSize: "15px" }}>
              * are mandatory fields
            </p>
          </div>
        </Form>
      </div>
    );
  }
}