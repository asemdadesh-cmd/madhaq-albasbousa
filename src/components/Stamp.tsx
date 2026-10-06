import { Icon } from './Icon';

/** Circular "seal" with text running around it — slowly turns, unless the visitor prefers reduced motion. */
export function Stamp({ id, text, className }: { id: string; text: string; className?: string }) {
  return (
    <div className={`stamp ${className ?? ''}`} aria-hidden="true">
      <svg viewBox="0 0 120 120" className="stamp-ring">
        <defs>
          <path id={`ring-${id}`} d="M60 60m-44 0a44 44 0 1 1 88 0a44 44 0 1 1-88 0" />
        </defs>
        <circle cx="60" cy="60" r="57" className="stamp-edge" />
        <circle cx="60" cy="60" r="33" className="stamp-inner" />
        <text className="stamp-text">
          <textPath href={`#ring-${id}`} startOffset="50%" textAnchor="middle">
            {text}
          </textPath>
        </text>
      </svg>
      <span className="stamp-core">
        <Icon name="heart" size={22} stroke={1.4} />
      </span>
    </div>
  );
}
