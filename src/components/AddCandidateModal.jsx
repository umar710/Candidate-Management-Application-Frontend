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
  const [errors, setErrors] = useState({});

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSkillsChange = (e) => {
    const options = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setFormData((prev) => ({
      ...prev,
      skills: options,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (formData.skills.length === 0)
      newErrors.skills = "At least one skill is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

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
          {/* Rest of the form remains the same */}
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
