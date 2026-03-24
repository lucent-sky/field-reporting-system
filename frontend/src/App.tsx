import { useState } from "react";
import type { Report } from "./types/Report";
import { addToQueue } from "./storage/localQueue";
import { sync } from "./services/syncService";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [reports, setReports] = useState<Report[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [conflicts, setConflicts] = useState<Report[]>([]);
  const [editing, setEditing] = useState<Report | null>(null);

  const saveReport = () => {
    if (editing) {
      const updated: Report = {
        ...editing,
        title,
        description,
        version: editing.version, // keep version (important!)
        lastUpdated: new Date().toISOString(),
      };

      addToQueue(updated);

      setReports(prev =>
        prev.map(r => (r.id === updated.id ? updated : r))
      );

      setEditing(null);
    } else {
      const newReport: Report = {
        id: uuidv4(),
        title,
        description,
        status: "OPEN",
        version: 1,
        lastUpdated: new Date().toISOString(),
      };

      addToQueue(newReport);
      setReports(prev => [...prev, newReport]);
    }

    setTitle("");
    setDescription("");
  };

  const handleSync = async () => {
    try {
      const result = await sync();
      setConflicts(result.conflicts);
      alert("Sync complete");
    } catch (err) {
      console.error(err);
      alert("Sync failed");
    }
  };

  const resolveOverwrite = async (conflict: Report) => {
    const updated = {
      ...conflict,
      version: conflict.version + 1, // bump version to win
    };

    addToQueue(updated);
    setConflicts(prev => prev.filter(c => c.id !== conflict.id));
  };

  const resolveDiscard = (conflict: Report) => {
    setConflicts(prev => prev.filter(c => c.id !== conflict.id));
  };

  const editReport = (report: Report) => {
    setEditing(report);
    setTitle(report.title);
    setDescription(report.description);
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

      <button onClick={saveReport}>
        {editing ? "Save Changes" : "Create Report"}
      </button>
      <button onClick={handleSync} style={{ marginLeft: 10 }}>
        Sync Now
      </button>

      <h2>Reports</h2>
      {reports.map((r) => (
        <div key={r.id} style={{ border: "1px solid gray", margin: 5, padding: 5 }}>
          <b>{r.title}</b>
          <div>{r.description}</div>
          <div>Status: {r.status}</div>

          <button onClick={() => editReport(r)}>Edit</button>
        </div>
      ))}

      <h2>Conflicts</h2>
      {conflicts.length === 0 && <div>No conflicts</div>}

      {conflicts.map((c) => (
        <div key={c.id} style={{ border: "2px solid red", margin: 5, padding: 5 }}>
          <b>{c.title}</b>
          <div>{c.description}</div>
          <div>Version: {c.version}</div>

          <button onClick={() => resolveOverwrite(c)}>Overwrite</button>
          <button onClick={() => resolveDiscard(c)}>Discard</button>
        </div>
      ))}
    </div>
  );
}

export default App;