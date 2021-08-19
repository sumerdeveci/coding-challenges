import { waitFor } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import { useDogImageUrlsByBreedService } from "..";

describe('useDogImageUrlsByBreedService', () => {
  const expectInitialServiceState = (current: {
    loading: boolean;
    data: string[];
    error: Error | null;
  }) => {
    expect(Array.isArray(current.data)).toBeTruthy();
    expect(current.data.length).toBe(0);

    expect(current.loading).toBe(true);

    expect(current.error).toBeFalsy();
  }

  test('handles unknown breeds correctly', async () => {
    const { result } = renderHook(() => useDogImageUrlsByBreedService('unknown breed'));

    // Start loading
    expectInitialServiceState(result.current);

    // After loading is done
    await waitFor(() => expect(result.current.loading).toBe(false), { timeout: 2000 });

    expect(Array.isArray(result.current.data)).toBeTruthy();
    expect(result.current.data.length).toBe(0);

    expect(result.current.error).toBeTruthy();
  });

  test('handles known breeds correctly', async () => {
    const { result } = renderHook(() => useDogImageUrlsByBreedService('appenzeller'));

    // Start loading
    expectInitialServiceState(result.current);

    // After loading is done
    await waitFor(() => expect(result.current.loading).toBe(false), { timeout: 2000 });

    expect(Array.isArray(result.current.data)).toBeTruthy();
    // Assuming that the known breeds contain at least 1 image always
    expect(result.current.data.length).toBeGreaterThan(0);

    expect(result.current.error).toBeFalsy();
  });
});
