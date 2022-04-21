/**

 * @jest-environment node

 */
import {
  geocodingService,
  getOneLineAddressSearchPath,
  // getAddressCoordinates,
} from '.';

describe('Geocoding Service', () => {
  const testRequestPathTestString = getOneLineAddressSearchPath(
    '4600 Silver Hill Rd, Washington, DC',
  );

  test('should be alive', async () => {
    const response = await geocodingService.get(testRequestPathTestString);

    expect(response.status).toBe(200);
  });

  test('should return valid coordinates', async () => {
    const response = await geocodingService.get(testRequestPathTestString);

    const { coordinates } = response.data.result.addressMatches[0];

    // longitude
    expect(typeof coordinates.x).toBe('number');
    // latitude
    expect(typeof coordinates.y).toBe('number');
  });
});

/* describe('getAddressCoordinates', () => {
  test('should call axios with correct path', async () => {});
}); */
