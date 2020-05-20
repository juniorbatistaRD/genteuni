import { useEffect } from "react";

function useScrollToTopOnMount() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
}

export default useScrollToTopOnMount;
