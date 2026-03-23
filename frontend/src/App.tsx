import { useState } from "react";
import type { Report } from "./types/Report";
import { addToQueue } from "./storage/localQueue";
import { sync } from "./services/syncService";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [reports, setReports] = useState<Report[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const createReport = () => {
    const newReport: Report = {
      id: uuidv4(),
      title,
      description,
      status: "OPEN",
      version: 1,
      lastUpdated: new Date().toISOString(),
    };

    addToQueue(newReport);
    setReports((prev) => [...prev, newReport]);

    setTitle("");
    setDescription("");
  };

  const handleSync = async () => {
    const result = await sync();
    console.log("Conflicts:", result.conflicts);
    alert("Sync complete");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Field Reports</h1>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br /><br />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br /><br />

      <button onClick={createReport}>Create Report</button>
      <button onClick={handleSync} style={{ marginLeft: 10 }}>
        Sync Now
      </button>

      <h2>Reports</h2>
      {reports.map((r) => (
        <div key={r.id} style={{ border: "1px solid gray", margin: 5, padding: 5 }}>
          <b>{r.title}</b>
          <div>{r.description}</div>
          <div>Status: {r.status}</div>
        </div>
      ))}
    </div>
  );
}

export default App;