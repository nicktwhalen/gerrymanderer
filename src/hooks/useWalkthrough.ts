'use client';

import { useState } from 'react';

export const useWalkthrough = () => {
  const [showWalkthrough, setShowWalkthrough] = useState(false);

  const openWalkthrough = () => setShowWalkthrough(true);
  const closeWalkthrough = () => setShowWalkthrough(false);

  return {
    showWalkthrough,
    openWalkthrough,
    closeWalkthrough,
  };
};
