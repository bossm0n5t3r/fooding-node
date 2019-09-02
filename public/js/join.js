$(document).ready(function() {
  var notIdCheck = true;
  var notEmailCheck = true;

  $("#register-inputUserame").keyup(function() {
    var inputUserame = $("#register-inputUserame")
      .val()
      .trim();
    if (inputUserame.length == 0) {
      $("#id-check").css("color", "red");
      $("#id-check").html("아이디를 입력해주세요.");
    } else if (inputUserame.length < 4) {
      $("#id-check").css("color", "red");
      $("#id-check").html("아이디는 4자 이상, 15자 이하입니다.");
    } else if (inputUserame.length > 15) {
      $("#id-check").css("color", "red");
      $("#id-check").html("아이디는 4자 이상, 15자 이하입니다.");
    } else {
      idCheck();
    }
  });

  $("#register-inputEmail").keyup(function() {
    var inputEmail = $("#register-inputEmail")
      .val()
      .trim();
    if (inputEmail.includes("@")) {
      emailCheck();
    }
  });

  $("#registerBtn").click(function() {
    var inputUserame = $("#register-inputUserame")
      .val()
      .trim();
    var inputEmail = $("#register-inputEmail")
      .val()
      .trim();
    var inputPassword = $("#register-inputPassword")
      .val()
      .trim();
    var inputConfirmPassword = $("#register-inputConfirmPassword")
      .val()
      .trim();
    if (inputUserame.length == "") {
      alert("아이디를 입력해주세요.");
    } else if (notIdCheck) {
      alert("아이디를 다시 확인해주세요.");
    } else if (notEmailCheck) {
      alert("이메일을 다시 확인해주세요.");
    } else if (inputEmail.length == "") {
      alert("이메일을 입력해주세요.");
    } else if (inputPassword.length == "") {
      alert("비밀번호를 입력해주세요.");
    } else if (inputConfirmPassword.length == "") {
      alert("비밀번호 확인을 입력해주세요.");
    } else if (inputPassword !== inputConfirmPassword) {
      alert("입력된 비밀번호가 서로 다릅니다.");
    } else {
      $("#registerForm").submit();
    }
  });

  function idCheck() {
    var inputUserame = $("#register-inputUserame")
      .val()
      .trim();
    if (inputUserame.length == 0) {
      $("#id-check").css("color", "red");
      $("#id-check").html("아이디를 입력해주세요.");
    } else {
      $.post(
        "/ajax/id-check",
        { user_name: inputUserame },
        function(msg) {
          if (msg.result == 1) {
            $("#id-check").css("color", "");
            $("#id-check").html("");
            notIdCheck = false;
          } else {
            $("#id-check").css("color", "red");
            $("#id-check").html(
              inputUserame + "은(는) 사용할 수 없는 아이디 입니다."
            );
            notIdCheck = true;
          }
        },
        "json"
      );
    }
  }

  function emailCheck() {
    var inputEmail = $("#register-inputEmail")
      .val()
      .trim();
    if (inputEmail.length == 0) {
      $("#email-check").css("color", "red");
      $("#email-check").html("이메일을 입력해주세요.");
    } else {
      $.post(
        "/ajax/email-check",
        { user_email: inputEmail },
        function(msg) {
          if (msg.result == 1) {
            $("#email-check").css("color", "");
            $("#email-check").html("");
            notEmailCheck = false;
          } else {
            $("#email-check").css("color", "red");
            $("#email-check").html("이미 가입된 이메일 입니다.");
            notEmailCheck = true;
          }
        },
        "json"
      );
    }
  }
});
