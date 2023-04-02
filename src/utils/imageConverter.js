import { createWorker } from 'tesseract.js';

export const convertImageToText = async (imageDataUri) => {
  if (!imageDataUri) {
    return Promise.resolve();
  }
  const worker = await createWorker();
  await worker.loadLanguage('eng');
  await worker.initialize('eng');
  const { data } = await worker.recognize(imageDataUri);
  const textArray = data.text.split('\n');

  return textArray;
};
