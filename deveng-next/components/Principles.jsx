'use client';

import { useState } from 'react';
import { principles } from '@/lib/principles';
import Reveal from '@/components/Reveal';

export default function Principles() {
  const [active, setActive] = useState(0);
  return (
    <Reveal className="mock-ps" direction="up" aria-label="The five Ps of sustainability">
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
    </Reveal>
  );
}
