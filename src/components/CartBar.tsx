import { formatPrice } from '../lib/catalog';
import { Icon } from './Icon';

/** Sticky "your basket" bar — always one tap from checkout once something is in it. */
export function CartBar({ count, total, onOpen }: { count: number; total: number; onOpen: () => void }) {
  if (!count) return null;
  return (
    <div className="cart-bar">
      <button type="button" className="cart-bar-btn" onClick={onOpen} aria-label={`سلّتك: ${count} صنف، ${formatPrice(total)} — عرض الطلب`}>
        <span className="cart-bar-start">
          <Icon name="bag" size={22} />
          <span>سلّتك</span>
          <span className="cart-bar-count">({count})</span>
        </span>
        <strong className="cart-bar-total">{formatPrice(total)}</strong>
        <span className="cart-bar-go" aria-hidden="true">
          <Icon name="arrow" size={20} />
        </span>
      </button>
    </div>
  );
}
