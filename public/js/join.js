$(document).ready(function(){
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
    $.post("/ajax/id-check", { user_name: inputUserame }, function(msg) {
      if (msg.result == 1) {
        $("#id-check").css("color", "blue");
        $("#id-check").html(inputUserame + '은(는) 사용할 수 있는 아이디 입니다.');
      } else {
        $("#id-check").css("color", "red");
        $("#id-check").html(inputUserame + '은(는) 사용할 수 없는 아이디 입니다.');
      }
    }, 'json');
  });

  $("#registerBtn").click(function() {
    join();
  });

});

function join() {
  var inputPassword = $("#register-inputPassword").val();
  var inputConfirmPassword = $("#register-inputConfirmPassword").val();
  if (inputPassword !== inputConfirmPassword) {
    alert('비밀번호가 서로 다릅니다.');
  } else {
    $("#registerForm").submit();
  }
};