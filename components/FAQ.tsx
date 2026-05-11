'use client';

import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import { FAQ_ITEMS } from '@/lib/faq';

export function FAQ() {
  return (
    <section id="faq" className="scroll-mt-20 bg-secondary px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-accent">FAQ</p>
          <h2 className="mt-4 font-serif text-3xl text-primary md:text-4xl">
            A few details, before you book.
          </h2>
        </div>
        <Accordion.Root
          type="single"
          collapsible
          className="mt-12 divide-y divide-border border-y border-border"
        >
          {FAQ_ITEMS.map((item) => (
            <Accordion.Item key={item.id} value={item.id}>
              <Accordion.Header>
                <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 py-5 text-left font-serif text-lg text-primary transition hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent">
                  <span>{item.q}</span>
                  <ChevronDown
                    aria-hidden
                    className="h-5 w-5 shrink-0 text-accent transition-transform duration-200 group-data-[state=open]:rotate-180"
                  />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                <p className="pb-5 pr-9 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {item.a ?? item.text}
                </p>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  );
}
