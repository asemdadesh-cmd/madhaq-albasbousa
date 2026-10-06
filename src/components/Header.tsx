import emblem from '../assets/emblem.png';
import wordmark from '../assets/wordmark.png';
import { store } from '../config/store';
import { Icon } from './Icon';

export function Announcement() {
  return (
    <div className="announce">
      <p>
        <span>من الفرن إلى لمّتكم</span>
        <Icon name="sparkle" size={10} />
        <span>طواجين كاملة تكفي الكل</span>
        <Icon name="sparkle" size={10} />
        <span className="announce-extra">توصيل داخل {store.city}</span>
      </p>
    </div>
  );
}

export function Header({ count, onCart, onSearch }: { count: number; onCart: () => void; onSearch: () => void }) {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <a href="#top" className="brand" aria-label={`${store.nameAr} — الرئيسية`}>
          <img src={emblem} alt="" width={46} height={47} className="brand-emblem" />
          <span className="brand-text">
            <img src={wordmark} alt={store.nameAr} width={138} height={22} className="brand-wordmark" />
            <span className="brand-latin">Mathaq Al Basbousa · Est. {store.established}</span>
          </span>
        </a>
        <nav className="main-nav" aria-label="القائمة الرئيسية">
          <a href="#menu">المنيو</a>
          <a href="#occasions">المناسبات</a>
          <a href="#how">كيف تطلب</a>
        </nav>
        <div className="header-actions">
          <button type="button" className="icon-btn ghost" onClick={onSearch} aria-label="ابحث في المنيو">
            <Icon name="search" size={22} />
          </button>
          <button type="button" className="icon-btn ghost bag-btn" onClick={onCart} aria-label={`السلة، ${count} صنف`}>
            <Icon name="bag" size={22} />
            {count > 0 && (
              <span className="bag-count" aria-hidden="true">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
