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
        text: "Home"
    },
    {
        path: '/web-design',
        name: 'Websites',
        text: "Websites",
        nestedItems: [

            {
                path: 'web-design-discovery',
                name: 'Discovery',
                text: "Discovery",
                nestedPath: 'Websites',
            },
            {
                path: 'why-icraft-web-design',
                name: 'WhyUsWebsites',
                text: "Why ICRAFT",
                nestedPath: 'Websites',
            },
            {
                path: 'web-design-packages',
                name: 'Packages',
                text: "Packages",
                nestedPath: 'Websites',
            },
            {
                path: 'web-design-process',
                name: 'Process',
                text: "Process",
                nestedPath: 'Websites',

            },
            {
                path: 'mobile-web-design',
                name: 'Mobile',
                text: "Mobile",
                nestedPath: 'Websites',
            },
            {
                path: 'icraft-web-terms',
                name: 'WebsiteTerms',
                text: "Terms",
                nestedPath: 'Websites',
            },

            {
                path: 'web-design-questions',
                name: 'InfoQuestionnaire',
                text: "Questionnaire",
                nestedPath: 'Websites',
                noToolbar: true
            }
        ]
    },


    {
        path: '/brand-your-business',
        name: 'Branding',
        text: "Branding"
    },

    {
        path: '/get-IT-training',
        name: 'ITSolutions',
        text: "IT Solutions"
    },
    {
        path: '/icrafts-portfolio',
        name: 'Portfolio',
        text: "Portfolio",
        noToolbar: true
    },
    {
        path: '/blog',
        name: 'Blog',
        text: "Blog",
        noToolbar: false
    },
    {
        path: '/contact-icraft',
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