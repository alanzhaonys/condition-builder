import React from 'react';

function URLInput() {
  return (
    <div>
      <input type="text" name="url" />
      <p>
        Insert data URL. Returning data MUST be an array JSON with each element
        is key/value pair.
      </p>
    </div>
  );
}

export default URLInput;
