import { LoadMoreButton } from './Button.style';

export const Button = ({ onLoadMore }) => {
  return <LoadMoreButton onClick={onLoadMore}>Load more</LoadMoreButton>;
};