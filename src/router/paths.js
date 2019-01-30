/*
    children for nested router links inside views example...

    children: [
            {
                path: 'find-the-right-website',
                name: 'InfoQuestionnaire',
                text: "Finding a website"
            }
        ]

 */

let paths = [
    {
        path: '',
        name: 'Home',
        text: "Home"
    },
    {
        path: '/get-a-website',
        name: 'Websites',
        text: "Websites"
    },
    {
        path: 'business-website-process',
        name: 'Process',
        text: "Process",
        nestedPath: 'Websites',
    },
    {
        path: 'business-website-questions',
        name: 'InfoQuestionnaire',
        text: "Questionnaire",
        nestedPath: 'Websites',
        noToolbar: true
    },
    {
        path: 'discover-the-website-for-you',
        name: 'Discovery',
        text: "Discovery",
        nestedPath: 'Websites',
    },
    {
        path: 'why-choose-icraft-websites',
        name: 'WhyUsWebsites',
        text: "Why ICRAFT",
        nestedPath: 'Websites',
    },
    {
        path: 'our-website-packages',
        name: 'Packages',
        text: "Packages",
        nestedPath: 'Websites',
    },
    {
        path: 'icrafts-website-terms',
        name: 'WebsiteTerms',
        text: "Terms",
        nestedPath: 'Websites',
    },
    {
        path: '/brand-your-business',
        name: 'Branding',
        text: "Branding"
    },
    {
        path: '/get-IT-training',
        name: 'ItSolutions',
        text: "IT Solutions"
    },
    {
        path: '/icrafts-portfolio',
        name: 'Portfolio',
        text: "Portfolio",
        development: true
    },
    {
        path: '/contact-icraft',
        name: 'Contact',
        text: "Contact"
    }
]


export default paths