const API_URL = import.meta.env.VITE_API_URL || "Not Exists Connection";

export function ConnectionAPI() {
  return API_URL;
}
