$ '.todo__icon--edit'
  .click (e) ->
    $titleEl = $(@).prev()
    $todoItem = $(@).parents('.todo__item')

    $titleEl.hide()

    $input = $ '<input type="text" />'
    $input.val $titleEl.text()
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
    $.ajax
      url: '/todo'
      method: 'DELETE'
      data:
        id: $(@).parents('.todo__item').data('id')
      success: (data, status, xhr) ->
        window.location.reload()

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
