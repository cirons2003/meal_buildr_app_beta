import { useEffect, useRef } from 'react';

const useUpdateEffect = (effect, dependencies) => {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      return effect();
    }
  }, dependencies);
};

export default useUpdateEffect;