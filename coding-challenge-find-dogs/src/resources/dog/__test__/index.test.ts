import { getDogImageUrlsByBreedResource } from '../index'

describe('getDogImageUrlsByBreedResource', () => {

  test('handles unknown breeds correctly', (done) => {
    getDogImageUrlsByBreedResource('unknown breed')
      .then((_) => done(new Error('This call should have thrown an error! But it didn\'t!!')))
      .catch((_) => done())
  });

  test('handles known breeds correctly', async () => {
    return getDogImageUrlsByBreedResource('appenzeller').then((dogImageUrls) => {
      expect(dogImageUrls).not.toBeFalsy();
      expect(Array.isArray(dogImageUrls)).toBeTruthy();
      // Assuming that the known breeds contain at least 1 image always
      expect(dogImageUrls.length).toBeGreaterThan(0);
    })
  });
});
