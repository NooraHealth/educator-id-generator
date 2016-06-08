
class App
  @get: ->
    @privateApp ?= new PrivateClass()
    return @privateApp

  class PrivateClass
    constructor: ->

    initialize: ->
      @f7 = new Framework7(
        material: true
        router:false
      )

    getF7App: ->
      return @f7


module.exports.App = App.get()





