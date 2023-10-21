import React, { useState } from 'react';
import { PhotoCard, PhotoCardIMG } from './ImageGalleryItem.style';
import { ModalContainer } from 'components/Modal/Modal';

export const ImageGalleryItem = (webformatURL, largeImageURL, tags) => {

const [isModalOpen, setIsModalOpen] = useState(false)

 const openModal = () => {
    setIsModalOpen(true);
  };

 const closeModal = () => {
    setIsModalOpen(false);
  };
  
    return (
      <PhotoCard>
        <PhotoCardIMG
          onClick={openModal}
          src={webformatURL}
          alt={tags}
          loading="lazy"
          width="100%"
          height="260px"
        />
        <ModalContainer
          largeImageURL={largeImageURL}
          isModalOpen={isModalOpen}
          onCloseModal={closeModal}
          tags={tags}
        />
      </PhotoCard>
    );
  
}