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

export const SearchBlock = styled.div`
  margin: 3rem 0.5rem;
  display: flex;
  flex-direction: column;
`;

export const SearchForm = styled.form`
  display: flex;
`;

export const SearchInput = styled.input`
  flex: 1;
  padding: 0.5rem;
  background-color: ${(props) => props.theme.colors.tertiary};
  font-size: 2rem;
  border: none;
  border-radius: 0.5rem;
  margin-right: 1rem;
  color: ${(props) => props.theme.colors.white};

  ::placeholder {
    color: ${(props) => props.theme.colors.grey};
  }
`;

export const SearchButton = styled.button`
  padding: 0.5rem 2rem;
  font-size: 2rem;
  border-radius: 0.5rem;
  background-color: ${(props) => props.theme.colors.primary};
  border: none;
  color: ${(props) => props.theme.colors.white};
`;

export const SearchAddressExample = styled.p`
  margin-top: 1rem;
  font-size: 1.5rem;
  font-style: italic;
  color: ${(props) => props.theme.colors.grey};
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
