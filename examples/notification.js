'use strict'

const path = require('path')
const { Config } = require('@adonisjs/sink')
const { ioc, registrar } = require('@adonisjs/fold')

const run = async () => {
  ioc.singleton('Adonis/Src/Config', () => {
    const config = new Config()
    return config
  })
  ioc.alias('Adonis/Src/Config', 'Config')

  ioc.singleton('Adonis/Src/Event', () => {
    const Event = require('@adonisjs/framework/src/Event')
    return new Event(ioc.use('Config'))
  })
  ioc.alias('Adonis/Src/Event', 'Event')

  await registrar
    .providers([
      'adonis-notifications/providers/NotificationsProvider',
      path.join(__dirname, '../providers/WebhookNotificationChannelProvider')
    ])
    .registerAndBoot()

  const WebhookMessage = ioc.use('WebhookMessage')

  class WebhookTestNotification {
    via () {
      return ['webhook']
    }

    toWebhook () {
      const message = new WebhookMessage()
      message.header('content-type', 'application/json')
      return message
    }
  }

  const Notifications = ioc.use('Notifications')
  return Notifications
    .route('webhook', 'https://httpbin.org/json')
    .notify(new WebhookTestNotification())
}

run()
  .then(response => {
    console.log('Response', response)
  })
  .catch(console.error)
