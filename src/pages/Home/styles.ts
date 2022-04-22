import styled from 'styled-components';

export const PageContainer = styled.main`
  flex-direction: column;
  margin: 4rem auto;
  background-color: ${(props) => props.theme.colors.white};
  display: flex;
  min-width: 60rem;
  max-width: 96rem;
`;

export const PageTitle = styled.h1`
  font-size: 6rem;
  font-weight: bold;
  color: ${(props) => props.theme.colors.primary};
  margin
`;

export const LoadingMessage = styled.p`
  margin-top: 1rem;
  color: ${(props) => props.theme.colors.grey};
  font-size: 2rem;
  font-weight: bold;
`;

export const ErrorMessage = styled.p`
  margin-top: 1rem;
  color: ${(props) => props.theme.colors.red};
  font-size: 1.8rem;
  font-weight: bold;
`;

export const WeatherForecastList = styled.ul`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;

export const WeatherForecastItem = styled.li`
  display: flex;
  flex-direction: column;
  margin: 1rem;

  .topForecastInfo {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .forecastDayName {
      font-size: 2.2rem;
      font-weight: bold;
      color: ${(props) => props.theme.colors.primary};
    }

    .forecastTemperature {
      font-weight: bold;
      font-size: 3rem;
      color: ${(props) => props.theme.colors.black};
      margin-right: 1rem;
    }
  }

  .shortForecastDescription {
    font-size: 1.7rem;
    font-style: italic;
    color: ${(props) => props.theme.colors.secondary};
  }
`;

export const EmptyMessage = styled.p`
  margin-top: 1rem;
  color: ${(props) => props.theme.colors.grey};
  font-size: 1.8rem;
  font-style: bold;
`;
