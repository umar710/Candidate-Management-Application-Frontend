import React, { useState, useEffect, useCallback } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import { getCandidates, deleteCandidate } from "./services/api";
import SearchBar from "./components/SearchBar";
import CandidateTable from "./components/CandidateTable";
import Pagination from "./components/Pagination";
import CandidateModal from "./components/CandidateModal";
import CandidateFilter from "./components/CandidateFilter";
import "./App.css";

function App() {
  const [candidates, setCandidates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [currentCandidate, setCurrentCandidate] = useState(null);
  const availableSkills = [
    // Removed useState since we're not modifying this
    "JavaScript",
    "Python",
    "Java",
    "C#",
    "PHP",
    "React",
    "Angular",
    "Vue",
    "Node.js",
    "Express",
    "MongoDB",
    "SQL",
    "HTML",
    "CSS",
    "Docker",
  ];

  const fetchCandidates = useCallback(async () => {
    try {
      const params = {
        search: searchTerm,
        ...filters,
        page: currentPage,
        limit: 10,
      };

      const data = await getCandidates(params);
      setCandidates(data.candidates);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching candidates:", error);
    }
  }, [searchTerm, filters, currentPage]);

  useEffect(() => {
    fetchCandidates();
  }, [fetchCandidates]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleEdit = (candidate) => {
    setCurrentCandidate(candidate);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this candidate?")) {
      try {
        await deleteCandidate(id);
        fetchCandidates();
      } catch (error) {
        console.error("Error deleting candidate:", error);
        alert("Failed to delete candidate. Please try again.");
      }
    }
  };

  const handleAddNew = () => {
    setCurrentCandidate(null);
    setShowModal(true);
  };

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">Candidate Management System</h1>

      <Row className="mb-3">
        <Col md={8}>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </Col>
        <Col md={2}>
          <Button variant="primary" onClick={handleAddNew}>
            Add Candidate
          </Button>
        </Col>
        <Col md={2}>
          <CandidateFilter
            filters={filters}
            setFilters={setFilters}
            availableSkills={availableSkills}
          />
        </Col>
      </Row>

      <CandidateTable
        candidates={candidates}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      <CandidateModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        refreshCandidates={fetchCandidates}
        availableSkills={availableSkills}
        candidateToEdit={currentCandidate}
      />
    </Container>
  );
}

export default App;
