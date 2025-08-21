
import type { ResumeData } from './types';

export const initialData: ResumeData = {
  personal: {
    name: "Fadel Muhamad Rifai",
    role: "Web Developer",
    email: "faaadelmr@gmail.com",
    phone: "0812-3456-7890",
    location: "Tangerang, Indonesia",
    website: "faaadelmr.pages.dev",
    photo: "",
    description: "Mahasiswa yang lagi memperdalam teknik 'Pernapasan AI, gerakan pertama: aplikasi berbasis web'",
  },
  experience: [
    {
      id: "exp1",
      company: "Teknologi Maju Nusantara",
      role: "Senior Frontend Developer",
      date: "Jan 2020 - Sekarang",
      description: `- Memimpin tim dalam pengembangan platform e-commerce baru, yang menghasilkan peningkatan penjualan sebesar 30%.
- Membimbing developer junior dan melakukan code review untuk memastikan kualitas kode.
- Berkolaborasi dengan tim UX/UI untuk menerapkan antarmuka yang responsif dan aksesibel.`,
    },
     {
      id: "exp2",
      company: "Inovasi Web Kreatif",
      role: "Frontend Developer",
      date: "Jun 2017 - Des 2019",
      description: `- Mengembangkan dan memelihara berbagai situs web klien menggunakan React dan Vue.js.
- Meningkatkan performa situs web hingga 20% melalui optimisasi kode dan teknik lazy loading.`,
    },
  ],
  education: [
    {
      id: "edu1",
      institution: "Universitas Dian Nusantara",
      degree: "S.Kom, Ilmu Komputer",
      date: "2022 - Sekarang",
      description: "",
    },
  ],
  skills: "React, Next.js, TypeScript, Tailwind CSS, JavaScript, Laravel",
  references: "Tersedia berdasarkan permintaan",
};
