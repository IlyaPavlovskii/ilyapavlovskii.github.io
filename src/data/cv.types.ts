export type IntroSegment = string | { text: string; href: string };
export type IntroParagraph = IntroSegment[];

export interface TimelineItem {
    title?: string;
    company?: string;
    companyLink?: string;
    date?: string;
    location?: string;
    color?: string;
    icon?: string;
    desc?: string;
    achievements?: string[];
}

export interface Certification {
    label: string;
    href?: string;
}

export type ContactLinkType = "github" | "linkedin" | "medium" | "habr" | "email";

export interface ContactLink {
    label: string;
    href: string;
    type: ContactLinkType;
}

export interface CVData {
    lang: "en" | "ru";
    pageTitle: string;
    headerTitle: string;
    downloadButton: string;
    pdfFileName: string;
    contact: ContactLink[];
    intro: IntroParagraph[];
    sectionHeaders: {
        education: string;
        experience: string;
        projects: string;
        certifications: string;
        events: string;
        skills: string;
    };
    education: TimelineItem[];
    experience: TimelineItem[];
    projects: TimelineItem[];
    certifications: Certification[];
    events: TimelineItem[];
    skills: string[];
}
