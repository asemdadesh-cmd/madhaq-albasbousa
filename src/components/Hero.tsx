import { PHOTOS } from '../config/menu';
import { store } from '../config/store';
import { formatPrice, getProduct, startingPrice, wholeUnitLabel } from '../lib/catalog';
import { Icon } from './Icon';
import { Img } from './Img';
import { Stamp } from './Stamp';

const FEATURED = 'basbousa-qishta';

export function Hero({ onOpen }: { onOpen: (id: string) => void }) {
  const featured = getProduct(FEATURED);
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero-inner">
        <div className="hero-copy">
          <p className="kicker">
            <Icon name="sparkle" size={14} /> حلا معمول للّمة
          </p>
          <h1 id="hero-title" className="display">
            طاجين يجمعكم
            <br />
            <em>على الحلو.</em>
          </h1>
          <p className="hero-lead">
            طواجين بسبوسة وكنافة، صواني بقلاوة وقوالب كيك — تنخبز كل يوم، وتوصلكم كاملة لحد باب الحوش.
          </p>
          <div className="hero-ctas">
            <a href="#menu" className="btn btn-primary btn-lg">
              اختار طاجينك <Icon name="arrow" size={18} />
            </a>
            <a href="#occasions" className="text-link">
              عندك مناسبة؟
            </a>
          </div>
          <ul className="hero-facts">
            <li>
              <Icon name="check" size={16} /> طاجين كامل، مش قطع
            </li>
            <li>
              <Icon name="check" size={16} /> توصيل داخل {store.city}
            </li>
          </ul>
        </div>

        <div className="hero-visual">
          <div className="hero-frame">
            <Img photo={PHOTOS.basbousa} ratio={4 / 5} widths={[480, 760, 1100]} sizes="(min-width: 900px) 46vw, 92vw" priority />
          </div>
          <Stamp id="hero" text={`حلا لمّتكم · من القلب للكل · ${store.nameAr} · ${store.established} · `} className="hero-stamp" />
          {featured && (
            <button type="button" className="feature-card" onClick={() => onOpen(featured.id)}>
              <span className="feature-text">
                <span className="feature-kicker">الأكثر طلباً</span>
                <span className="feature-name">{featured.nameAr}</span>
                <span className="feature-meta">
                  {wholeUnitLabel(featured)} · ابتداءً من {formatPrice(startingPrice(featured))}
                </span>
              </span>
              <span className="feature-go" aria-hidden="true">
                <Icon name="arrow" size={20} />
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

export function ValueProps() {
  const items = [
    { icon: 'cloche' as const, title: 'على قدّ لمّتكم', text: 'صغير، وسط أو كبير — من ٤ لـ ١٦ شخص' },
    { icon: 'gift' as const, title: 'تنفع هدية', text: 'بوكسات بقلاوة وقوالب كيك جاهزة للتقديم' },
    { icon: 'chat' as const, title: 'طلبك في دقيقة', text: 'اختار، أضف، وابعث طلبك على واتساب' },
  ];
  return (
    <section className="values" aria-label="ليش مذاق البسبوسة">
      <div className="container">
        <ul className="values-list">
          {items.map((v) => (
            <li key={v.title} data-reveal>
              <span className="values-icon">
                <Icon name={v.icon} size={30} stroke={1.3} />
              </span>
              <span>
                <strong>{v.title}</strong>
                <small>{v.text}</small>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
