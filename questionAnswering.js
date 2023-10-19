const { Inference } = require('@huggingface/inference');

async function questionAnswering(text, question) {
  const modelId = 'deepset/roberta-base-squad2';

  const inference = new Inference({
    modelId,
  });

  try {
    const response = await inference.run({ context: text, question });

    return response[0].answer;
  } catch (error) {
    console.error('Question-answering error:', error);
    throw error;
  }
}

module.exports = { questionAnswering };
