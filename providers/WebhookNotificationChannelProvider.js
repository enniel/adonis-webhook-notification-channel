'use strict'

const { ServiceProvider } = require('@adonisjs/fold')

class WebhookNotificationChannelProvider extends ServiceProvider {
  register () {
    this.app.bind('Adonis/Notifications/WebhookMessage', () => {
      return require('../src/WebhookMessage')
    })
    this.app.alias('Adonis/Notifications/WebhookMessage', 'WebhookMessage')
  }

  boot () {
    const Notifications = this.app.use('Notifications')
    Notifications.extend('webhook', () => {
      const WebhookChannel = require('../src/WebhookChannel')
      return new WebhookChannel()
    })
  }
}

module.exports = WebhookNotificationChannelProvider
