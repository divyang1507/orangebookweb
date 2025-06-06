'use client';
import { useRouter } from "next/navigation";

 // Required if you're using Next.js App Router with Server Components


export function useGoBack() {
  const router = useRouter();

  const goBack = () => {
    if (typeof window !== 'undefined') {
      router.back(); // Navigates to previous page
    }
  };

  return goBack;
}