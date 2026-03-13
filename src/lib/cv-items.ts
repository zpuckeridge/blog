export interface EmploymentItem {
  /** e.g. "Worked on X, Y, Z..." */
  description: string;
  /** e.g. 2023 or "Present" */
  endYear: number | "Present";
  /** e.g. "Brisbane, Australia" */
  location: string;
  /** e.g. "IT Administrator", "Systems Administrator", "Freelance" */
  position: string;
  /** e.g. 2021 */
  startYear: number;
  /** e.g. "Company Name" */
  title: string;
  /** e.g. "https://company.com" */
  url: string;
}

export const employmentHistory: EmploymentItem[] = [
  {
    description:
      "Working as the IT Operations Lead for Star Compass, a disability support service.",
    endYear: "Present",
    location: "Brisbane, Australia",
    position: "IT Operations Lead ",
    startYear: 2024,
    title: "Star Compass",
    url: "https://starcompass.com.au",
  },
  {
    description:
      "Built out and managed the Brisbane satellite office as the sole IT Administrator, growing the team from 12 to 65 in a year. Oversaw deployment and management of equipment, facilities, and provided support for hardware, networks, and user management.",
    endYear: 2024,
    location: "Brisbane, Australia",
    position: "IT Administrator",
    startYear: 2022,
    title: "Rising Sun Pictures",
    url: "https://rsp.com.au/",
  },
  {
    description:
      "Provided support for ~200 employees, both internal and remote, and deployed major networking and hardware upgrades across the studio. Built and deployed a ~500TB CephFS Cluster to upgrade storage and managed render farms to ensure project deadlines were met.",
    endYear: 2022,
    location: "Brisbane, Australia",
    position: "Systems Administrator",
    startYear: 2021,
    title: "Pixel Zoo",
    url: "https://pixelzoo.com.au/",
  },
  {
    description:
      "Managed server issues and developed documentation and processes for a small business. Assisted with Kubernetes deployment and client project development.",
    endYear: 2021,
    location: "Brisbane, Australia",
    position: "Junior Cloud Engineer",
    startYear: 2020,
    title: "Dev Demand Co",
    url: "https://devdemand.co/",
  },
  {
    description:
      "Provided professional support for a wide range of web technologies including WordPress, Office 365, Plesk, Windows Server, and Linux. Wrote technical documentation and participated in server maintenance.",
    endYear: 2020,
    location: "Brisbane, Australia",
    position: "Technical Support",
    startYear: 2018,
    title: "Conetix Web Hosting",
    url: "https://conetix.com.au/",
  },
  {
    description:
      "Led campers through team building and extra-curricular activities, building strong relationships with campers, parents, and fellow counsellors. Traveled across the USA, meeting some excellent people along the way.",
    endYear: 2018,
    location: "Virginia, United States",
    position: "Camp Counsellor",
    startYear: 2018,
    title: "Camp Highroad",
    url: "https://www.camphighroad.org",
  },
  {
    description:
      "Developed strong time management skills and thrived in a fast-paced environment. Helped train new Crew Members in proper procedures.",
    endYear: 2018,
    location: "Brisbane, Australia",
    position: "Crew Member",
    startYear: 2016,
    title: "Hungry Jack’s",
    url: "https://hungryjacks.com.au",
  },
];
export interface EducationItem {
  credential?: string;
  description?: string;
  endDate: string;
  field: string;
  location?: string;
  startDate: string;
  title: string;
  url?: string;
}

export const educationHistory: EducationItem[] = [
  {
    description:
      "This 6-week course aims to equip students with a comprehensive overview of Christian theology and worldview, as well as its relevance for today.",
    endDate: "2024-01-29",
    field: "Theology for Worldview",
    startDate: "2023-12-04",
    title: "Haddon Institute",
    url: "https://haddoninstitute.org/course/theology-for-worldview",
  },
  {
    credential: "Certificate III",
    description:
      "This was completed as a part of my employment with Conetix Web Hosting.",
    endDate: "2020-06-05",
    field: "Information Technology & Digital Media",
    startDate: "2019-01-01",
    title: "TAFE Queensland",
  },
];
