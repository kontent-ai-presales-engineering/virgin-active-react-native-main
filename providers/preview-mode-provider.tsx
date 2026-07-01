import { useQueryClient } from "@tanstack/react-query";
import { createContext, type ReactNode, useCallback, useContext, useMemo, useState } from "react";

type PreviewModeContextValue = {
  readonly isPreview: boolean;
  readonly togglePreview: () => void;
};

const PreviewModeContext = createContext<PreviewModeContextValue | null>(null);

type PreviewModeProviderProps = {
  readonly children: ReactNode;
};

export const PreviewModeProvider = ({ children }: PreviewModeProviderProps) => {
  const [isPreview, setIsPreview] = useState(false);
  const queryClient = useQueryClient();

  const togglePreview = useCallback(() => {
    setIsPreview((prev) => !prev);
    queryClient.invalidateQueries();
  }, [queryClient]);

  const value = useMemo(() => ({ isPreview, togglePreview }), [isPreview, togglePreview]);

  return <PreviewModeContext.Provider value={value}>{children}</PreviewModeContext.Provider>;
};

export const usePreviewMode = (): PreviewModeContextValue => {
  const context = useContext(PreviewModeContext);
  if (!context) {
    throw new Error("usePreviewMode must be used within a PreviewModeProvider");
  }
  return context;
};
