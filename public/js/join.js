$(document).ready(function(){
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