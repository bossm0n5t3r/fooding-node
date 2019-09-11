$(document).ready(function() {
  printComments();

  $("#main-back-btn").click(function() {
    let check = confirm(
      "메인 화면으로 돌아가면 입력된 모든 내용은 취소되고, 지워집니다. 메인화면으로 돌아가시겠습니까?"
    );
    if (check) {
      window.location.href = "http://localhost:8001/main";
    }
  });

  $("#address-btn").click(function() {
    new daum.Postcode({
      oncomplete: function(data) {
        var addr = data.address; // 최종 주소 변수
        // 주소 정보를 해당 필드에 넣는다.
        $("#store-address").val(addr);
      }
    }).open();
  });

  $("#store-regitser-btn").click(function() {
    var storeName = $("#store-name")
      .val()
      .trim();
    var storeAddress = $("#store-address")
      .val()
      .trim();
    var storeStartTime = $("#store-start-time")
      .val()
      .trim();
    var storeEndTime = $("#store-end-time")
      .val()
      .trim();
    var storeMenu1 = $("#store-menu-1")
      .val()
      .trim();
    var storePrice1 = $("#store-price-1")
      .val()
      .trim();
    var storeMenu2 = $("#store-menu-2")
      .val()
      .trim();
    var storePrice2 = $("#store-price-2")
      .val()
      .trim();
    if (storeName.length == 0) {
      alert("가게 이름을 입력해주세요!");
    } else if (storeAddress.length == 0) {
      alert("가게 주소를 입력해주세요!");
    } else if (storeStartTime.length == 0) {
      alert("영업시작시간을 입력해주세요!");
    } else if (storeEndTime.length == 0) {
      alert("영업종료시간을 입력해주세요!");
    } else if (storeMenu1.length == 0) {
      alert("메뉴이름을 입력해주세요!");
    } else if (storePrice1.length == 0) {
      alert("메뉴가격을 입력해주세요!");
    } else if (storeMenu2.length > 0) {
      if (storePrice2.length == 0) {
        alert("메뉴가격을 입력해주세요!");
      }
    } else if (storePrice2.length > 0) {
      if (storeMenu2.length == 0) {
        alert("메뉴이름을 입력해주세요!");
      }
    } else {
      $("#store-register").submit();
    }
  });

  $("#store-modify-btn").click(function() {
    var storeName = $("#store-name")
      .val()
      .trim();
    var storeAddress = $("#store-address")
      .val()
      .trim();
    var storeStartTime = $("#store-start-time")
      .val()
      .trim();
    var storeEndTime = $("#store-end-time")
      .val()
      .trim();
    var storeMenu1 = $("#store-menu-1")
      .val()
      .trim();
    var storePrice1 = $("#store-price-1")
      .val()
      .trim();
    var storeMenu2 = $("#store-menu-2")
      .val()
      .trim();
    var storePrice2 = $("#store-price-2")
      .val()
      .trim();
    if (storeName.length == 0) {
      alert("가게 이름을 입력해주세요!");
    } else if (storeAddress.length == 0) {
      alert("가게 주소를 입력해주세요!");
    } else if (storeStartTime.length == 0) {
      alert("영업시작시간을 입력해주세요!");
    } else if (storeEndTime.length == 0) {
      alert("영업종료시간을 입력해주세요!");
    } else if (storeMenu1.length == 0) {
      alert("메뉴이름을 입력해주세요!");
    } else if (storePrice1.length == 0) {
      alert("메뉴가격을 입력해주세요!");
    } else if (storeMenu2.length > 0) {
      if (storePrice2.length == 0) {
        alert("메뉴가격을 입력해주세요!");
      }
    } else if (storePrice2.length > 0) {
      if (storeMenu2.length == 0) {
        alert("메뉴이름을 입력해주세요!");
      }
    } else {
      $("#store-modify").submit();
    }
  });

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
        console.log({ comments: msg.comments });
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
              '<p class="store-comment-desc">' +
              item.store_review_comment +
              "</p>\n";
            if (item.user.id === userId) {
              comment +=
                '<div class="my-auto text-danger">\n' +
                '<a class="store-comment-modify">수정</a>\n' +
                '<a class="store-comment-delete">삭제</a>\n' +
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
