import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Gallery } from './ImageGallery.style';

export const ImageGallery = ({ galleryItems }) => {
  return (
    <Gallery>
      {galleryItems.map(({ id, webformatURL, largeImageURL, tags }) => (
        <li key={id}>
          <ImageGalleryItem
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            tags={tags}
          />
        </li>
      ))}
    </Gallery>
  );
};