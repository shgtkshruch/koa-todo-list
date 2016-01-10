$ '.todo__icon--edit'
  .click (e) ->
    $titleEl = $(@).parent().prev()
    $todoItem = $(@).parents('.todo__item')

    $titleEl.hide()

    $input = $ '<input type="text" />'
    $input.addClass('todo__input').val($titleEl.text())
    $todoItem.prepend $input

    $input.focusout (e) ->
      newTitle = $(@).val()
      id = $todoItem.data('id')

      $(@).remove()
      $titleEl.text(newTitle).show()

      $.ajax
        url: '/todo'
        method: 'PUT'
        data:
          id: id
          title: newTitle

$ '.todo__icon--remove'
  .click (e) ->
    $(@).parents('.todo__item').remove()

    $.ajax
      url: '/todo'
      method: 'DELETE'
      data:
        id: $(@).parents('.todo__item').data('id')

$ '.todo__title'
  .click (e) ->
    completion = !$(@).hasClass('todo__title--completion')
    $(@).toggleClass('todo__title--completion')

    $.ajax
      url: '/todo'
      method: 'PUT'
      data:
        id: $(@).parents('.todo__item').data('id')
        completion: completion
