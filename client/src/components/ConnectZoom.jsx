import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const ConnectZoom = () => {
  const { user } = useAuth();
  const [isConnecting, setIsConnecting] = useState(false);

  const connectZoom = () => {
    setIsConnecting(true);
    const zoomAuthUrl = `https://zoom.us/oauth/authorize?response_type=code&client_id=${import.meta.env.VITE_ZOOM_CLIENT_ID}&redirect_uri=${encodeURIComponent(import.meta.env.VITE_ZOOM_REDIRECT_URI)}`;
    window.location.href = zoomAuthUrl;
  };

  // Check if user already has Zoom connected
  const isZoomConnected = user?.zoomAccessToken;

  return (
    <div className="flex items-center gap-3">
      {isZoomConnected ? (
        <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          <span className="text-sm font-medium">Zoom Connected</span>
        </div>
      ) : (
        <button
          onClick={connectZoom}
          disabled={isConnecting}
          className="flex items-center gap-2 px-4 py-2 bg-[#0B5CFF] hover:bg-[#0B5CFF]/90 text-white rounded-lg transition disabled:opacity-50"
        >
          {isConnecting ? (
            <>
              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Connecting...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.017 18.998c-3.864 0-7-3.136-7-7s3.136-7 7-7c1.848 0 3.52.718 4.75 1.878l-1.914 1.914c-.83-.792-1.928-1.28-3.108-1.28-2.48 0-4.5 2.02-4.5 4.5s2.02 4.5 4.5 4.5c2.48 0 4.5-2.02 4.5-4.5h2c0 3.864-3.136 7-7 7z"/>
              </svg>
              Connect Zoom
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default ConnectZoom;