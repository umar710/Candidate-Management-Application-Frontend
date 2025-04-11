import axios from "axios";

//const API_URL = "http://localhost:5000/api/candidates";
const API_URL =
  "https://candidate-management-application-backend-1nmh.onrender.com/api/candidates";

export const getCandidates = async (params) => {
  try {
    const response = await axios.get(API_URL, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching candidates:", error);
    throw error;
  }
};

export const addCandidate = async (candidateData) => {
  try {
    const response = await axios.post(API_URL, candidateData);
    return response.data;
  } catch (error) {
    console.error("Error adding candidate:", error);
    throw error;
  }
};

// Add these new API functions
export const updateCandidate = async (id, candidateData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, candidateData);
    return response.data;
  } catch (error) {
    console.error("Error updating candidate:", error);
    throw error;
  }
};

export const deleteCandidate = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting candidate:", error);
    throw error;
  }
};
