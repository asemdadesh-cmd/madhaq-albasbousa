import { startingPrice, wholeUnitLabel } from '../lib/catalog';
import type { Product } from '../lib/types';
import { store } from '../config/store';
import { Icon } from './Icon';
import { Img } from './Img';

export function ProductCard({ product, onOpen }: { product: Product; onOpen: (id: string, from?: HTMLElement | null) => void }) {
  return (
    <article className="pcard" data-reveal>
      <div className="pcard-media">
        <Img
          photo={product.image}
          ratio={1}
          widths={[360, 560, 800]}
          sizes="(min-width: 1100px) 260px, (min-width: 700px) 30vw, 46vw"
        />
        <span className="pcard-unit">{wholeUnitLabel(product)}</span>
        {product.badge && <span className="pcard-badge">{product.badge}</span>}
      </div>
      <div className="pcard-body">
        {product.notes && <p className="pcard-notes">{product.notes}</p>}
        <h3 className="pcard-name">{product.nameAr}</h3>
        <p className="pcard-price">
          <span>ابتداءً من</span>
          <strong>{startingPrice(product)}</strong>
          <span>{store.currency}</span>
        </p>
        <button
          type="button"
          className="pcard-btn stretched"
          onClick={(e) => onOpen(product.id, e.currentTarget.closest('.pcard')?.querySelector<HTMLElement>('.pcard-media > img'))}
          aria-label={`اختار حجم ${product.nameAr}`}
        >
          <span>اختار الحجم</span>
          <Icon name="plus" size={18} />
        </button>
      </div>
    </article>
  );
}
