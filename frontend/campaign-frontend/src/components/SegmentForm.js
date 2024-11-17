import React, { useState } from 'react';
import axios from 'axios';
import '../style/SegmentForm.css';

const SegmentForm = () => {
  const [name, setName] = useState('');
  const [logic, setLogic] = useState('AND'); // Default to "AND" logic
  const [conditions, setConditions] = useState([]);
  const [audienceSize, setAudienceSize] = useState(null);
  const [segments, setSegments]=useState([]);
  
  const addCondition = () => {
    setConditions([...conditions, { field: '', operator: '', value: '' }]);
  };
  const fetchSegments = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/audience');
      setSegments(response.data);
    } catch (error) {
      console.error('Error fetching segments:', error);
    }
  };

  const updateCondition = (index, key, value) => {
    const newConditions = [...conditions];
    newConditions[index][key] = value;
    setConditions(newConditions);
  };

  const removeCondition = (index) => {
    const newConditions = conditions.filter((_, i) => i !== index);
    setConditions(newConditions);
  };

  const handleCreateSegment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/audience', {
        name,
        conditions,
        logic, // Include the logic (AND/OR) in the payload
      });
      alert('Segment created successfully!');
      fetchSegments();
      setName('');
      setConditions([]);
      setLogic('AND');
    } catch (error) {
      console.error('Error creating segment:', error.response?.data || error.message);
      alert('Failed to create segment.');
    }
  };

  const calculateSize = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/audience/preview', { conditions });
      setAudienceSize(response.data.size);
    } catch (error) {
      console.error('Error calculating size:', error);
      alert('Failed to calculate audience size.');
    }
  };

  return (
    <form onSubmit={handleCreateSegment} className="segment-form">
      <h2 className="segment-form-heading">Create Audience Segment</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Segment Name"
        className="segment-form-input"
        required
      />
      {conditions.map((condition, index) => (
        <div key={index} className="condition-row">
          <select
            value={condition.field}
            onChange={(e) => updateCondition(index, 'field', e.target.value)}
            className="segment-form-select"
          >
            <option value="">Select Field</option>
            <option value="spending">Spending</option>
            <option value="visits">Visits</option>
            <option value="lastVisit">Last Visit</option>
          </select>
          <select
            value={condition.operator}
            onChange={(e) => updateCondition(index, 'operator', e.target.value)}
            className="segment-form-select"
          >
            <option value="">Select Operator</option>
            <option value="gt">Greater Than</option>
            <option value="lt">Less Than</option>
            <option value="eq">Equals</option>
          </select>
          <input
            type="number"
            value={condition.value}
            onChange={(e) => updateCondition(index, 'value', e.target.value)}
            placeholder="Value"
            className="segment-form-input"
          />
          <button
            type="button"
            onClick={() => removeCondition(index)}
            className="remove-condition-button"
          >
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={addCondition} className="add-condition-button">
        Add Condition
      </button>
      <select
        value={logic}
        onChange={(e) => setLogic(e.target.value)}
        className="segment-form-select"
      >
        <option value="AND">AND</option>
        <option value="OR">OR</option>
      </select>
      <button type="submit" className="create-segment-button">
        Create Segment
      </button>
    </form>
  );
};

export default SegmentForm;
