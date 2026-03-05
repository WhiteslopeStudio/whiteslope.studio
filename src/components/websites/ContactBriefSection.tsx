import Link from 'next/link';

export default function ContactBriefSection() {
  return (
    <section id="kontakt-brief" className="container mx-auto px-6 py-16 md:py-20 scroll-mt-24">
      <div className="rounded-3xl border border-blue-400/30 bg-gradient-to-br from-blue-900/30 via-black to-black p-8 md:p-12">
        <h2 className="text-3xl md:text-4xl font-semibold text-white">Kontakt i brief projektowy</h2>
        <p className="mt-5 text-white/75 max-w-3xl leading-relaxed">
          Opisz swój projekt i wymagania, a przygotujemy szczegółową wycenę. Brief projektowy jest
          połączony z formularzem kontaktowym, więc wszystko wysyłasz w jednym miejscu.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Link
            href="/brief"
            className="inline-flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-500 text-white px-7 py-3.5 font-medium transition-colors"
          >
            Wypełnij brief projektowy
          </Link>
          <Link
            href="/contact?tab=project#contact-form"
            className="inline-flex items-center justify-center rounded-full border border-white/30 hover:border-blue-400 text-white px-7 py-3.5 font-medium transition-colors"
          >
            Przejdź do formularza kontaktowego
          </Link>
        </div>
      </div>
    </section>
  );
}
