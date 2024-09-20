import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../../styles/createcom2.module.css";
import { Form, Row, Col, Button } from "react-bootstrap";

export default function Template(props) {
  const [formData, setFormData] = useState({
    deliverableName: "",
    plannedStartDate: "",
    plannedEndDate: "",
  });

  const [charCount, setCharCount] = useState(0);
  const maxCharLimit = 50;

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "deliverableName") {
      setCharCount(value.length);
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.wrapper}>
        <img
          src="/assets/close-red.png"
          className={styles.closeButton}
          onClick={() => props.setVisibility(false)}
          alt="Close"
        />
        <div>
          <p className={styles.title}>Create Deliverable Details</p>

          <Form className={styles.formWrapper}>
            {/* Basic Details Section */}
            <div className={styles.divMain2}>
              <fieldset className={styles.fieldsetWrapper}>
                <legend className={styles.legendsWrapper1}>Basic Details</legend>
                <Row style={{ marginBottom: "15px" }}>
                  <Col md={12}>
                    {/* Deliverable Name Field */}
                    <Form.Group controlId="deliverableName" style={{ margin: 0 }}>
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
                          Deliverable:<span style={{ color: "red" }}> *</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Deliverable Name"
                          value={formData.deliverableName}
                          name="deliverableName"
                          onChange={handleInputChange}
                          maxLength={maxCharLimit}
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
                      <span style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
                        {charCount}/{maxCharLimit}
                      </span>
                    </Form.Group>
                  </Col>
                </Row>

                {/* Planned Start Date Field */}
                <Row style={{ marginBottom: "15px" }}>
                  <Col md={12}>
                    <Form.Group controlId="plannedStartDate" style={{ margin: 0 }}>
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
                          Start Date:
                        </Form.Label>
                        <Form.Control
                          type="date"
                          value={formData.plannedStartDate}
                          name="plannedStartDate"
                          onChange={handleInputChange}
                          style={{
                            flexGrow: 1,
                            padding: "10px",
                            fontSize: "16px",
                            borderRadius: "5px",
                            border: "1px solid #ccc",
                            marginLeft: "20px",
                          }}
                        />
                      </div>
                    </Form.Group>
                  </Col>
                </Row>

                {/* Planned End Date Field */}
                <Row style={{ marginBottom: "15px" }}>
                  <Col md={12}>
                    <Form.Group controlId="plannedEndDate" style={{ margin: 0 }}>
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
                           End Date:
                        </Form.Label>
                        <Form.Control
                          type="date"
                          value={formData.plannedEndDate}
                          name="plannedEndDate"
                          onChange={handleInputChange}
                          style={{
                            flexGrow: 1,
                            padding: "10px",
                            fontSize: "16px",
                            borderRadius: "5px",
                            border: "1px solid #ccc",
                            marginLeft: "20px",
                          }}
                        />
                      </div>
                    </Form.Group>
                  </Col>
                </Row>
              </fieldset>
            </div>
          </Form>

          <div>
            <p style={{ color: "red", marginLeft: "3px", fontSize: "15px" }}>
              * are mandatory fields
            </p>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
            <Button type="submit" style={{ marginRight: "20px" }}>
              Create
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}