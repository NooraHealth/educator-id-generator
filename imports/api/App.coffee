
class App
  @get: ->
    @privateApp ?= new PrivateClass()
    return @privateApp

  class PrivateClass
    constructor: ->

    initialize: ->

module.exports.App = App.get()
