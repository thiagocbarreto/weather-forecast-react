import React from 'react';

import {
  SearchBlockContainer,
  SearchForm,
  SearchInput,
  SearchButton,
  SearchAddressExample,
} from './styles';

interface SearchBlockProps {
  onSearchSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  updateSearchAddress: (value: string) => void;
}

const SearchBlock: React.FC<SearchBlockProps> = ({
  onSearchSubmit,
  updateSearchAddress,
}) => (
  <SearchBlockContainer>
    <SearchForm onSubmit={onSearchSubmit}>
      <SearchInput
        type="text"
        placeholder="Find out the forecast at..."
        onChange={(e) => updateSearchAddress(e.target.value)}
      />
      <SearchButton type="submit">Search!</SearchButton>
    </SearchForm>
    <SearchAddressExample>
      Example of a valid address: 4600 Silver Hill Rd, Washington, DC
    </SearchAddressExample>
  </SearchBlockContainer>
);

export default SearchBlock;
