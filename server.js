const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const pdf = require('pdf-parse');
const cors = require('cors'); // Import the cors module
const { HfInference } = require('@huggingface/inference'); // Import the Hugging Face Inference API
const fs = require('fs'); // Import the file system module

const app = express();
app.use(bodyParser.json());

// Initialize Hugging Face Inference client with your access token
const client = new HfInference('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');

// Enable CORS for requests from your React app (running on http://localhost:3000)
app.use(cors({ origin: 'http://localhost:3000' }));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// Serve uploaded files statically
app.use('/uploads', express.static('uploads'));

app.post('/upload', upload.single('pdfFile'), (req, res) => {
  const pdfFilePath = `uploads/${req.file.originalname}`;
  const dataBuffer = fs.readFileSync(pdfFilePath);

  pdf(dataBuffer)
    .then((data) => {
      const text = data.text;
      res.json({ text });
    })
    .catch((error) => {
      console.error('Error extracting text from PDF:', error);
      res.status(500).json({ error: 'Text extraction failed' });
    });
});

app.post('/question-answering', (req, res) => {
  const { question, context } = req.body;

  client.questionAnswering({
    model: 'deepset/roberta-base-squad2',
    inputs: { question, context },
  })
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      console.error('Error answering the question:', error);
      res.status(500).json({ error: 'Question-answering failed' });
    });
});

// Define a root path route
app.get('/', (req, res) => {
    res.send('Welcome to the PDF Question Answering App');
  });

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
