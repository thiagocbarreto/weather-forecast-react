/**

 * @jest-environment node

 */
import {
  geocodingService,
  getOneLineAddressSearchPath,
  getAddressGeoCoordinates,
} from '.';

const validAddress = '4600 Silver Hill Rd, Washington, DC';
const invalidAddress = 'New York, NY';

describe('getOneLineAddressSearchPath', () => {
  it('should return valid path', () => {
    const address = 'X Y Z';

    const path = getOneLineAddressSearchPath(address);

    expect(path).toBe(
      `/geocoder/locations/onelineaddress?benchmark=Public_AR_Current&address=${encodeURI(
        address,
      )}`,
    );
  });
});

describe('Geocoding Service', () => {
  it('should be alive', async () => {
    const response = await geocodingService.get(
      getOneLineAddressSearchPath(validAddress),
    );

    expect(response.status).toBe(200);
  });

  it('should return valid coordinates', async () => {
    const response = await geocodingService.get(
      getOneLineAddressSearchPath(validAddress),
    );

    const { coordinates } = response.data.result.addressMatches[0];

    // longitude
    expect(typeof coordinates.x).toBe('number');
    // latitude
    expect(typeof coordinates.y).toBe('number');
  });

  it('should return invalid coordinates', async () => {
    const response = await geocodingService.get(
      getOneLineAddressSearchPath(invalidAddress),
    );

    const firstMatch = response.data.result.addressMatches[0];

    expect(firstMatch).toBe(undefined);
  });
});

describe('getAddressGeoCoordinates', () => {
  it('should return valid coordinates', async () => {
    const coordinates = await getAddressGeoCoordinates(validAddress);

    expect(typeof coordinates?.longitude).toBe('number');
    expect(typeof coordinates?.latitude).toBe('number');
  });

  it('should return invalid coordinates', async () => {
    const coordinates = await getAddressGeoCoordinates(invalidAddress);

    expect(coordinates).toBe(null);
  });
});
