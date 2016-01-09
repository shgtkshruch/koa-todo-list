(function() {
  $('.todo__icon--edit').click(function(e) {
    var $input, $titleEl;
    $titleEl = $(this).prev();
    $titleEl.hide();
    $input = $('<input type="text" />');
    $input.val($titleEl.text());
    $(this).parents('.todo__item').prepend($input);
    return $input.focusout(function(e) {
      var id, newTitle;
      newTitle = $(this).val();
      id = $(this).parents('.todo__item').data('id');
      $(this).remove();
      $titleEl.text(newTitle).show();
      return $.ajax({
        url: '/todo',
        method: 'PUT',
        data: {
          id: id,
          title: newTitle
        }
      });
    });
  });

  $('.todo__icon--remove').click(function(e) {
    return $.ajax({
      url: '/todo',
      method: 'DELETE',
      data: {
        id: $(this).parents('.todo__item').data('id')
      },
      success: function(data, status, xhr) {
        return window.location.reload();
      }
    });
  });

}).call(this);
