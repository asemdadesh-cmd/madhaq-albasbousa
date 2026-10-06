import { useState } from 'react';
import { PHOTOS, SIZE_NAMES } from '../config/menu';
import { suggestTrays } from '../lib/catalog';
import { Icon } from './Icon';
import { Img } from './Img';

const OCCASIONS = ['العيلة', 'الضيوف', 'الجمعات', 'الخطوبات', 'العزائم', 'الهدايا'];

export function Occasions({ onPick }: { onPick: (productId: string) => void }) {
  const [people, setPeople] = useState(12);
  const plan = suggestTrays(people);
  const planText = plan.map((p) => `${p.count > 1 ? `${p.count} × ` : ''}طاجين ${SIZE_NAMES[p.size]}`).join(' + ');

  return (
    <section id="occasions" className="section occasions" aria-labelledby="occ-title">
      <div className="container occ-inner">
        <div className="occ-media" data-reveal>
          <Img photo={PHOTOS.occasionTrays} ratio={4 / 5} widths={[500, 800, 1100]} sizes="(min-width: 900px) 42vw, 92vw" />
        </div>
        <div className="occ-copy" data-reveal>
          <p className="kicker on-dark">
            <Icon name="sparkle" size={12} /> للمّات والمناسبات
          </p>
          <h2 id="occ-title" className="display-2">
            عندك لمّة؟
            <br />
            <em>إحنا علينا الحلو.</em>
          </h2>
          <p className="occ-lead">صواني كاملة، مقطّعة وجاهزة للتقديم — للعيلة، للضيوف، وللّيالي اللي تستاهل.</p>
          <p className="occ-tags">{OCCASIONS.join('  ·  ')}</p>

          <div className="planner">
            <div className="planner-top">
              <label htmlFor="people">كم شخص عندك؟</label>
              <output htmlFor="people" className="planner-count">
                {people}
              </output>
            </div>
            <input
              id="people"
              type="range"
              min={2}
              max={60}
              step={1}
              value={people}
              style={{ ['--p' as string]: `${((people - 2) / 58) * 100}%` }}
              onChange={(e) => setPeople(Number(e.target.value))}
              aria-valuetext={`${people} شخص`}
            />
            <p className="planner-result" aria-live="polite">
              ننصحك بـ <strong>{planText}</strong>
            </p>
            <div className="planner-ctas">
              <button type="button" className="btn btn-light" onClick={() => onPick('basbousa-qishta')}>
                اطلب طاجين بسبوسة <Icon name="arrow" size={18} />
              </button>
              {people >= 15 && (
                <button type="button" className="text-link on-dark" onClick={() => onPick('occasion-mix')}>
                  أو صينية المناسبات المشكلة
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
