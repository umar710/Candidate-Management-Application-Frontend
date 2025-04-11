import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { addCandidate, updateCandidate } from "../services/api";

const CandidateModal = ({
  show,
  handleClose,
  refreshCandidates,
  availableSkills,
  candidateToEdit,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    gender: "Male",
    experience: "1 Year",
    skills: [],
  });

  useEffect(() => {
    if (candidateToEdit) {
      setFormData({
        name: candidateToEdit.name,
        phone: candidateToEdit.phone,
        email: candidateToEdit.email,
        gender: candidateToEdit.gender,
        experience: candidateToEdit.experience,
        skills: [...candidateToEdit.skills],
      });
    } else {
      setFormData({
        name: "",
        phone: "",
        email: "",
        gender: "Male",
        experience: "1 Year",
        skills: [],
      });
    }
  }, [candidateToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.phone.trim()) errors.phone = "Phone is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Invalid email format";
    }
    if (formData.skills.length === 0)
      errors.skills = "At least one skill is required";

    if (Object.keys(errors).length > 0) {
      // Display errors to user (you could set them in state to display)
      alert(
        `Please fix the following errors:\n${Object.values(errors).join("\n")}`
      );
      return;
    }

    try {
      if (candidateToEdit) {
        await updateCandidate(candidateToEdit._id, formData);
      } else {
        await addCandidate(formData);
      }
      refreshCandidates();
      handleClose();
    } catch (error) {
      console.error("Error saving candidate:", error);
      alert(
        `Failed to ${
          candidateToEdit ? "update" : "add"
        } candidate. Please try again.`
      );
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {candidateToEdit ? "Edit" : "Add New"} Candidate
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Gender</Form.Label>
            <Form.Select
              name="gender"
              value={formData.gender}
              onChange={(e) =>
                setFormData({ ...formData, gender: e.target.value })
              }
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Experience</Form.Label>
            <Form.Select
              name="experience"
              value={formData.experience}
              onChange={(e) =>
                setFormData({ ...formData, experience: e.target.value })
              }
            >
              <option value="1 Year">1 Year</option>
              <option value="2 Years">2 Years</option>
              <option value="3 Years">3 Years</option>
              <option value="4 Years">4 Years</option>
              <option value="5+ Years">5+ Years</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Skills</Form.Label>
            <Form.Control
              as="select"
              multiple
              name="skills"
              value={formData.skills}
              onChange={(e) => {
                const options = Array.from(
                  e.target.selectedOptions,
                  (option) => option.value
                );
                setFormData({ ...formData, skills: options });
              }}
            >
              {availableSkills.map((skill) => (
                <option key={skill} value={skill}>
                  {skill}
                </option>
              ))}
            </Form.Control>
            <Form.Text className="text-muted">
              Hold Ctrl/Cmd to select multiple skills
            </Form.Text>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {candidateToEdit ? "Update" : "Save"} Candidate
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CandidateModal;
