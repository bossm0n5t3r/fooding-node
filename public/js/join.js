$(document).ready(function() {
  var notIdCheck = true;
  var tmpSaveUserId = '';

  $("#register-inputUserame").keyup(function() {
    var inputUserame = $("#register-inputUserame").val();
    if (inputUserame.length == 0) {
      $("#id-check").css("color", "red");
      $("#id-check").html('아이디를 입력해주세요.');
    } else if (inputUserame.length < 4) {
      $("#id-check").css("color", "red");
      $("#id-check").html('아이디는 4자 이상, 15자 이하입니다.');
    } else if (inputUserame.length > 15) {
      $("#id-check").css("color", "red");
      $("#id-check").html('아이디는 4자 이상, 15자 이하입니다.');
    } else {
      $("#id-check").css("color", "");
      $("#id-check").html('');
    }
  });
  
  $("#id-check-btn").click(function() {
    var inputUserame = $("#register-inputUserame").val();
    if (inputUserame.length == 0) {
      $("#id-check").css("color", "red");
      $("#id-check").html('아이디를 입력해주세요.');
    } else {
      $.post("/ajax/id-check", { user_name: inputUserame }, function(msg) {
        if (msg.result == 1) {
          $("#id-check").css("color", "blue");
          $("#id-check").html(inputUserame + '은(는) 사용할 수 있는 아이디 입니다.');
          notIdCheck = false;
          tmpSaveUserId = inputUserame;
        } else {
          $("#id-check").css("color", "red");
          $("#id-check").html(inputUserame + '은(는) 사용할 수 없는 아이디 입니다.');
        }
      }, 'json');
    }
  });

  $("#registerBtn").click(function() {
    var inputUserame = $("#register-inputUserame").val();
    var inputEmail = $("#register-inputEmail").val();
    var inputPassword = $("#register-inputPassword").val();
    var inputConfirmPassword = $("#register-inputConfirmPassword").val();
    if (inputUserame.length == '') {
      alert('아이디를 입력해주세요.');
    } else if (notIdCheck) {
      alert('아이디 중복체크를 누르세요.');
    } else if (tmpSaveUserId !== inputUserame) {
      notIdCheck = true;
      alert('아이디 중복체크를 누르세요.');
    } else if (inputEmail.length == '') {
      alert('이메일을 입력해주세요.');
    } else if (inputPassword.length == '') {
      alert('비밀번호를 입력해주세요.');
    } else if (inputConfirmPassword.length == '') {
      alert('비밀번호 확인을 입력해주세요.');
    } else if (inputPassword !== inputConfirmPassword) {
      alert('입력된 비밀번호가 서로 다릅니다.');
    } else {
      $("#registerForm").submit();
    }
  });
});