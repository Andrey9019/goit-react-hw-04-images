import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { SearchBar } from 'components/Searchbar/Searchbar';
import { featchItem } from 'components/api';
import { ImageGallery } from 'components/Gallery/ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { ErrorMessage, InfoMessage } from 'components/servise/Message';
import { Container } from 'components/servise/Container';

export const App = () => {

  const [modalOpen, setIsModalOpen] = useState(false)
  const [isBlank, setIsBlank] = useState(false)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [galleryItems, setGalleryItems] = useState([])
  const [query, setQuery] = useState(``)
  const [page,setPage]=useState(1)
  
  // async componentDidUpdate(prevProps, prevState) {
  //   if (
  //     prevState.query !== this.state.query ||
  //     prevState.page !== this.state.page
  //   ) {
  //     try {
  //       const { page, query } = this.state;
  //       this.setState({
  //         loading: true,
  //         error: false,
  //         isBlank: false,
  //       });
  //       const data = await featchItem(page, query);
  //       if (page === 1 && data.totalHits > 1) {
  //         toast.success(`Hooray! We found ${data.totalHits} images!`);
  //       }
  //       if (page >= Math.ceil(data.totalHits / 12)) {
  //         toast("We're sorry, but you've reached the end of search results.");
  //       }
  //       if (data.hits.length === 0) {
  //         this.setState({
  //           isBlank: true,
  //         });
  //       }
  //       this.setState(prevState => ({
  //         galleryItems: [...prevState.galleryItems, ...data.hits],
  //         modalOpen: page < Math.ceil(data.totalHits / 12),
  //       }));
  //     } catch (error) {
  //       this.setState({ error: true });
  //     } finally {
  //       this.setState({ loading: false });
  //     }
  //   }
  // }





 const [optionSubmit, setOptionSubmit] = useState({
      query: inputValue,
      page: 1,
      galleryItems: [],
      modalOpen: false,
    })

 const handlerSubmit = inputValue => {
    setOptionSubmit({
      query: inputValue,
      page: 1,
      galleryItems: [],
      modalOpen: false,
    });
  };
  
  const  handlerLoadMore = () => {
    setPage(page + 1);
  };

   return (
      <Container>
        <SearchBar onSubmit={handlerSubmit} />
        {error && <ErrorMessage>Oops! An error occurred. Please try refreshing the page...</ErrorMessage>}
        {isBlank && (
          <InfoMessage>We couldn't find any results for your search. Please try again.</InfoMessage>
        )}
        {galleryItems.length > 0 && (
          <ImageGallery galleryItems={galleryItems} />
        )}
        {(loading && <Loader />) ||
          (modalOpen && <Button onLoadMore={handlerLoadMore} />)}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: 'green',
              color: 'white',
            },
          }}
        />
      </Container>
    )
}
