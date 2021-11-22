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
                pathRewrite: { '/topi/login': '/topi/v1.0/login'}
            },

            '/topi/register': {
                target: 'http://localhost:5104',
                pathRewrite: { '/topi/register': '/topi/v1.0/register'}
            },

            '/topi/create-event': {
                target: 'http://localhost:5104',
                pathRewrite: { '/topi/create-event': '/topi/v1.0/create-event'}
            },

            '/topi/delete-event': {
                target: 'http://localhost:5104',
                pathRewrite: { '/delete-event': 'topi/v1.0/delete-event' }
            },

            '/topi/get-info': {
                target: 'http://localhost:5104',
                pathRewrite: { '/topi/get-info': 'topi/v1.0/get-info'}
            },

            '/topi/get-events': {
                target: 'http://localhost:5104',
                pathRewrite: { '/topi/get-events': '/topi/v1.0/get-events'}
            },

            '/topi/get-info': {
                target: 'http://localhost:5104',
                pathRewrite: { '/get-info': '/topi/v1.0/get-info'}
            },

            '/topi/getuserevents': {
                target: 'http://localhost:5104',
                pathRewrite: { '/topi/getuserevents': '/topi/v1.0/getuserevents'}
            },

            '/topi/createuserevent': {
                target: 'http://localhost:5104',
                pathRewrite: { '/topi/createuserevent': '/topi/v1.0/createuserevent'}
            },

        }
    }
}