import useResizeObserver from './useResizeObserver';

const useHeightObserver = (
  ref: React.RefObject<HTMLElement> | React.MutableRefObject<HTMLElement>,
  cb?: (height: number) => void
) => {
  const height = useResizeObserver(ref, 'height', cb);

  return height;
};

export default useHeightObserver;
