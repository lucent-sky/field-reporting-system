import { api } from "./api";
import { getQueue, saveQueue } from "../storage/localQueue";

export async function sync() {
  const queue = getQueue();
  if (queue.length === 0) return { conflicts: [] };

  const res = await api.post("/sync", { updates: queue });

  const { accepted, conflicts } = res.data;

  const remaining = queue.filter(
    (q: any) => !accepted.find((a: any) => a.id === q.id)
  );

  saveQueue(remaining);

  return { conflicts };
}