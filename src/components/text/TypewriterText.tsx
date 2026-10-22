import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

interface Props {
  text: string;
  className?: string;
  /** Milliseconds per character. */
  speed?: number;
  /** Start immediately when true/false is given; otherwise starts when scrolled into view. */
  start?: boolean;
}

/**
 * Types a short sentence letter by letter.
 * The full text is always in the layout (invisible until typed) so nothing jumps,
 * and screen readers receive the complete sentence straight away.
 */
export function TypewriterText({ text, className = '', speed = 44, start }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.7 });
  const reduce = useReducedMotion();
  const go = start ?? inView;
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!go) return;
    if (reduce) {
      setCount(text.length);
      return;
    }
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setCount(i);
      if (i >= text.length) window.clearInterval(id);
    }, speed);
    return () => window.clearInterval(id);
  }, [go, reduce, speed, text]);

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text.slice(0, count)}
        <span className="opacity-0">{text.slice(count)}</span>
      </span>
    </span>
  );
}
