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
/*
   {
        path: '/get-IT-training',
        name: 'ItSolutions',
        text: "IT Solutions",
        noToolbar: true
    },

    ,
    {
      "name": "it solutions",
      "title": "IMPROVE YOUR WORKFLOW TOOLS",
      "text": "This modern age is full of helpful tools to help you focus on what you do best. ICRAFT can help find the right tools for you.",
      "img": "it-training",
      "button": "MORE HERE",
      "to": "ItSolutions"
    }

                {
                path: 'business-website-questions',
                name: 'InfoQuestionnaire',
                text: "Questionnaire",
                nestedPath: 'Websites',
                noToolbar: true
            },



 */
let paths = [
    {
        path: '',
        name: 'Home',
        text: "Home",
        priority: 1
    },
    {
        path: '/web-design',
        name: 'Websites',
        text: "Websites",
        priority: 1,
        nestedItems: [

            {
                path: 'website-discovery',
                name: 'Discovery',
                text: "Discovery",
                nestedPath: 'Websites',
            },
            {
                path: 'why-icraft-website-development',
                name: 'WhyUsWebsites',
                text: "Why ICRAFT",
                nestedPath: 'Websites',
                priority: 1
            },
            {
                path: 'website-packages',
                name: 'Packages',
                text: "Packages",
                nestedPath: 'Websites',
                priority: 1
            },
            {
                path: 'website-development-process',
                name: 'Process',
                text: "Process",
                nestedPath: 'Websites',

            },
            {
                path: 'mobile-web-development',
                name: 'Mobile',
                text: "Mobile",
                nestedPath: 'Websites',
            },
            {
                path: 'icraft-website-terms',
                name: 'WebsiteTerms',
                text: "Terms",
                nestedPath: 'Websites',
            },

            {
                path: 'web-design-questions',
                name: 'InfoQuestionnaire',
                text: "Questionnaire",
                nestedPath: 'Websites',
                remove:  process.env.NODE_ENV === 'development',
                noToolbar: true
            }
        ]
    },


    {
        path: '/graphic-design',
        name: 'Branding',
        text: "Branding"
    },

    {
        path: '/web-solutions-and-training',
        name: 'ITSolutions',
        text: "IT Solutions"
    },
    {
        path: '/icraft-web-design-portfolio',
        name: 'Portfolio',
        text: "Portfolio",
        noToolbar: true,
        remove: process.env.NODE_ENV === 'production'
    },
    {
        path: '/blog',
        name: 'Blog',
        text: "Blog",
        noToolbar: true,
        remove: process.env.NODE_ENV === 'production'
    },
    {
        path: '/contact-icraft-web-design',
        name: 'Contact',
        text: "Contact"
    },
    {
        path: '/privacy-policy',
        name: 'PrivacyPolicy',
        text: "Privacy Policy",
        noToolbar: true
    },
    {
        path: '/sitemap',
        name: 'SiteMap',
        text: "Site Map",
        noToolbar: true
    }
]


export default paths