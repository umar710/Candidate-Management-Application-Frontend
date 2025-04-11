import React from "react";
import { Table, Button, ButtonGroup } from "react-bootstrap";

const CandidateTable = ({ candidates, onEdit, onDelete }) => {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Name</th>
          <th>Phone</th>
          <th>Email</th>
          <th>Gender</th>
          <th>Experience</th>
          <th>Skills</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {candidates.length > 0 ? (
          candidates.map((candidate) => (
            <tr key={candidate._id}>
              <td>{candidate.name}</td>
              <td>{candidate.phone}</td>
              <td>{candidate.email}</td>
              <td>{candidate.gender}</td>
              <td>{candidate.experience}</td>
              <td>{candidate.skills.join(", ")}</td>
              <td>
                <ButtonGroup size="sm">
                  <Button
                    variant="outline-primary"
                    onClick={() => onEdit(candidate)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    onClick={() => onDelete(candidate._id)}
                  >
                    Delete
                  </Button>
                </ButtonGroup>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="7" className="text-center">
              No candidates found
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default CandidateTable;
