# Adonis Webhook Notification Channel

Webhook Notification Channel for [adonis-notifications](https://github.com/enniel/adonis-notifications).

[![Build Status](https://travis-ci.org/enniel/adonis-webhook-notification-channel.svg?branch=master)](https://travis-ci.org/enniel/adonis-webhook-notification-channel)
[![Coverage Status](https://coveralls.io/repos/github/enniel/adonis-webhook-notification-channel/badge.svg?branch=master)](https://coveralls.io/github/enniel/adonis-webhook-notification-channel?branch=master)

## Installation

1. Add package:

```bash
$ npm i adonis-webhook-notification-channel --save
```
or

```bash
$ yarn add adonis-webhook-notification-channel
```

2. Register provider inside the your `start/app.js` file.

```js
const providers = [
  ...
  'adonis-webhook-notification-channel/providers/WebhookNotificationChannelProvider',
  ...
]
```

## Usage example

```js
// app/Model/Webhook.js
const Lucid = use('Lucid')

class Webhook extends Lucid {
  static get traits () {
    return [
      '@provider:Notifiable'
    ]
  }

  routeNotificationForWebhook () {
    return this.url
  }
}

module.exports = User
```

```js
// app/Notifications/MyNotification.js
const WebhookMessage = use('WebhookMessage')

class MyNotification {
  constructor(body) {
    this.body = JSON.stringify(body)
  }

  via () {
    return ['webhook']
  }

  toWebhook () {
    const message = new WebhookMessage()
    message
      .body(this.body)
      .header('content-type', 'application/json')
    return message
  }
}

module.exports = MyNotification
```

```js
const Notifications = use('Notifications')

...
const webhooks = await Webhook.all()

await Notifications.send(webhooks, new MyNotification({
  payload: {
    text: `It's works!!!`
  }
}))
...

```

## Credits

- [Evgeni Razumov](https://github.com/enniel)

## Support

Having trouble? [Open an issue](https://github.com/enniel/adonis-webhook-notification-channel/issues/new)!

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
