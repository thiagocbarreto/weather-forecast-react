import styled from 'styled-components';

export const SearchBlockContainer = styled.div`
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
