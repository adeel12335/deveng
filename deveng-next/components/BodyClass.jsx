'use client';

import { useEffect } from 'react';

/** Adds a class to <body> for the life of the page that renders it. */
export default function BodyClass({ name }) {
  useEffect(() => {
    document.body.classList.add(name);
    return () => document.body.classList.remove(name);
  }, [name]);
  return null;
}
