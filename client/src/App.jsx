import React from "react";
import { Button } from "./components/ui/button";

const App = () => {
  return (
    <div>
      <h1>Ecom</h1>
      <div className="flex flex-col items-center justify-center min-h-svh">
        <Button>Click me</Button>
      </div>
    </div>
  );
};

export default App;
