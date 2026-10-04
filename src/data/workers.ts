export type Worker = {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  workerNumber?: string;
  username?: string;
  password?: string;
  points?: number;
  pickups?: number;
};

export const WORKERS_STORAGE_KEY = "admin_workers";

export function formatWorkerNumber(sequence: number) {
  return `PHW-${String(sequence).padStart(6, "0")}`;
}

export function getNextWorkerNumber(workers: Worker[]) {
  const highestSequence = workers.reduce((highest, worker) => {
    const sequence = Number(worker.workerNumber?.match(/(\d+)$/)?.[1] ?? 0);
    return Math.max(highest, sequence);
  }, 0);
  return formatWorkerNumber(highestSequence + 1);
}

export function getStoredWorkers(): Worker[] {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(WORKERS_STORAGE_KEY) ?? "[]");
    return Array.isArray(value) ? value as Worker[] : [];
  } catch {
    return [];
  }
}
