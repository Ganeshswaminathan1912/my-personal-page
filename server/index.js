**server/index.js**
const express = require('express');
const fileUpload = require('express-fileupload');
const docxParser = require('docx-parser'); // Or any DOCX parsing library
const cors = require('cors'); // For handling CORS issues

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for your React frontend (adjust origin if needed)
app.use(cors({ origin: 'http://localhost:3000' }));

// Middleware for handling file uploads
app.use(fileUpload({
  createParentPath: true,
}));

app.post('/api/upload', async (req, res) => {
  try {
    if (!req.files) {
      return res.status(400).send('No files were uploaded.');
    }

    const resumeFile = req.files.resume;

    // Process DOCX file and extract data
    docxParser.parseDOC(resumeFile.data, (err, data) => {
      if (err) {
        console.error('Error parsing DOCX:', err);
        return res.status(500).send('Error parsing resume.');
      }

      const extractedText = data.toString();
      
      // Use regular expressions or other methods to extract name and skills
      // ... (Implementation depends on resume structure and data you need)

      const name = extractName(extractedText); // Replace with your extraction logic
      const skills = extractSkills(extractedText); 

      return res.json({ name, skills });
    });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Server error');
  }
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));