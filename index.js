(function() {
  var to = 0;
  var mot =0;
  var mdd=0;

  "use strict";

  let btn    = document.getElementById("btn"),
      canvas = document.getElementById("canvas"),
      ctx    = canvas.getContext("2d");

  navigator.getUserMedia({
    audio: true
  }, _handleSuccess, _handleError);

  function _handleSuccess(evt) {
    btn.addEventListener("click", () => {
      _handleClick(evt);
    }, false);
  }

  function _handleError() {
    alert("Error!");
  }

  function _handleClick(evt) {
    let LENGTH   = 16,
    audioCtx = new (window.AudioContext || window.webkitAudioContext)(),
    options  = {
      mediaStream : evt
    },
    src      = audioCtx.createMediaStreamSource(evt),
    analyser = audioCtx.createAnalyser(evt),
    data   = new Uint8Array(LENGTH),
    w      = 0,
    i      = 0;

    btn.classList.add("off");
    analyser.fftSize = 1024;
    analyser.smoothingTimeConstant = 0.05;
    src.connect(analyser);
    var da = new Date();

    setInterval(() => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.fillStyle = "#3e3e3e";
      w = canvas.width / LENGTH,
      analyser.getByteFrequencyData(data);
      to=0;

      for (i = 0; i < LENGTH; ++i) {
        if(to<data[i]){
          to=data[i];
        }
      }

      if(to-mot>33){
        mdd=mdd+1;
      }

      mot=to;

      var dj = new Date();
      var pp =dj.getTime()-da.getTime();
      ctx.rect(0, canvas.height - 100, to, 100);
      ctx.font= 'bold 70px Century Gothic';
      ctx.fillText(mdd+"回",60,260);
      ctx.fillText(String(parseInt(pp/1000/60))+":"+String(parseInt(pp/1000)%60)+":"+String(parseInt(pp/100)%10),60,100);
      ctx.fill();
    }, 0);
  }
})();
