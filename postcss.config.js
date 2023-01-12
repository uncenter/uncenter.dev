module.exports = {
    plugins: [
        require('cssnano')({
            preset: 'default',
        }),
        require('autoprefixer')({
            preset: 'default',
        }),
    ],
};