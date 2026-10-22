import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

interface FxState {
  /** true = ambient effects (petals, dust, twinkling) are running */
  fx: boolean;
  toggleFx: () => void;
}

const FxContext = createContext<FxState>({ fx: true, toggleFx: () => undefined });

export function FxProvider({ children }: { children: ReactNode }) {
  const [fx, setFx] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle('fx-off', !fx);
  }, [fx]);

  const toggleFx = useCallback(() => setFx((v) => !v), []);
  const value = useMemo(() => ({ fx, toggleFx }), [fx, toggleFx]);
  return <FxContext.Provider value={value}>{children}</FxContext.Provider>;
}

export const useFx = (): FxState => useContext(FxContext);
