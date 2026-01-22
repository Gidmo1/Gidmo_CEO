import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";

const API = import.meta.env.VITE_API_BASE;

export function useContent() {
  return useQuery({
    queryKey: ["content"],
    queryFn: async () => {
      const res = await fetch(`${API}/api/content`);
      return res.json();
    },
  });
}
export function useContentSection(section: string) {
  const { data, ...rest } = useContent();
  const content = data?.find((c) => c.section === section);
  return { content, ...rest };
}
