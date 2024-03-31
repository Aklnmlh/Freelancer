import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import React from 'react';

const FaqPage = () => {
  return (
    <main className="flex-1 px-4 md:px-6 py-6 sm:py-12 md:py-24 lg:py-32">
      <section className="container">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">
          Frequently Asked Questions
        </h1>
        <div className="grid gap-4 sm:gap-6 mt-4 sm:mt-8">
          <Accordion type="single" collapsible>
            <AccordionItem value="Bir serbest çalışan nasıl işe alınır?">
              <AccordionTrigger>
                Bir Freelancer nasıl işe alınır?
              </AccordionTrigger>
              <AccordionContent>
                <div>
                  <p className="text-gray-500">
                    Bir serbest çalışanı işe almak için sadece bir iş ilanı
                    yayınlayın, işinizi yapabilecek olan ilk freelancer işi alıp
                    size mesaj atacaktır.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="  Hangi ödeme yöntemleri kabul ediliyor?">
              <AccordionTrigger>
                Hangi ödeme yöntemleri kabul ediliyor?
              </AccordionTrigger>
              <AccordionContent>
                <div>
                  <p className="text-gray-500">
                    Tüm büyük kredi kartlarını ve ön ödemeli kartları kabul
                    ediyoruz.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="Bir iş ilanı yayınlamak ne kadar tutar?">
              <AccordionTrigger>
                Bir iş ilanı yayınlamak ne kadar tutar?
              </AccordionTrigger>
              <AccordionContent>
                <div>
                  <p className="text-gray-500">
                    Platformumuzda bir iş ilanı yayınlamak ücretsizdir. Sadece
                    serbest işin bütçesini belirlediğinizde bütçe ödemesi
                    yaparsınız.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </main>
  );
};

export default FaqPage;
