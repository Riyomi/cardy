import { useEffect, useRef } from 'react';

export function useClickOutside(handler: Function) {
  let domNode = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let eventHandler = (event: Event) => {
      if (
        domNode.current &&
        !domNode.current.contains(event.target as HTMLEmbedElement)
      )
        handler();
    };

    document.addEventListener('mousedown', eventHandler);

    return () => document.removeEventListener('mousedown', eventHandler);
  });

  return domNode;
}
