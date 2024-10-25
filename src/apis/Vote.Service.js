import axios from "axios";

// Submit vote API
export const submitVote = async (voteData) => {
  try {
    const response = await axios.post("/api/vote", voteData);
    return response.data; // Assuming response contains { success: true/false }
  } catch (error) {
    console.error("Error submitting vote:", error);
    return { success: false };
  }
};
