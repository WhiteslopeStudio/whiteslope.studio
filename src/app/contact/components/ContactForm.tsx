'use client';

import { useState } from 'react';
import { Mail, Phone } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredContact: 'email',
    subject: '',
    message: '',
    consent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const wysyla_wiadomosc = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // backend akceptuje tylko: meeting, quote, question, project
          formType: 'question',
          formData: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            preferredContact: formData.preferredContact,
            subject: formData.subject,
            message: formData.message,
            // wymagane przez validateQuestionData w route.ts
            priority: 'medium',
          }
        })
      });

      if (!res.ok) {
        const bledDane = await res.json().catch(() => ({}));
        throw new Error(bledDane.error || 'Błąd serwera');
      }

      setSuccessMsg('Wiadomość została wysłana! Odezwiemy się wkrótce.');
      // czyści formularz po sukcesie
      setFormData({
        name: '', email: '', phone: '', preferredContact: 'email', subject: '', message: '', consent: false
      });
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Nieznany błąd';
        setErrorMsg(`Wystąpił błąd podczas wysyłania: ${errorMessage}. `);
    } finally {
      setIsSubmitting(false);
    }
  };

  // powiększa pole tekstowe w dół w miarę pisania
  const zmienia_tresc_wiadomosci = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, message: e.target.value });
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    <section className="w-full bg-white  relative overflow-hidden mb-30" >
      <div className="container mx-auto max-w-[1640px] px-[24px] relative z-10 flex flex-col items-center">

        {/* --- NAGŁÓWEK NA ŚRODKU (Ponad kontenerami) --- */}
        <div className="text-left items-start w-full  mb-10">
          <h2 className="text-[45px]  font-black text-zinc-950 leading-[1.05] tracking-tight text-left mt-5 md:ml-9 ">
            Porozmawiajmy <br /> o Twoim projekcie
          </h2>

        </div>

        {/* --- DWA DIVY ROZDZIELAJĄCE SEKCJĘ --- */}
        <div className="w-full flex flex-col lg:flex-row gap-16 lg:gap-24 items-start justify-between md:ml-15">

          {/* LEWY DIV: Formularz (65%) */}
          <div className="w-full lg:w-[65%] max-w-[1100px] flex flex-col items-start">
            <p className="text-xs text-zinc-400 mb-2 ml-3"><span className="text-red-500">*</span> pola wymagane</p>
            <form onSubmit={wysyla_wiadomosc} className="w-full flex flex-col gap-6">

              {/* Imię i nazwisko */}
              <div className="flex flex-col">
                <label className="text-[13px] font-bold text-zinc-700 mb-2 ml-3">Imię i nazwisko <span className="text-red-500">*</span></label>
                <input
                  required
                  type="text"
                  className="w-full bg-zinc-100 hover:bg-zinc-200/70 focus:bg-zinc-200 px-6 py-4 rounded-full text-zinc-900 placeholder-zinc-400 border-none outline-none focus:outline-none focus:ring-0 transition-all font-medium"
                  placeholder="Np. Jan Kowalski"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              {/* Email i Telefon */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label className="text-[13px] font-bold text-zinc-700 mb-2 ml-3">Adres e-mail <span className="text-red-500">*</span></label>
                  <input
                    required
                    type="email"
                    className="w-full bg-zinc-100 hover:bg-zinc-200/70 focus:bg-zinc-200 px-6 py-4 rounded-full text-zinc-900 placeholder-zinc-400 border-none outline-none focus:outline-none focus:ring-0 transition-all font-medium"
                    placeholder="JanKowalski@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-[13px] font-bold text-zinc-700 mb-2 ml-3">Numer telefonu <span className="text-zinc-400 font-normal">(opcjonalnie)</span></label>
                  <input
                    type="tel"
                    className="w-full bg-zinc-100 hover:bg-zinc-200/70 focus:bg-zinc-200 px-6 py-4 rounded-full text-zinc-900 placeholder-zinc-400 border-none outline-none focus:outline-none focus:ring-0 transition-all font-medium"
                    placeholder="+48 123 123 123"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              {/* Preferowana forma kontaktu */}
              <div className="flex flex-col mt-2">
                <label className="text-[13px] font-bold text-zinc-700 mb-3 ml-3">Preferowana forma kontaktu</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, preferredContact: 'email' })}
                    className={`flex items-center justify-center gap-2.5 py-4 rounded-full font-bold text-sm transition-all border-none outline-none focus:outline-none focus:ring-0 cursor-pointer ${
                      formData.preferredContact === 'email'
                        ? 'bg-blue-200 text-black'
                        : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200 hover:text-zinc-800'
                    }`}
                  >
                    <Mail className="w-4 h-4" /> Wiadomość E-mail
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, preferredContact: 'phone' })}
                    className={`flex items-center justify-center gap-2.5 py-4 rounded-full font-bold text-sm transition-all border-none outline-none focus:outline-none focus:ring-0 cursor-pointer ${
                      formData.preferredContact === 'phone'
                        ? 'bg-blue-200 text-black'
                        : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200 hover:text-zinc-800'
                    }`}
                  >
                    <Phone className="w-4 h-4" /> Rozmowa tel.
                  </button>
                </div>
              </div>

              {/* Temat wiadomości */}
              <div className="flex flex-col mt-2">
                <label className="text-[13px] font-bold text-zinc-700 mb-2 ml-3">Temat <span className="text-red-500">*</span></label>
                <input
                  required
                  type="text"
                  className="w-full bg-zinc-100 hover:bg-zinc-200/70 focus:bg-zinc-200 px-6 py-4 rounded-full text-zinc-900 placeholder-zinc-400 border-none outline-none focus:outline-none focus:ring-0 transition-all font-medium"
                  placeholder="Np. Wycena strony internetowej"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                />
              </div>

              {/* Treść wiadomości */}
              <div className="flex flex-col mt-2">
                <label className="text-[13px] font-bold text-zinc-700 mb-2 ml-3">Treść wiadomości <span className="text-red-500">*</span></label>
                <textarea
                  required
                  rows={4}
                  className="w-full bg-zinc-100 hover:bg-zinc-200/70 focus:bg-zinc-200 px-6 py-5 rounded-[32px] text-zinc-900 placeholder-zinc-400 border-none outline-none focus:outline-none focus:ring-0 transition-all resize-none overflow-hidden font-medium"
                  placeholder="Napisz krótko, jakiego rozwiązania potrzebujesz..."
                  value={formData.message}
                  onChange={zmienia_tresc_wiadomosci}
                />
              </div>

              {/* Zgoda RODO */}
              <div className="flex items-start gap-3 mt-3 ml-1">
                <input
                  type="checkbox"
                  id="consent"
                  required
                  checked={formData.consent}
                  onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                  className="mt-1 w-4 h-4 rounded border-none bg-zinc-200 checked:bg-zinc-950 text-zinc-950 focus:ring-0 focus:outline-none cursor-pointer"
                />
                <label htmlFor="consent" className="text-xs text-zinc-500 leading-relaxed cursor-pointer select-none">
                  Wyrażam zgodę na przetwarzanie moich danych osobowych podanych w formularzu kontaktowym przez Whiteslope Studio w celu odpowiedzi na przesłane zapytanie. Rozumiem, że mogę w każdej chwili wycofać zgodę, co nie wpływa na zgodność z prawem przetwarzania przed jej wycofaniem.
                </label>
              </div>

              {/* Komunikaty zwrotne */}
              {successMsg && (
                <p className="text-green-600 font-bold text-sm mt-2 ml-1">{successMsg}</p>
              )}
              {errorMsg && (
                <p className="text-red-600 font-bold text-sm mt-2 ml-1">{errorMsg}</p>
              )}

              {/* Przycisk wyślij */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold text-[15px] py-4 px-10 rounded-full transition-transform duration-300 hover:scale-[1.03] disabled:opacity-70 disabled:hover:scale-100 shadow-lg shadow-blue-600/20 cursor-pointer border-none outline-none focus:outline-none"
              >
                {isSubmitting ? 'Wysyłanie...' : 'Wyślij wiadomość'}
              </button>
            </form>
          </div>

          {/* PRAWY DIV: Google Maps + Dane kontaktowe (35%) */}
          <div className="w-full lg:w-[35%] max-w-[700px] flex flex-col gap-10">

            {/* DANE KONTAKTOWE */}
            <div className="flex flex-col gap-6 px-2">
              <h3 className="text-2xl font-black text-zinc-950 tracking-tight">Dane kontaktowe:</h3>

              <div className="flex flex-col gap-6 text-sm">
                {/* Email */}
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold text-zinc-400  tracking-widest mb-1.5">Email</span>
                  <a href="mailto:kontakt@whiteslope.studio" className="font-bold text-zinc-900 text-base hover:text-zinc-600 transition-colors w-fit">
                    kontakt@whiteslope.studio
                  </a>
                </div>

                {/* Telefon */}
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold text-zinc-400 tracking-widest mb-1.5">Telefon</span>
                  <div className="flex flex-col gap-1.5">
                    <a href="tel:+48662581368" className="font-bold text-zinc-900 text-base hover:text-zinc-600 transition-colors w-fit">+48 662 581 368 - Patryk Kulesza</a>
                    <a href="tel:+48731721760" className="font-bold text-zinc-900 text-base hover:text-zinc-600 transition-colors w-fit">+48 731 721 760 - Mateusz Malewski</a>
                  </div>
                </div>

                {/* Lokalizacja */}
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold text-zinc-400 tracking-widest mb-1.5">Lokalizacja</span>
                  <span className="font-bold text-zinc-900 text-base">Białystok, Polska</span>
                </div>

                {/* Godziny pracy */}
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold text-zinc-400 tracking-widest mb-1.5">Godziny pracy</span>
                  <span className="font-bold text-zinc-900 text-base">Pon – Pt: 9:00 – 17:00</span>
                </div>
              </div>
            </div>

            {/* GOOGLE MAPS - Płaski boks z mapą Białegostoku */}
            <div className="w-full h-[300px] bg-zinc-100 rounded-[32px] overflow-hidden relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d76624.96695627613!2d23.07221375!3d53.1324886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471fec40eafe0221%3A0x6b8fef9fa70da9d!2zQmlhxYJ5c3Rvaw!5e0!3m2!1spl!2spl!4v1715200000000"
                className="w-full h-full border-0 absolute inset-0"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}