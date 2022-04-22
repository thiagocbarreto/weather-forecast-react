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

export const EmptyMessage = styled.p`
  margin-top: 1rem;
  color: ${(props) => props.theme.colors.grey};
  font-size: 1.8rem;
  font-style: bold;
`;
