'use strict'

class WebhookMessage {
  constructor (options = {}) {
    this.options = options
  }

  method (method) {
    this.options.method = method

    return this
  }

  header (key, value) {
    if (!this.options.headers) {
      this.options.headers = {}
    }

    this.options.headers[key] = value

    return this
  }

  body (body) {
    this.options.body = body

    return this
  }

  redirect (redirect) {
    this.options.redirect = redirect

    return this
  }

  follow (follow) {
    this.options.follow = follow

    return this
  }

  timeout (timeout) {
    this.options.timeout = timeout

    return this
  }

  compress (compress) {
    this.options.compress = compress

    return this
  }

  size (size) {
    this.options.size = size

    return this
  }

  agent (agent) {
    this.options.agent = agent

    return this
  }
}

module.exports = WebhookMessage
