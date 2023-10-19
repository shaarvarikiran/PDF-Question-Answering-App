# PDF Question Answering App (Backend)

This is the backend code for a PDF Question Answering web application. It provides two main features:

1. **Upload and Extract Text from PDF Files:** Upload a PDF file, and the application will extract the text content from it.

2. **Question Answering:** Given a question and context, the application uses a pre-trained model to provide answers.

## Getting Started

Before running the backend, make sure you have Node.js and npm (Node Package Manager) installed.

1. Clone this repository:

   ```bash
   git clone https://github.com/shaarvarikiran/pdf-question-answering-app.git
   cd pdf-question-answering-app/backend
   ```

2. Navigate to the project folder:

```cd pdf-question-answering-app```

# Usage

## Backend Setup

1. In the backend directory, create a .env file and set your Hugging Face Inference API access token:
```HF_API_TOKEN=your-access-token```

2. Start the backend server:
```npm start```

The backend should now be running at ```http://localhost:5000.```

# Testing the Backend with Postman

You can use Postman to test the backend API endpoints for the PDF Question Answering App. Here are the steps to test both the file upload and question-answering endpoints.

## Testing File Upload Endpoint (/upload)

1. Create a new request in Postman by clicking "New" > "Request."

2. In the request settings:

   - Name the request "File Upload."
   - Set the request method to "POST."
   - Enter the request URL: `http://localhost:5000/upload`.

3. In the "Body" tab of the request, select the "form-data" option.

4. Add a key-value pair where the key is "pdfFile" (matching what your backend expects), and the value is a PDF file that you want to test with.

5. Click "Send" to make the request.

6. Postman will send the PDF file to your /upload endpoint, and you should receive a response. Verify if the response contains the extracted text.

## Testing Question-Answering Endpoint (/question-answering)

1. Create another new request in Postman.

2. Name it "Question Answer."

3. Set the request method to "POST."

4. Enter the request URL: `http://localhost:5000/question-answering`.

5. In the "Body" tab, select the "raw" option.

6. Set the body content type to "JSON (application/json)."

7. In the request body, provide a JSON object with the question and context you want to test. For example:

   ```json
   {
     "question": "How much does the iPhone cost in the document?",
     "context": <pre-processed text from upload>
   }

8. Click "Send" to make the request.

# Contributions
Contributions are welcome! If you'd like to enhance this PDF Question Answering App, feel free to fork the repository, make improvements, and submit pull requests.
