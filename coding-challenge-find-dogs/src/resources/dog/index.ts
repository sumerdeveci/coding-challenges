const DOGS_API_ENDPOINT = 'https://dog.ceo/api';

export const getDogImageUrlsByBreedResource = async (breed: string): Promise<string[]> => {
  const response: { message: string[], status: string } = await fetch(`${DOGS_API_ENDPOINT}/breed/${breed}/images`).then(
    (res) => res.json()
  );

  if (response.status === 'error') throw new Error(`The images regarding the requested breed cannot be fetched: ${breed}`);

  if (response.status === 'success') {
    const dogImageUrls = response.message;
    if (!Array.isArray(dogImageUrls)) throw new Error('Received dog images is not an array!');
    return dogImageUrls;
  }

  throw new Error('An unexpected situation occured, the received status is neither "error" nor "success", please contact customer support.')
};
