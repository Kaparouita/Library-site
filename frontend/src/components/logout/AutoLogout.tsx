import React, { useEffect, useState } from 'react';

function AutoLogout() {
  const inactivityTimeout = 30 * 60 * 1000; // 30 minutes in milliseconds
  const [logoutTimer, setLogoutTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const performLogout = () => {
      // Perform logout logic here, e.g., clear authentication token or state
      // You should replace this with your actual logout logic
    };

    // Reset the logout timer whenever there is user activity
    const resetTimer = () => {
      if (logoutTimer) {
        clearTimeout(logoutTimer);
      }
      setLogoutTimer(
        setTimeout(() => {
          performLogout();
        }, inactivityTimeout)
      );
    };

    // Attach event listeners to reset the timer on user activity
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);

    // Clean up event listeners when the component unmounts
    return () => {
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
    };
  }, [inactivityTimeout, logoutTimer]);

  return null; // This component doesn't render anything in the DOM
}

export default AutoLogout;
