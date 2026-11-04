import { initialState } from "./logic.js";

const KEY = "furusato-state";

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

export function loadState() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return initialState;
    const parsed = JSON.parse(raw);
    return {
      demoMonth: Number(parsed.demoMonth) || 0,
      joined: asArray(parsed.joined).filter((item) => item && item.experienceId),
      hometownIds: asArray(parsed.hometownIds).filter((item) => typeof item === "string"),
      wishes: asArray(parsed.wishes).filter((item) => item && item.experienceId && item.title),
    };
  } catch {
    return initialState;
  }
}

export function saveState(state) {
  localStorage.setItem(KEY, JSON.stringify(state));
}

export function clearState() {
  localStorage.removeItem(KEY);
}
