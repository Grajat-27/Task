import React from "react";
import UserTable from "./component/table";

function App() {
  return (
    <div
      style={{
        padding: 20,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <UserTable />
    </div>
  );
}

export default App;
