import { useState } from "react";

import "./App.css";

import FormReise from "./components/FormReise";
import StartReise from "./components/StartReise";

function App() {
  const [currentPage, setCurrentPage] = useState<"start" | "form">("start");

  return (
    <>
      {currentPage === "start" ? (
        <>
          <StartReise onStart={() => setCurrentPage("form")} />
        </>
      ) : (
        <FormReise onBack={() => setCurrentPage("start")} />
      )}
    </>
  );
}

export default App;
