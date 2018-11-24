export default [
    {
        path: '',
        view: 'Home'
    },
    {
        path: '/contact-icraft',
        view: 'Contact'
    },
    {
        path: '/icrafts-portfolio',
        view: 'Portfolio'
    },
    {
        path: '/all-about-icraft',
        view: 'About'
    },
    {
        path: '/digitally-market-your-business',
        view: 'DigitalMarketing'
    },
    {
        path: '/get-a-website',
        view: 'Websites',
        children: [{
            path: 'find-the-right-website',
            view: 'WebsiteQuestions'
        }]
    },
    {
        path: '/brand-your-business',
        view: 'Branding'
    },
    {
        path: '/get-IT-training',
        view: 'ItSolutions'
    }
]
