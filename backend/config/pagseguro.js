module.exports = {
    mode: process.env.NODE_ENV === 'production' ? "live" : 'sandbox',
    sandbox: process.env.NODE_ENV === 'production' ? false : true,
    sandbox_email: process.env.NODE_ENV === 'production' ? null : 'email@sandbox.pagseguro.com.br',
    email: 'email',
    token: 'token',
    notificationURL: process.env.NotificationURL,
}