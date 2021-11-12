var ghpages = require('gh-pages');

ghpages.publish(
    'public', // path to public directory
    {
        branch: 'gh-pages',
        repo: 'https://github.com/gmmurray/social-media-link-cleaner.git', // Update to point to your repository  
        user: {
            name: 'Greg M', // update to use your name
            email: 'gmmurray8@gmail.com' // Update to use your email
        }
    },
    () => {
        console.log('Deploy Complete!')
    }
)