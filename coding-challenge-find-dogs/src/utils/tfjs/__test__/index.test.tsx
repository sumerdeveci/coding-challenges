import { getPredicitonResult } from '../index';
import '@tensorflow/tfjs-backend-webgl';

describe('getPredicitonResult', () => {
  test('Identifies breed correctly', async () => {
    return getPredicitonResult('https://images.dog.ceo/breeds/appenzeller/n02107908_1030.jpg').then((predictionResult) => {
      expect(predictionResult).toBe('appenzeller');
    });
  // Adding extra time, because the process might take some time
  }, 15000);
});