'use client';

import React from 'react';

export default function BlogSeoSection() {
  return (
    <section className="w-full max-w-[1640px] mx-auto px-[24px] mt-[100px]">
      <div className="bg-white p-[40px] md:p-[64px] ">
        
        {/* Kontener ograniczający szerokość tekstu dla czytelności */}
        <div className="max-w-[1640px] mx-auto prose prose-zinc prose-p:text-zinc-500 prose-headings:text-zinc-900 prose-h2:text-[24px] prose-h2:mb-[16px] prose-p:text-[14px] prose-p:leading-[1.7] prose-li:text-[14px] prose-li:text-zinc-500">
          
          <h2 className="font-bold tracking-tight">
            Aktualności cyfrowe – o czym piszemy na blogu Whiteslope Studio?
          </h2>
          <p>
            Nasz blog to miejsce, gdzie dzielimy się praktyczną wiedzą z zakresu tworzenia nowoczesnych systemów webowych, automatyzacji procesów za pomocą sztucznej inteligencji (AI) oraz skutecznego e-marketingu. Omawiamy tu najważniejsze trendy technologiczne, rozkładamy na czynniki pierwsze skomplikowane wdrożenia i pokazujemy, jak firmy mogą realnie zwiększyć swoje zyski dzięki optymalizacji cyfrowej. Nie wróżymy z fusów – opieramy się na danych, kodzie i zrealizowanych projektach.
          </p>

          <h2 className="font-bold tracking-tight mt-[40px]">
            Co znajdziesz w naszych publikacjach?
          </h2>
          <p>
            Publikacje Whiteslope Studio to przede wszystkim różnorodność i mięso, a nie lanie wody. Lubimy obalać mity dotyczące tworzenia stron internetowych i pokazywać koszty oraz korzyści płynące z wdrożeń SaaS. Przyjemność sprawia nam również edukowanie naszych klientów w zakresie nowoczesnych narzędzi, takich jak integracje API, chatboty obsługi klienta czy zaawansowane analityki.
          </p>
          <p>
            Mówiąc krótko: tworzymy wartościowy content technologiczny i biznesowy. Nasze artykuły przygotowujemy z myślą o właścicielach firm, managerach e-commerce i startupach, którzy chcą mądrze skalować swój biznes w sieci bez wyrzucania budżetów w błoto.
          </p>

          <h2 className="font-bold tracking-tight mt-[40px]">
            4 zasady, którymi kierujemy się, dzieląc się wiedzą:
          </h2>
          <p>
            Wychodzimy z założenia, że dobry blog agencji digitalowej musi być merytoryczny i aktualny. W technologii wszystko zmienia się z miesiąca na miesiąc, dlatego trzymamy rękę na pulsie. Jakie są nasze żelazne zasady?
          </p>
          <ul className="list-disc pl-[20px] space-y-[8px] mt-[16px]">
            <li>
              <strong>Mówimy, jak działamy, nie jak żyć</strong> – dzielimy się case studies z naszych wdrożeń. Pokazujemy realny kod, realne problemy projektowe i skuteczne rozwiązania, które sprawdziły się u naszych klientów.
            </li>
            <li>
              <strong>Praktyka ponad teorię</strong> – nie przepisujemy dokumentacji. Jeśli piszemy o automatyzacji czy wideo-marketingu, robimy to po to, by pokazać konkretne narzędzia oszczędzające czas i pieniądze.
            </li>
            <li>
              <strong>Wyczerpujemy temat do końca</strong> – nasze wpisy są kompleksowe. Zależy nam na tym, abyś po przeczytaniu artykułu nie musiał szukać odpowiedzi nigdzie indziej.
            </li>
            <li>
              <strong>Zrozumiały i czysty design</strong> – forma podania jest tak samo ważna jak treść. Dbamy o to, aby kod, grafiki i tekst były podane w sposób przyjazny i czytelny dla każdego użytkownika.
            </li>
          </ul>

          <h2 className="font-bold tracking-tight mt-[40px]">
            Dlaczego warto śledzić Aktualności Whiteslope?
          </h2>
          <p>
            To nie tylko baza wiedzy technicznej. To przede wszystkim zbiór inspiracji dla Twojego biznesu, podany w przystępnej formie. Nie boimy się krytykować przereklamowanych rozwiązań na rynku, pisać na "Ty" i nazywać rzeczy po imieniu. Cenimy sobie dystans, ale jeśli chodzi o jakość kodu i zwrot z inwestycji (ROI) z naszych projektów – tu nie uznajemy żadnych kompromisów. Zostań z nami na dłużej i przenieś swoją firmę na wyższy poziom cyfryzacji!
          </p>
        </div>

      </div>
    </section>
  );
}