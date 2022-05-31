import React, { useState, useContext } from 'react';
import AppContext from '../lib/AppContext';

function URLInput() {
  const context = useContext(AppContext);
  const setData = context.setData;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function isUrl(url: string): boolean {
    return /^(?:\w+:)?\/\/([^\s.]+\.\S{2}|localhost[:?\d]*)\S*$/.test(url);
  }

  const loadDataFromUrl = async (url: string) => {
    try {
      setLoading(true);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(
          `There is a HTTP error: The status is ${response.status}`,
        );
      }

      const jsonData = await response.json();
      setData(jsonData);
      setError(null);
    } catch (error) {
      let errorMessage = '';
      if (error instanceof TypeError) {
        errorMessage = error.message;
      }
      setError(errorMessage);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const loadUrlEvent = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    const url: string = event.currentTarget.value.trim();

    if (event.key === 'Enter') {
      if (!isUrl(url)) {
        setError('URL entered is invalid.');
        return;
      }
      loadDataFromUrl(url);
    }
  };

  return (
    <div>
      <input type="text" name="url" onKeyDown={loadUrlEvent} />
      <p>
        Insert data URL. Returning data MUST be an array JSON with each element
        is key/value pair.
      </p>
      {error && <p className="error">{error}</p>}
      {loading && <p className="loading">loading...</p>}
    </div>
  );
}

export default URLInput;
