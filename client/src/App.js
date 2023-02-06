import React, { useContext, useEffect } from "react";
import RoutesPage from "./components/Routes";

function App() {
  useEffect(() => {
    document.body.style.background = "rgba(196, 196, 196, 0.25)";
  });

  return (
    <>
      <RoutesPage />
    </>
  );
}

export default App;
