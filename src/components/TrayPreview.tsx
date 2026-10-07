import { useId } from 'react';
import { servesUpTo, unitLabel } from '../lib/catalog';
import { useTween } from '../lib/motion';
import type { Product, Variant } from '../lib/types';

const CX = 160;
const CY = 118;
const TABLE_R = 108;
const PLATE_RING = 89;
const MAX_PLATES = 24;

/** Topping dots on the cut pieces: pistachio for kunafa/baklava, hazelnut for Nutella, almond otherwise. */
function toppingColour(p: Product) {
  if (p.id.includes('nutella')) return '#d7b58c';
  if (p.category === 'kunafa' || p.category === 'baklava') return '#93a95b';
  return '#f4e6c8';
}

/**
 * "See it on your table": a top-down drawing of the tray, box or cake at the chosen size, with one place
 * setting per person it serves. Bigger sizes reveal more cut pieces (the pattern doesn't scale) and more
 * plates slide in around the table.
 */
export function TrayPreview({ product, variant, qty = 1 }: { product: Product; variant: Variant; qty?: number }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const index = Math.max(0, product.variants.findIndex((v) => v.id === variant.id));
  const step = product.variants.length > 1 ? index / (product.variants.length - 1) : 1;
  const people = servesUpTo(variant);
  const plates = Math.min(people * qty, MAX_PLATES);
  const size = useTween(0.62 + step * 0.38, 700, true); // 0.62 → 1 of the largest size
  const tint = product.tint ?? '#d39a48';
  const kind = product.unitType;

  const trayR = 64 * size;
  const boxW = 136 * size;
  const boxH = boxW * 0.7;

  return (
    <figure className="tray-preview" aria-label={`${unitLabel(product)} ${variant.nameAr}: ${variant.serves}`}>
      <svg viewBox="0 0 320 236" role="img" aria-hidden="true">
        <defs>
          <pattern id={`cut-${uid}`} width="15" height="15" patternUnits="userSpaceOnUse" patternTransform={`rotate(45 ${CX} ${CY})`}>
            <rect width="15" height="15" fill="none" stroke="rgb(60 30 10 / 0.28)" strokeWidth="0.9" />
            <circle cx="7.5" cy="7.5" r="1.9" fill={toppingColour(product)} />
          </pattern>
          <pattern id={`rolls-${uid}`} width="12" height="200" patternUnits="userSpaceOnUse">
            <rect width="12" height="200" fill="none" stroke="rgb(60 30 10 / 0.25)" strokeWidth="1" />
            <line x1="6" y1="0" x2="6" y2="200" stroke="rgb(255 240 210 / 0.25)" strokeWidth="2" />
          </pattern>
          <radialGradient id={`shine-${uid}`} cx="35%" cy="30%" r="75%">
            <stop offset="0" stopColor="#fff" stopOpacity="0.32" />
            <stop offset="0.6" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <clipPath id={`clip-${uid}`}>
            {kind === 'box' ? (
              <rect x={CX - boxW / 2 + 4} y={CY - boxH / 2 + 4} width={boxW - 8} height={boxH - 8} rx="4" />
            ) : (
              <circle cx={CX} cy={CY} r={Math.max(0, trayR - 3)} />
            )}
          </clipPath>
        </defs>

        {/* table */}
        <circle cx={CX} cy={CY} r={TABLE_R + 6} className="tp-table-shadow" />
        <circle cx={CX} cy={CY} r={TABLE_R} className="tp-table" />
        <circle cx={CX} cy={CY} r={TABLE_R - 10} className="tp-table-runner" />

        {/* place settings */}
        {Array.from({ length: MAX_PLATES }, (_, i) => {
          const on = i < plates;
          const a = (i / Math.max(plates, 1)) * Math.PI * 2 - Math.PI / 2;
          const x = CX + Math.cos(a) * PLATE_RING;
          const y = CY + Math.sin(a) * PLATE_RING;
          return (
            <g
              key={i}
              className="tp-plate"
              style={{
                transform: `translate(${x}px, ${y}px) scale(${on ? 1 : 0.2})`,
                opacity: on ? 1 : 0,
                transitionDelay: `${on ? i * 22 : 0}ms`,
              }}
            >
              <circle r="9.5" className="tp-plate-rim" />
              <circle r="6" className="tp-plate-well" />
            </g>
          );
        })}

        {/* the tray / box / cake */}
        {kind === 'box' ? (
          <g>
            <rect x={CX - boxW / 2 + 3} y={CY - boxH / 2 + 6} width={boxW} height={boxH} rx="9" className="tp-drop" />
            <rect x={CX - boxW / 2} y={CY - boxH / 2} width={boxW} height={boxH} rx="9" className="tp-box" />
            <g clipPath={`url(#clip-${uid})`}>
              <rect x={CX - 90} y={CY - 70} width="180" height="140" fill={tint} />
              <rect x={CX - 90} y={CY - 70} width="180" height="140" fill={`url(#rolls-${uid})`} />
              <line x1={CX - 90} y1={CY} x2={CX + 90} y2={CY} stroke="rgb(60 30 10 / 0.3)" strokeWidth="1.2" />
              <rect x={CX - 90} y={CY - 70} width="180" height="140" fill={`url(#shine-${uid})`} />
            </g>
          </g>
        ) : (
          <g>
            <circle cx={CX + 3} cy={CY + 6} r={trayR + 4} className="tp-drop" />
            {kind === 'tray' && <circle cx={CX} cy={CY} r={trayR + 3} className="tp-rim" />}
            <circle cx={CX} cy={CY} r={trayR} fill={tint} />
            <g clipPath={`url(#clip-${uid})`}>
              {kind === 'tray' ? (
                <rect x={CX - 80} y={CY - 80} width="160" height="160" fill={`url(#cut-${uid})`} />
              ) : (
                Array.from({ length: Math.min(people, 16) }, (_, i) => {
                  const a = (i / Math.min(people, 16)) * Math.PI * 2;
                  return (
                    <line
                      key={i}
                      x1={CX}
                      y1={CY}
                      x2={CX + Math.cos(a) * trayR}
                      y2={CY + Math.sin(a) * trayR}
                      stroke="rgb(255 245 225 / 0.45)"
                      strokeWidth="1.2"
                    />
                  );
                })
              )}
              <circle cx={CX} cy={CY} r={trayR} fill={`url(#shine-${uid})`} />
            </g>
            {kind === 'cake' && <circle cx={CX} cy={CY} r={trayR * 0.18} fill="rgb(255 245 225 / 0.55)" />}
          </g>
        )}
        {qty > 1 && (
          <g className="tp-qty" key={qty}>
            <circle cx={CX + 52} cy={CY - 52} r="17" />
            <text x={CX + 52} y={CY - 46} textAnchor="middle">
              ×{qty}
            </text>
          </g>
        )}
      </svg>
      <figcaption>
        {variant.mood && <strong>{variant.mood}</strong>}
        <span>
          {qty > 1
            ? `${qty} × ${unitLabel(product)} ${variant.nameAr} · تكفي تقريباً ${people * qty} شخص`
            : `${unitLabel(product)} ${variant.nameAr} · ${variant.serves}`}
        </span>
      </figcaption>
    </figure>
  );
}
