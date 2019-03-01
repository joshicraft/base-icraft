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
        path: '/get-a-website',
        name: 'Websites',
        text: "Websites",
        nestedItems: [

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
                path: 'business-website-process',
                name: 'Process',
                text: "Process",
                nestedPath: 'Websites',

            },
            {
                path: 'icrafts-website-terms',
                name: 'WebsiteTerms',
                text: "Terms",
                nestedPath: 'Websites',
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
        path: '/contact-icraft',
        name: 'Contact',
        text: "Contact"
    },
    {
        path: '/sitemap',
        name: 'SiteMap',
        text: "Site Map",
        noToolbar: true
    }
]


export default paths