**client/src/App.js**
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [name, setName] = useState('');
  const [skills, setSkills] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('resume', selectedFile);

    try {
      const res = await axios.post('/api/upload', formData, { 
        headers: { 'Content-Type': 'multipart/form-data' } 
      });

      setName(res.data.name);
      setSkills(res.data.skills); 
    } catch (err) {
      console.error('Error uploading resume:', err);
    }
  };

  return (
    <div>
      <h1>Resume Parser</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>

      {name && <h2>Name: {name}</h2>}
      {skills.length > 0 && (
        <ul>
          {skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;