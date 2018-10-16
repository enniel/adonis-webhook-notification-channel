'use strict'

const fetch = require('node-fetch')
const NE = require('node-exceptions')
const WebhookMessage = require('./WebhookMessage')

class WebhookChannel {
  async send (notifiable, notification) {
    const message = this.getMessage(notifiable, notification)
    let url = await notifiable.routeNotificationFor('webhook')
    return fetch(url, message.options)
  }

  getMessage (notifiable, notification) {
    if (typeof notification.toWebhook === 'function') {
      return notification.toWebhook(notifiable)
    }

    if (typeof notification.toJSON === 'function') {
      return new WebhookMessage(notification.toJSON())
    }

    throw new NE.RuntimeException('Notification is missing toWebhook method.')
  }
}

module.exports = WebhookChannel
