import { store } from '../config/store';
import { Icon } from './Icon';

const STEPS = [
  { n: '١', title: 'اختار الصنف', text: 'بسبوسة، كنافة، بقلاوة أو كيك.' },
  { n: '٢', title: 'اختار الحجم', text: 'صغير، وسط أو كبير — على قدّ لمّتك.' },
  { n: '٣', title: 'وين نوصّلوه؟', text: 'الاسم والرقم والعنوان، أو استلام من المحل.' },
  { n: '٤', title: 'ابعثه على واتساب', text: 'رسالة الطلب جاهزة — بس اضغط إرسال.' },
];

export function HowItWorks() {
  return (
    <section id="how" className="section how" aria-labelledby="how-title">
      <div className="container">
        <header className="section-head" data-reveal>
          <p className="kicker">
            <Icon name="sparkle" size={12} /> أقل من دقيقة
          </p>
          <h2 id="how-title" className="display-2">
            أربع خطوات، <em>والحلو عندك.</em>
          </h2>
        </header>
        <ol className="how-steps">
          {STEPS.map((s) => (
            <li key={s.n} data-reveal>
              <span className="how-num" aria-hidden="true">
                {s.n}
              </span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
        <ul className="facts" data-reveal>
          <li>
            <Icon name="clock" size={18} /> {store.hours}
          </li>
          <li>
            <Icon name="truck" size={18} /> توصيل داخل {store.city}
          </li>
          <li>
            <Icon name="gift" size={18} /> {store.leadTimeNote}
          </li>
        </ul>
      </div>
    </section>
  );
}
