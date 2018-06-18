$(document).ready(function () {
  $('.alert-success').hide()
  $('.alert-danger').hide()
});

// scrape button //
$("#scrape").on("click", function () {
  $.ajax({
    method: "GET",
    url: "/scrape",
  }).done(function (data) {
    console.log(data)
    window.location = "/"
  })
});

// save article button //
$(".save-button").on("click", function () {
  var thisId = $(this).attr("data-id");
  $.ajax({
    method: "POST",
    url: "/articles/save/" + thisId
  }).done(function (data) {
    $(".alert-success").fadeIn('slow').animate({ opacity: 1.0 }, 1500).effect("pulsate", { times: 2 }, 800).fadeOut('slow');
    window.location = "/"
  })
});

// delete article from saved // 
$(".delete-art").on("click", function () {
  var thisId = $(this).attr("data-id");
  $.ajax({
    method: "POST",
    url: "/articles/delete/" + thisId
  }).done(function (data) {
    window.location.reload()
    window.location = "/saved"
  })
});

// save note button //
$(".save-note").on("click", function () {
  var thisId = $(this).attr("data-id");
  if ($("#note-content-" + thisId).val() == "") {
    alert("Note cannot be blank!")
  } else {
    $.ajax({
      method: "POST",
      url: "/notes/save/" + thisId,
      data: {
        text: $("#note-content-" + thisId).val()
      }
    }).done(function (data) {
      console.log(data);
      $("#note-content-" + thisId).val("");
      $(".note-modal").modal("hide");
      window.location = "/saved"
    });
  }
});

//Handle Delete Note button
$(".delete-note").on("click", function () {
  var noteId = $(this).attr("data-note-id");
  var articleId = $(this).attr("data-article-id");
  $.ajax({
    method: "DELETE",
    url: "/notes/delete/" + noteId + "/" + articleId
  }).done(function (data) {
    console.log(data)
    $(".modalNote").modal("hide");
    window.location = "/saved"
  })
});
