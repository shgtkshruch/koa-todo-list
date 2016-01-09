$('.remove').click(function (e) {
  $.ajax({
    url: '/todo',
    method: 'DELETE',
    data: {id: $(this).data('id')},
    success: function (data, status, xhr) {
      window.location.reload();
    }
  });
});
