import type { IFeaturedService, ITestimonails, JobType } from '@/types';
import { $Enums } from '@prisma/client';

export const featuredServices: IFeaturedService[] = [
  {
    id: '1',
    title: 'Logo Tasarlama',
    subtitle: 'Grafik & Tasarım',
    description: 'Profesyonel Logo Tasarlama hizmetleri.',
    href: '/dashboard/search?category=Logo Tasarlama',
  },
  {
    id: '2',
    title: 'Web Tasarım',
    subtitle: 'Programlama & Teknoloji',
    description: ' Profesyoneller tarafından web sitenizi oluşturun.',
    href: '/dashboard/search?category=Web Tasarım',
  },
  {
    id: '3',
    title: 'SEO Hizmetleri',
    subtitle: 'Diğer Dijital Pazarlama Hizmetleri',
    description: 'SEO ile online görünürlüğünüzü artırın.',
    href: '/dashboard/search?category=SEO Hizmetleri',
  },
];
export const testimonials: ITestimonails[] = [
  {
    id: '1',
    name: 'John Doe',
    description: `"Hizmet inanılmazdı. Logomu kısa sürede tasarlattım."`,
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkL4nwNk6k_5nZ_F5Mmo4QauoglmkDTd9VRJ_gd_n1WTQkCPrv7b2n-_iz_cBgpCubDyI&usqp=CAU',
  },
  {
    id: '2',
    name: 'Jane Smith',
    description: `"Çok profesyonel web geliştirme hizmetleri sundular. Şiddetle tavsiye edilir."`,
    img: 'https://st4.depositphotos.com/5260901/31593/i/450/depositphotos_315935436-stock-photo-beautiful-female-african-american-business.jpg',
  },
  {
    id: '3',
    name: 'Robert Johnson',
    description: `"SEO hizmetleri sayesinde web sitemin trafiği arttı."`,
    img: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  },
];

export const categories: IFeaturedService[] = [
  {
    id: '1',
    title: 'Logo Tasarlama',
    subtitle: '',
    description: 'Profesyonel Logo Tasarlama hizmetleri.',
    href: '/dashboard/search?category=Logo Tasarlama',
  },
  {
    id: '2',
    title: 'Web Tasarım',
    subtitle: '',
    description: ' Profesyoneller tarafından web sitenizi oluşturun.',
    href: '/dashboard/search?category=Web Tasarım',
  },
  {
    id: '3',
    title: 'SEO Hizmetleri',
    subtitle: '',
    description: 'SEO ile online görünürlüğünüzü artırın.',
    href: '/dashboard/search?category=SEO Hizmetleri',
  },
];

export const jobTypes: JobType[] = [
  {
    id: 55,
    title: 'Proje',
  },
  {
    id: 533,
    title: 'Görev',
  },
];

export const selectedList: {
  id: number;
  value: $Enums.UserType;
  name: 'Freelancer' | 'İş Veren';
  description: string;
}[] = [
  {
    id: 1,
    value: 'FREELANCER',
    name: 'Freelancer',
    description: 'Hizmet vererek para kazanmak istiyorum.',
  },
  {
    id: 2,
    value: 'EMPLOYER',
    name: 'İş Veren',
    description:
      'Bir projem var ve bir profesyonelden yardım almak için burdayım.',
  },
];

export const categoriesList: { id: number; name: string }[] = [
  {
    id: 1,
    name: 'Web Tasarım',
  },
  {
    id: 2,
    name: 'Logo Tasarlama',
  },
  {
    id: 3,
    name: 'SEO Hizmetleri',
  },
];
