import { useEffect, useState } from 'react';
import { getDogImageUrlsByBreedResource } from '../../resources/dog';

interface ServiceResponse {
  loading: boolean;
  data: string[];
  error: Error | null;
}
const INITIAL_STATE_SERVICE_RESPONSE: ServiceResponse = { error: null, loading: true, data: [] }

export const useDogImageUrlsByBreedService = (breed: string): ServiceResponse => {
  const [response, setResponse] = useState(INITIAL_STATE_SERVICE_RESPONSE);

  const getDogImageUrlsByBreedResourceAndSetState = async () => {
    try {
      const dogImageUrls = await getDogImageUrlsByBreedResource(breed);
      setResponse({ error: null, loading: false, data: dogImageUrls });
    } catch (error) {
      setResponse({ error, loading: false, data: [] });
    }
  }

  useEffect(() => {
    getDogImageUrlsByBreedResourceAndSetState()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [breed]);

  return response;
};