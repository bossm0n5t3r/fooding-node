$(document).ready(function() {
  printComments();

  $("#add-comment").click(function() {
    var comment = $("#store-comment")
      .val()
      .trim();
    if (comment.length > 0) {
      var storeId = $("#data-set").data("storeId");
      addComment(comment, storeId);
    } else {
      alert("댓글이 없습니다! 댓글을 입력해주세요!");
    }
  });

  $("#store-comment").keyup(function(e) {
    if (e.keyCode == 13) {
      var comment = $("#store-comment")
        .val()
        .trim();
      if (comment.length > 0) {
        var storeId = $("#data-set").data("storeId");
        addComment(comment, storeId);
      } else {
        alert("댓글이 없습니다! 댓글을 입력해주세요!");
      }
    }
  });

  $(".store-comment-area").on("click", ".store-comment-modify", function() {
    var id = $(this).data("commentId");
    var commentIdTag = "#comment-id-" + id;
    var commentEditTag = "#comment-edit-" + id;
    var beforeComment = $(commentIdTag).text();
    $(commentIdTag).empty();
    var commentModify =
      '<input type="text" class="form-control" id="comment-modify-text-' +
      id +
      '" value="' +
      beforeComment +
      '">\n';
    $(commentIdTag).append(commentModify);
    $(commentEditTag).empty();
    var commentEdit =
      '<a class="store-comment-modify-save" data-comment-id="' +
      id +
      '">저장</a>\n' +
      '<a class="store-comment-modify-cancel" data-comment-id="' +
      id +
      '">취소</a>\n';
    $(commentEditTag).append(commentEdit);
  });

  $(".store-comment-area").on("click", ".store-comment-delete", function() {
    var id = $(this).data("commentId");
    var check = confirm("댓글을 삭제하시겠습니까?");
    if (check) {
      $.ajax({
        type: "GET",
        url: "/ajax/delete-comment",
        dataType: "json",
        data: { commentId: id },
        success: function(msg) {
          if (msg.result) {
            printComments();
          }
        }
      });
    }
  });

  $(".store-comment-area").on(
    "click",
    ".store-comment-modify-save",
    function() {
      var id = $(this).data("commentId");
      var commentTextTag = "#comment-modify-text-" + id;
      var afterComment = $(commentTextTag).val();
      $.ajax({
        type: "POST",
        url: "/ajax/update-comment",
        dataType: "json",
        data: { commentId: id, comment: afterComment },
        success: function(msg) {
          if (msg.result) {
            printComments();
          }
        }
      });
    }
  );

  $(".store-comment-area").on(
    "click",
    ".store-comment-modify-cancel",
    function() {
      var id = $(this).data("commentId");
      var commentTextTag = "#comment-modify-text-" + id;
      var commentIdTag = "#comment-id-" + id;
      var commentEditTag = "#comment-edit-" + id;
      var beforeComment = $(commentTextTag).val();
      $(commentEditTag).empty();
      $(commentIdTag).text(beforeComment);
      var returnTag =
        '<a class="store-comment-modify" data-comment-id="' +
        id +
        '">수정</a>\n' +
        '<a class="store-comment-delete" data-comment-id="' +
        id +
        '">삭제</a>\n';
      $(commentEditTag).empty();
      $(commentEditTag).append(returnTag);
    }
  );

  function addComment(comment, storeId) {
    $.ajax({
      type: "POST",
      url: "/ajax/add-comment",
      dataType: "json",
      data: { comment: comment, storeId: storeId },
      success: function(msg) {
        if (msg.result) {
          $("#store-comment").val("");
          printComments();
        }
      }
    });
  }

  function printComments() {
    var userId = $("#data-set").data("userId");
    var storeId = $("#data-set").data("storeId");
    $.ajax({
      type: "GET",
      url: "/ajax/get-all-comments",
      dataType: "json",
      data: { id: storeId },
      success: function(msg) {
        var count = msg.comments.count;
        $("#count-comments").text("댓글 " + count + "개");
        $(".store-comment-area").empty();
        if (count > 0) {
          $.each(msg.comments.rows, (i, item) => {
            var comment =
              '<div class="store-comment mb-3">\n' +
              '<div class="my-auto">\n' +
              '<img src="' +
              item.user.user_img +
              '" class="store-comment-user-img">\n' +
              "</div>\n" +
              '<div class="store-comment-container">\n' +
              "<strong>" +
              item.user.user_name +
              "</strong>\n" +
              '<div class="store-comment-desc" id="comment-id-' +
              item.id +
              '">' +
              item.store_review_comment +
              "</div>\n";
            if (item.user.id === userId) {
              comment +=
                '<div class="my-auto text-danger" id="comment-edit-' +
                item.id +
                '">\n' +
                '<a class="store-comment-modify" data-comment-id="' +
                item.id +
                '">수정</a>\n' +
                '<a class="store-comment-delete" data-comment-id="' +
                item.id +
                '">삭제</a>\n' +
                "</div>";
            }
            comment += "</div>\n" + "</div>";
            $(".store-comment-area").append(comment);
          });
        } else {
          var commentEmpty = '<p class="mt-5 text-center">댓글이 없습니다.</p>';
          $(".store-comment-area").append(commentEmpty);
        }
      }
    });
  }
});
