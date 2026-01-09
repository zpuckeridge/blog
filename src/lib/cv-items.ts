export interface EmploymentItem {
  title: string; // e.g. "Company Name"
  position: string; // e.g. "IT Administrator", "Systems Administrator", "Freelance"
  startYear: number; // e.g. 2021
  endYear: number | "Present"; // e.g. 2023 or "Present"
  location: string; // e.g. "Brisbane, Australia"
  url: string; // e.g. "https://company.com"
  description: string; // e.g. "Worked on X, Y, Z..."
}

export const employmentHistory: EmploymentItem[] = [
  {
    title: "Star Compass",
    position: "IT Operations Lead ",
    startYear: 2024,
    endYear: "Present",
    location: "Brisbane, Australia",
    url: "https://starcompass.com.au",
    description:
      "Working as the IT Operations Lead for Star Compass, a disability support service.",
  },
  {
    title: "Rising Sun Pictures",
    position: "IT Administrator",
    startYear: 2022,
    endYear: 2024,
    location: "Brisbane, Australia",
    url: "https://rsp.com.au/",
    description:
      "Built out and managed the Brisbane satellite office as the sole IT Administrator, growing the team from 12 to 65 in a year. Oversaw deployment and management of equipment, facilities, and provided support for hardware, networks, and user management.",
  },
  {
    title: "Pixel Zoo",
    position: "Systems Administrator",
    startYear: 2021,
    endYear: 2022,
    location: "Brisbane, Australia",
    url: "https://pixelzoo.com.au/",
    description:
      "Provided support for ~200 employees, both internal and remote, and deployed major networking and hardware upgrades across the studio. Built and deployed a ~500TB CephFS Cluster to upgrade storage and managed render farms to ensure project deadlines were met.",
  },
  {
    title: "Dev Demand Co",
    position: "Junior Cloud Engineer",
    startYear: 2020,
    endYear: 2021,
    location: "Brisbane, Australia",
    url: "https://devdemand.co/",
    description:
      "Managed server issues and developed documentation and processes for a small business. Assisted with Kubernetes deployment and client project development.",
  },
  {
    title: "Conetix Web Hosting",
    position: "Technical Support",
    startYear: 2018,
    endYear: 2020,
    location: "Brisbane, Australia",
    url: "https://conetix.com.au/",
    description:
      "Provided professional support for a wide range of web technologies including WordPress, Office 365, Plesk, Windows Server, and Linux. Wrote technical documentation and participated in server maintenance.",
  },
  {
    title: "Camp Highroad",
    position: "Camp Counsellor",
    startYear: 2018,
    endYear: 2018,
    location: "Virginia, United States",
    url: "https://www.camphighroad.org",
    description:
      "Led campers through team building and extra-curricular activities, building strong relationships with campers, parents, and fellow counsellors. Traveled across the USA, meeting some excellent people along the way.",
  },
  {
    title: "Hungry Jack’s",
    position: "Crew Member",
    startYear: 2016,
    endYear: 2018,
    location: "Brisbane, Australia",
    url: "https://hungryjacks.com.au",
    description:
      "Developed strong time management skills and thrived in a fast-paced environment. Helped train new Crew Members in proper procedures.",
  },
];
export interface EducationItem {
  title: string;
  field: string;
  startDate: string;
  endDate: string;
  location?: string;
  url?: string;
  description?: string;
  credential?: string;
}

export const educationHistory: EducationItem[] = [
  {
    title: "Haddon Institute",
    field: "Theology for Worldview",
    startDate: "2023-12-04",
    endDate: "2024-01-29",
    url: "https://haddoninstitute.org/course/theology-for-worldview",
    description:
      "This 6-week course aims to equip students with a comprehensive overview of Christian theology and worldview, as well as its relevance for today.",
  },
  {
    title: "TAFE Queensland",
    field: "Information Technology & Digital Media",
    startDate: "2019-01-01",
    endDate: "2020-06-05",
    credential: "Certificate III",
    description:
      "This was completed as a part of my employment with Conetix Web Hosting.",
  },
];
