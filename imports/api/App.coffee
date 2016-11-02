
class App
  @get: ->
    @privateApp ?= new PrivateClass()
    return @privateApp

  class PrivateClass
    constructor: ->

    initialize: ->

    getF7App: ->


module.exports.App = App.get()
