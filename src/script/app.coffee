$ '.todo__icon--remove'
  .click (e) ->
    $.ajax
      url: '/todo'
      method: 'DELETE'
      data:
        id: $(this).parents('.todo__item').data('id')
      success: (data, status, xhr) ->
        window.location.reload()
