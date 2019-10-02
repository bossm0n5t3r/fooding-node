$(document).ready(function() {
  getAllStores();

  var mapContainer = document.getElementById("map"), // 지도를 표시할 div
    mapOption = {
      center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
      level: 3 // 지도의 확대 레벨
    };

  // 지도를 생성합니다
  var map = new kakao.maps.Map(mapContainer, mapOption);

  // 주소-좌표 변환 객체를 생성합니다
  var geocoder = new kakao.maps.services.Geocoder();

  // 주소로 좌표를 검색합니다
  geocoder.addressSearch("서울 영등포구 여의도동 84-9", function(
    result,
    status
  ) {
    // 정상적으로 검색이 완료됐으면
    if (status === kakao.maps.services.Status.OK) {
      console.log(result);
      var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

      // 결과값으로 받은 위치를 마커로 표시합니다
      var marker = new kakao.maps.Marker({
        map: map,
        position: coords
      });

      /* // 인포윈도우로 장소에 대한 설명을 표시합니다
      var infowindow = new kakao.maps.InfoWindow({
        content:
          '<div style="width:150px;text-align:center;padding:6px 0;">우리회사</div>'
      });
      infowindow.open(map, marker); */

      // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
      map.setCenter(coords);
    }
  });

  function getAllStores() {
    $.ajax({
      type: "GET",
      url: "/ajax/get-all-stores",
      dataType: "json",
      success: function(msg) {
        $("#store-section").empty();
        $.each(msg.stores, (i, item) => {
          var num = String.fromCharCode(65 + i);
          var store =
            '<div class="store-container border border-dark border-top-0 border-left-0 border-right-0">' +
            '<div class="store-name border border-dark border-top-0 border-left-0 border-right-0">' +
            num +
            ". " +
            item.store_name +
            "</div>" +
            '<div class="store-address bg-light border border-dark border-top-0 border-left-0 border-right-0">' +
            item.store_address +
            "</div>" +
            '<div class="store-time bg-light">' +
            '<div class="store-start-time float-left border border-dark border-top-0 border-left-0 border-bottom-0">' +
            item.store_start_time +
            "</div>" +
            '<div class="store-end-time">' +
            item.store_end_time +
            "</div>" +
            "</div>" +
            "</div>";
          $("#store-section").append(store);
        });
      }
    });
  }
});
