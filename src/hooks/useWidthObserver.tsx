import useResizeObserver from './useResizeObserver';

const useWidthObserver = (
  ref: React.RefObject<HTMLElement> | React.MutableRefObject<HTMLElement>,
  cb?: (height: number) => void
) => {
  const height = useResizeObserver(ref, 'height', cb);

  return height;
};

export default useWidthObserver;
