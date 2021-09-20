import { useEffect, useRef } from 'react';

export function useClickOutside(handler) {
  let domNode = useRef();

  useEffect(() => {
    let eventHandler = (event) => {
      if (domNode.current && !domNode.current.contains(event.target)) handler();
    };

    document.addEventListener('mousedown', eventHandler);

    return () => document.removeEventListener('mousedown', eventHandler);
  });

  return domNode;
}
