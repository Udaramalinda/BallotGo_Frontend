import React, { useState } from "react";
import { Card, Form, Radio, Button, message } from "antd";
import { submitVote } from "../apis/Vote.Service";

export default function VotingPage() {
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  // List of candidates (can be fetched from an API)
  const candidates = [
    { id: 1, name: "Candidate A" },
    { id: 2, name: "Candidate B" },
    { id: 3, name: "Candidate C" },
  ];

  const onFinish = async () => {
    if (!selectedCandidate) {
      message.error("Please select a candidate before submitting.");
      return;
    }

    // Prepare the vote data
    const voteData = {
      candidateId: selectedCandidate,
    };

    // Call the API to submit the vote
    const result = await submitVote(voteData);
    if (result.success) {
      message.success("Your vote has been submitted successfully.");
      // Optionally, navigate to a success page or show a confirmation modal
    } else {
      message.error(
        "There was an error submitting your vote. Please try again."
      );
    }
  };

  return (
    <div className="voting-page">
      <Card
        title="Select Your Candidate"
        style={{
          margin: "20px auto",
          width: "50%",
          borderRadius: "15px",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        }}
      >
        <Form onFinish={onFinish}>
          {/* Candidate selection using Radio buttons */}
          <Form.Item>
            <Radio.Group
              onChange={(e) => setSelectedCandidate(e.target.value)}
              value={selectedCandidate}
            >
              {candidates.map((candidate) => (
                <Radio key={candidate.id} value={candidate.id}>
                  {candidate.name}
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit Vote
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
