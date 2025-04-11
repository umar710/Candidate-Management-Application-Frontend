import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

const CandidateFilter = ({ filters, setFilters, availableSkills }) => {
  const [showFilter, setShowFilter] = useState(false);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const toggleFilter = () => setShowFilter(!showFilter);

  return (
    <div className="mb-3 position-relative">
      <Button variant="outline-secondary" onClick={toggleFilter}>
        <FontAwesomeIcon icon={faFilter} className="me-2" />
        Filter
      </Button>

      {showFilter && (
        <div className="filter-dropdown p-3 mt-2 border rounded bg-white shadow">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Gender</Form.Label>
              <Form.Select
                value={filters.gender || ""}
                onChange={(e) =>
                  handleFilterChange("gender", e.target.value || null)
                }
              >
                <option value="">All Genders</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Experience</Form.Label>
              <Form.Select
                value={filters.experience || ""}
                onChange={(e) =>
                  handleFilterChange("experience", e.target.value || null)
                }
              >
                <option value="">All Experience Levels</option>
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
                value={filters.skills || []}
                onChange={(e) => {
                  const options = Array.from(
                    e.target.selectedOptions,
                    (option) => option.value
                  );
                  handleFilterChange("skills", options.length ? options : null);
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
        </div>
      )}
    </div>
  );
};

export default CandidateFilter;
