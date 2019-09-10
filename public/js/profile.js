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
    } else {
      $("#profile").submit();
    }
  });

  $("#store-delete-btn").click(function() {
    var confirmCheck = confirm(
      "정말 가게를 삭제하시겠습니까? 삭제되면 복구되지 않습니다."
    );
    if (confirmCheck) {
      var storeId = $("#user-storeId")
        .val()
        .trim();
      $.post(
        "/ajax/store-delete",
        { id: storeId },
        function(msg) {
          if (msg.result == 1) {
            alert("가게가 삭제되었습니다!");
            location.reload();
          }
        },
        "json"
      );
    }
  });

  function getStoreName() {
    var storeId = $("#data-set").data("storeId");
    if (parseInt(storeId) > 0) {
      $.post(
        "/ajax/get-store-name",
        { id: storeId },
        function(msg) {
          if (msg.result) {
            $("#storeName").html(msg.result);
          }
        },
        "json"
      );
    }
  }
});
