import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { SearchBar } from 'components/Searchbar/Searchbar';
import { featchItem } from 'components/api';
import { ImageGallery } from 'components/Gallery/ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { ErrorMessage, InfoMessage } from 'components/servise/Message';
import { Container } from 'components/servise/Container';

export const App = () => {

  const [query, setQuery] = useState(``)
  const [page,setPage]=useState(1)
  const [galleryItems, setGalleryItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [modalOpen, setIsModalOpen] = useState(false)
  const [isBlank, setIsBlank] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!query) {
      return;
    }
    async function getImages(){
      try {
      setLoading(true)
      setError(false)
      setIsBlank(false)
        const data = await featchItem(page, query);
        if (page === 1 && data.totalHits > 1) {
          toast.success(`Hooray! We found ${data.totalHits} images!`);
        }
        if (page >= Math.ceil(data.totalHits / 12)) {
          toast.error("We're sorry, but you've reached the end of search results.");
        }
        if (data.hits.length === 0) {
               setIsBlank(true)
        }
     setGalleryItems(prevGalleryItems => [...prevGalleryItems, ...data.hits]);
     setIsModalOpen(page < Math.ceil(data.totalHits / 12));
      } catch (error) {
      setError(true)
      }
      finally {
        setLoading(false)
      }
    }
    getImages()
  }, [page, query])
  
 
  const handlerSubmit = inputValue => {
    if (query === inputValue) {
      return toast('Please search something else')
    }
      setQuery(inputValue)
      setGalleryItems([])
      setPage(1)
      setError(false)
      setIsModalOpen(false)
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
