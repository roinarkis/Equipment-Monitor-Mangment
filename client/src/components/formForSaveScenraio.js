import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function FormForSaveScenario({ isOpen, onRequestClose, onSubmit }) {
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = () => {
    if (name && author) {
      onSubmit(name, author);
    } else {
      alert('Both fields are required');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add Scenario"
      className="popup-modal"
      overlayClassName="popup-overlay"
    >
      <div className="popup-content">
        <h2>Add Scenario</h2>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Author:
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </label>
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={onRequestClose}>Close</button>
      </div>
    </Modal>
  );
};