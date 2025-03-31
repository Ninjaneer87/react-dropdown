import { PropsWithChildren, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export default function ClientOnlyPortal({ children }: PropsWithChildren) {
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);

  // Check if the portal element exists
  useEffect(() => {
    const existingPortalElement = document.getElementById('portal');
    if (existingPortalElement) {
      setPortalElement(existingPortalElement);
      return;
    }

    const newPortalElement = document.createElement('div');
    newPortalElement.id = 'portal';
    document.body.appendChild(newPortalElement);
    setPortalElement(newPortalElement);
  }, []);

  return portalElement ? createPortal(children, portalElement!) : null;
}
