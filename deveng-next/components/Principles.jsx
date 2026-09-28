'use client';

import { useState } from 'react';
import { principles } from '@/lib/principles';

export default function Principles() {
  const [active, setActive] = useState(0);
  return (
    <div className="mock-ps reveal reveal-up" aria-label="The five Ps of sustainability">
      {principles.map((p, i) => (
        <button
          key={p.title}
          type="button"
          className={`mock-p${i === active ? ' is-active' : ''}`}
          aria-pressed={i === active}
          onClick={() => setActive(i)}
        >
          <span className="mock-icon">{p.icon}</span>
          <strong>{p.title}</strong>
          <small>{p.note[0]}<br />{p.note[1]}</small>
        </button>
      ))}
    </div>
  );
}
