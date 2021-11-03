// Proxy API requests using devServer.proxy


// DEBUG
console.log('Proxy')
proxy = '127.0.0.1'

// Proxy request to our URL
module.exports = {
    devServer: {
        proxy: {

            // testing 
            '/foo': {
                target: 'http://localhost:5104',
            },

            '/topi/login': {
                target: 'http://localhost:5104',
                pathRewrite: { 'topi/login': '/topi/v1.0/login'}
            },

            '/register': {
                target: 'http://localhost:5104',
                pathRewrite: { '/register': '/topi/v1.0/register'}
            },

            '/create-event': {
                target: 'http://localhost:5104',
                pathRewrite: { '/create-event': 'topi/v1.0/create-event'}
            },

            // '/get-events': {
            //     target: 'http://localhost:5104',
            //     pathRewrite: { '/get-events': 'topi/v1.0/get-events'}
            // }

            
        }
    }
}