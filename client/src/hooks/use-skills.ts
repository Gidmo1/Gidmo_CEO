import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";

const API = import.meta.env.VITE_API_BASE;

export function useSkills() {
  return useQuery({
    queryKey: ["skills"],
    queryFn: async () => {
      const res = await fetch(`${API}/api/skills`);
      return res.json();
    },
  });
}