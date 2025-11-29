import { type PropsWithChildren, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export default function ReactPortal({ children }: PropsWithChildren) {
  const [container] = useState(() => document.createElement('div'));

  useEffect(() => {
    document.body.appendChild(container);

    return () => {
      document.body.removeChild(container);
    };
  }, [container]);

  return createPortal(children, container);
}
