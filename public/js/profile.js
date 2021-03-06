$(document).ready(function() {
  getStoreName();

  $("#main-back-btn").click(function() {
    let check = confirm(
      "메인 화면으로 돌아가면 모든 내용은 지워집니다. 메인화면으로 돌아가시겠습니까?"
    );
    if (check) {
      window.location.href = "http://localhost:8001/main";
    }
  });

  $("#profile-edit-btn").click(function() {
    var inputPassword = $("#profile-inputPassword")
      .val()
      .trim();
    var inputConfirmPassword = $("#profile-inputConfirmPassword")
      .val()
      .trim();
    if (inputPassword !== inputConfirmPassword) {
      alert("비밀번호가 서로 일치하지 않습니다.");
    } else if (inputPassword.length > 15) {
      alert("비밀번호가 너무 깁니다.");
    } else if (inputPassword.length > 0) {
      $("#profile").submit();
    }
  });

  $("#user-delete-btn").click(function() {
    let check = confirm(
      "탈퇴하면 모든 내용은 지워집니다. 회원 탈퇴하시겠습니까?"
    );
    if (check) {
      var userId = $("#data-set").data("userId");
      $.ajax({
        type: "DELETE",
        url: "/ajax/user-delete",
        dataType: "json",
        data: { id: userId }
      });
    }
  });

  $("#store-name").on("click", "#store-delete-btn", function() {
    var confirmCheck = confirm(
      "정말 가게를 삭제하시겠습니까? 삭제되면 복구되지 않습니다."
    );
    if (confirmCheck) {
      var storeId = $("#data-set").data("storeId");
      $.ajax({
        type: "GET",
        url: "/ajax/store-delete",
        dataType: "json",
        data: { id: storeId },
        success: function(msg) {
          if (msg.result == 1) {
            alert("가게가 삭제되었습니다!");
            getStoreName();
          }
        }
      });
    }
  });

  function getStoreName() {
    var storeId = $("#data-set").data("storeId");
    $.ajax({
      type: "GET",
      url: "/ajax/get-store-name",
      dataType: "json",
      success: function(msg) {
        if (msg.result) {
          $("#store-name").empty();
          var storeName =
            '<a href="/store/?id=' +
            storeId +
            '"><span class="align-middle">' +
            msg.name +
            "</span></a>\n" +
            '<div class="btn-group float-right">\n' +
            '<a href="/store-modify/?id=' +
            storeId +
            '"><button type="button" class="btn btn-info btn-sm">가게수정</button></a>\n' +
            '<button type="button" class="btn btn-danger btn-sm" id="store-delete-btn">가게삭제</button>\n' +
            "</div>";
          $("#store-name").append(storeName);
        } else {
          $("#store-name").empty();
          var addStore =
            '<a href="/store-register"><span>등록된 가게가 없습니다. 만드실래요?</span></a>';
          $("#store-name").append(addStore);
        }
      }
    });
  }
});
