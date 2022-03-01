import React, { useCallback, useState } from "react";
import { useAgaveLink } from "@agave-api/react-agave-link";

const App = () => {

  const [message, setMessage] = useState('');

  const onSuccess = useCallback((publicToken) => {
    // Send publicToken to your server (see step 4 on https://docs.agaveapi.com/quickstart#step-4-get-account-token)
    setMessage("Public Token: " + publicToken)
  }, []);

  const onExit = useCallback((error) => {
    setMessage(error ? "Error: " + error : "User closed Agave Link");
  }, []);

  /*
   * For a full list of available options, see https://docs.agaveapi.com/agave-link/component
   */
  const { openLink, isReady } = useAgaveLink({
    referenceId: 'user-123',
    
    // Replace linkToken with what you got in step 2 on https://docs.agaveapi.com/quickstart#step-2-generate-link-token
    linkToken: "_____LINK_TOKEN_____TO_BE_REPLACED", 
    
    showSandboxSourceSystems: true, // Only for local development
    showProductionSourceSystems: true,
    // sourceSystem: 'procore', // If you need to open a specific source system
    // sourceSystemEnvironment: 'sandbox',
    // category: 'accounting', // If you need to limit source systems to a specific category
    
    onSuccess,
    onExit,
  });

  return (
    <div style={{margin: "20px"}}>
      <button disabled={!isReady} onClick={openLink}>
        {isReady && 'Open Agave Link' || 'Loading...'}
      </button>
      <p>
        {message}
      </p>
    </div>
  );
};

export default App;