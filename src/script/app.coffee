$ '.todo__icon--edit'
  .click (e) ->
    $titleEl = $(@).prev()

    $titleEl.hide()

    $input = $ '<input type="text" />'
    $input.val $titleEl.text()
    $(@).parents('.todo__item').prepend $input

    $input.focusout (e) ->
      newTitle = $(@).val()
      id = $(@).parents('.todo__item').data('id')

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
