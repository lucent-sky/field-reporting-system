const KEY = "pending_updates";

export function getQueue(): any[] {
  return JSON.parse(localStorage.getItem(KEY) || "[]");
}

export function saveQueue(queue: any[]) {
  localStorage.setItem(KEY, JSON.stringify(queue));
}

export function addToQueue(update: any) {
  const queue = getQueue();
  queue.push(update);
  saveQueue(queue);
}