import styled from 'styled-components';

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
