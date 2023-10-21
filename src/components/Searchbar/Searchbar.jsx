import { BtnSubmit, SearchForm, SearchFormInput,Header } from './Searchbar.style';

export const SearchBar = ({ onSubmit }) => {
  return (
    <Header>
      <SearchForm
        onSubmit={evt => {
          evt.preventDefault();
          const { searchQuery } = evt.target.elements;
          onSubmit(searchQuery.value);
          evt.target.reset();
        }}
      >
        <SearchFormInput
          name="searchQuery"
          type="text"
          placeholder="Search images and photos"
        />
        <BtnSubmit type="submit">
         Search
        </BtnSubmit>
      </SearchForm>
    </Header>
  );
};