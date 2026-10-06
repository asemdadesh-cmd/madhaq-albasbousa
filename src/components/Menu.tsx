import { forwardRef, useState } from 'react';
import { CATEGORIES } from '../config/menu';
import { productsIn, searchProducts } from '../lib/catalog';
import type { CategoryId } from '../lib/types';
import { Icon } from './Icon';
import { ProductCard } from './ProductCard';

export const Menu = forwardRef<HTMLInputElement, { onOpen: (id: string) => void }>(function Menu({ onOpen }, searchRef) {
  const [cat, setCat] = useState<CategoryId | 'all'>('all');
  const [query, setQuery] = useState('');
  const tabs: { id: CategoryId | 'all'; nameAr: string }[] = [{ id: 'all', nameAr: 'كل الحلو' }, ...CATEGORIES];
  const products = searchProducts(productsIn(query ? 'all' : cat), query);

  return (
    <section id="menu" className="section menu" aria-labelledby="menu-title">
      <div className="container">
        <header className="section-head" data-reveal>
          <p className="kicker">
            <Icon name="sparkle" size={12} /> المنيو
          </p>
          <h2 id="menu-title" className="display-2">
            حلا على قدّ <em>اللمّة</em>
          </h2>
          <p className="section-lead">كل صنف ينباع كامل — طاجين، صينية، بوكس أو قالب. اختار الحجم اللي يكفي ناسك.</p>
        </header>

        <div className="menu-tools">
          <div className="tabs" role="tablist" aria-label="أقسام المنيو">
            {tabs.map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={!query && cat === t.id}
                aria-controls="menu-grid"
                className="tab"
                onClick={() => {
                  setCat(t.id);
                  setQuery('');
                }}
              >
                {t.nameAr}
              </button>
            ))}
          </div>
          <label className="search">
            <Icon name="search" size={19} />
            <span className="sr-only">ابحث في المنيو</span>
            <input
              ref={searchRef}
              type="search"
              placeholder="ابحث عن حلاك…"
              value={query}
              maxLength={40}
              onChange={(e) => setQuery(e.target.value)}
              enterKeyHint="search"
            />
            {query && (
              <button type="button" className="search-clear" onClick={() => setQuery('')} aria-label="امسح البحث">
                <Icon name="close" size={16} />
              </button>
            )}
          </label>
        </div>

        <div id="menu-grid" role="tabpanel" className="grid" aria-live="polite">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} onOpen={onOpen} />
          ))}
        </div>
        {products.length === 0 && (
          <p className="no-results">
            ما لقيناش «{query}» — جرّب كلمة ثانية، مثلاً: كنافة، فستق، لوتس.
          </p>
        )}
      </div>
    </section>
  );
});
