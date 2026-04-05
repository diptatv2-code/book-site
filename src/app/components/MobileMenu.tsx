'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface NavLink {
  href: string;
  label: string;
}

export function MobileMenu({ navLinks }: { navLinks: NavLink[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div className="md:hidden" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-col gap-1.5 p-2"
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
      >
        <span className={`block h-0.5 w-6 bg-[#6B5E56] transition-all ${isOpen ? 'translate-y-2 rotate-45' : ''}`} />
        <span className={`block h-0.5 w-6 bg-[#6B5E56] transition-all ${isOpen ? 'opacity-0' : ''}`} />
        <span className={`block h-0.5 w-6 bg-[#6B5E56] transition-all ${isOpen ? '-translate-y-2 -rotate-45' : ''}`} />
      </button>
      <div
        className={`absolute left-0 top-16 w-full border-b border-[#DDD5CC]/60 bg-[#FAF8F5]/98 backdrop-blur-md transition-all duration-300 ${
          isOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <div className="flex flex-col gap-1 px-4 py-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="rounded-lg px-4 py-3 font-ui text-sm font-medium text-[#6B5E56] transition-colors hover:bg-[#EDE8E0] hover:text-[#8B1A2B]"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
