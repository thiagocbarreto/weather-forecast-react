import axios from 'axios';

const geocodingBaseURL = 'https://geocoding.geo.census.gov';

export const geocodingService = axios.create({
  baseURL: geocodingBaseURL,
});

export const getOneLineAddressSearchPath = (address: string) =>
  `/geocoder/locations/onelineaddress?` +
  'benchmark=Public_AR_Current' +
  `&address=${encodeURI(address)}`;

type GetAddressCoordinatesResponse = {
  longitude: number;
  latitude: number;
} | null;

export const getAddressGeoCoordinates = async (
  address: string,
): Promise<GetAddressCoordinatesResponse> => {
  const response = await geocodingService.get(
    getOneLineAddressSearchPath(address),
  );

  const { addressMatches } = response.data.result;

  const firstMatch = addressMatches[0];

  return firstMatch
    ? {
        longitude: firstMatch.coordinates.x,
        latitude: firstMatch.coordinates.y,
      }
    : null;
};
