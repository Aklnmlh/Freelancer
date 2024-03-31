import React from 'react';

const TermsOfServicePage = () => {
  return (
    <main className="flex-1 px-4 lg:px-6 py-6 sm:py-12 md:py-24 lg:py-32">
      <div className="container">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl">
          Hizmet Şartları
        </h1>
        <section className="mt-8">
          <h2 className="text-2xl font-bold">1. Giriş</h2>
          <p className="text-gray-500 mt-4">
            Freelance Platform&apos;a hoş geldiniz. Bu belge, hizmetlerimizi
            kullanmanın şartlarını ve koşullarını açıklar. Bu, sunduğumuz
            hizmetlerden, anlaşmazlıkları nasıl ele aldığımızdan, kullanıcı
            olarak sizin haklarınız ve sorumluluklarınızdan her şeyi içerir.
            Lütfen platformumuzu kullanmadan önce bu şartları dikkatlice
            okuyunuz. Bu aynı zamanda kişisel verilerinizi nasıl ele aldığımızı,
            bilgilerinizi nasıl koruduğumuzu ve herhangi bir sorunuz veya
            endişeniz varsa bize nasıl ulaşabileceğinizi de içerir.
          </p>
        </section>
        <section className="mt-8">
          <h2 className="text-2xl font-bold">2. Kullanıcı Anlaşması</h2>
          <p className="text-gray-500 mt-4">
            Platformumuzu kullanarak, bu şartlara uymayı kabul edersiniz. Bu,
            veri işleme politikalarımızı, kullanıcı davranışını, anlaşmazlık
            çözümünü ve daha fazlasını içerir. Bu şartlarla uyum
            sağlamıyorsanız, lütfen platformumuzu kullanmayın. Ayrıca, tüm
            geçerli yasalara ve düzenlemelere uymayı ve diğerlerinin haklarını
            ihlal etmemeyi kabul edersiniz.
          </p>
        </section>
        <section className="mt-8">
          <h2 className="text-2xl font-bold">3. Bu Şartların Değiştirilmesi</h2>
          <p className="text-gray-500 mt-4">
            Bu şartları istediğimiz zaman değiştirme hakkını saklı tutarız.
            Kullanıcıları herhangi bir değişiklik konusunda bilgilendireceğiz ve
            değişiklikler yapıldıktan sonra platformu kullanmaya devam etmek, bu
            değişiklikleri kabul etmek anlamına gelir. Değişiklikler,
            hizmetlerimizde ayarlamaları, yeni özelliklerin tanıtılmasını veya
            gizlilik politikamızın güncellenmesini içerebilir.
          </p>
        </section>
        <section className="mt-8">
          <h2 className="text-2xl font-bold">4. Kullanıcı Sorumluluğu</h2>
          <p className="text-gray-500 mt-4">
            Bir kullanıcı olarak, hesabınızdaki tüm faaliyetlerden, hesabınıza
            erişimi olan diğer kişiler tarafından gerçekleştirilen herhangi bir
            eylemden sorumlusunuz. Platformumuzu herhangi bir yasa dışı veya
            zararlı faaliyet için kullanmamayı kabul edersiniz. Bu, ancak spam
            gönderme, taciz, hackleme veya kötü amaçlı yazılım dağıtma ile
            sınırlı olmamak üzere bir dizi eylemi içerir.
          </p>
        </section>
        <section className="mt-8">
          <h2 className="text-2xl font-bold">5. Ödeme Şartları</h2>
          <p className="text-gray-500 mt-4">
            Freelance Platform, güvenli bir ödeme sistemini kullanmaktadır.
            Ödeme işlemleri ortaklarımızın tüm şartlarına uymayı kabul
            edersiniz. Bu şartlara uymamak, hesabınızın askıya alınmasına veya
            sonlandırılmasına neden olabilir.
          </p>
        </section>
        <section className="mt-8">
          <h2 className="text-2xl font-bold">6. Anlaşmazlık Çözümü</h2>
          <p className="text-gray-500 mt-4">
            Siz ve başka bir kullanıcı arasında veya siz ve Freelance Platform
            arasında ortaya çıkan herhangi bir anlaşmazlık, anlaşmazlık çözüm
            sürecimize uygun olarak ele alınacaktır. Bu, arabuluculuk veya bazı
            durumlarda yasal işlemleri içerebilir.
          </p>
        </section>
      </div>
    </main>
  );
};

export default TermsOfServicePage;
