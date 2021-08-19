import * as mobilenet from '@tensorflow-models/mobilenet';

export const getPredicitonResult = async (imageUrl: string): Promise<string> => {
  const img = document.createElement('img');
  img.src = imageUrl;

  const model = await mobilenet.load();
  const predictions = await model.classify(img, 1);

  return predictions[0].className.toLowerCase();
}