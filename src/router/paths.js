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
        text: "Websites",
    },
    {
        path: 'discovering-your-business',
        name: 'InfoQuestionnaire',
        text: "ABOUT YOU",
        nested: 'Websites',
        noToolbar: true
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
        text: "Portfolio"
    },
    {
        path: '/contact-icraft',
        name: 'Contact',
        text: "Contact"
    }
]


export default paths