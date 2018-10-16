'use strict'

const test = require('japa')
const path = require('path')
const { Config } = require('@adonisjs/sink')
const { ioc, registrar } = require('@adonisjs/fold')
const WebhookMessage = require('../../src/WebhookMessage')
const WebhookChannel = require('../../src/WebhookChannel')

test.group('WebhookNotificationChannelProvider', group => {
  group.before(async () => {
    ioc.singleton('Adonis/Src/Config', () => {
      const config = new Config()
      return config
    })

    ioc.singleton('Adonis/Src/View', () => null)

    await registrar
      .providers([
        'adonis-notifications/providers/NotificationsProvider',
        path.join(__dirname, '../../providers/WebhookNotificationChannelProvider')
      ])
      .registerAndBoot()
  })

  test('WebhookMessage', assert => {
    assert.isDefined(ioc.use('Adonis/Notifications/WebhookMessage'))
    assert.isFalse(ioc._bindings['Adonis/Notifications/WebhookMessage'].singleton)
    assert.equal(ioc._aliases['WebhookMessage'], 'Adonis/Notifications/WebhookMessage')
    assert.deepEqual(ioc.use('Adonis/Notifications/WebhookMessage'), WebhookMessage)
    assert.deepEqual(ioc.use('WebhookMessage'), WebhookMessage)
    assert.deepEqual(ioc.use('Adonis/Notifications/WebhookMessage'), ioc.use('WebhookMessage'))
  })

  test('WebhookChannel', assert => {
    assert.instanceOf(ioc.use('Notifications').channel('webhook'), WebhookChannel)
  })
})
