/*!
 * Thumbnail Generator
 * http://www.luansemensato.com.br
 *
 * Copyright 2016, Luan Semensato
 * http://www.luansemensato.com.br
 * Released under the MIT license
 */

$(function() {
  // IMAGE
  $("#trigger-save").click(function() { 
    html2canvas($("#thumbnail"), {
      onrendered: function(canvas) {
        var myImage = canvas.toDataURL("image/png");

        // save
        downloadURI("data:" + myImage, "thumbnail.png");

        // open window
        //window.open(myImage);
      }
    });
  });

  // TEXT
  // Title
  $("#trigger-text-1").change(function() {
    $('#get-text-1').text(this.value);
  });

  $("#trigger-text-2").change(function() {
    $('#get-text-2').text(this.value);
  });

  // Preview image
  $("#trigger-image-preview").change(function(){
    $("#thumbnail, .group").removeClass('hidden');
    readURL(this);
  });

  // Options Mask
  $("input[name=mask]:radio").change(function () {
    $("#get-mask").removeClass().addClass('mask-' + this.value);
  });

  // Options Logo
  $("input[name=logo]:radio").change(function () {
    $("#get-logo").removeClass().addClass('logo-' + this.value);
  });

  // INFOS VIA ADMIN
  var imagePub = getUrlParameter('imagem');
  var maskPub  = getUrlParameter('mask');

  if(imagePub){
    // Show elements
    $("#thumbnail, .group").removeClass('hidden');
  }

  // Add Image
  if(imagePub){
    var imgPath = "http://static.massanews.com.br/uploads/noticias/" + imagePub;
    toDataUrl(imgPath, function(base64Img) {
      $('#get-image').attr('src', base64Img);
    });
  }

  // Add mask
  if(maskPub){
    $("#mask-" + maskPub).click();
  }
});

// Convert url image to base64
function toDataUrl(src, callback, outputFormat) {
  var img = new Image();
  img.crossOrigin = 'Anonymous';
  img.onload = function() {
    var canvas = document.createElement('CANVAS');
    var ctx = canvas.getContext('2d');
    var dataURL;
    canvas.height = this.height;
    canvas.width = this.width;
    ctx.drawImage(this, 0, 0);
    dataURL = canvas.toDataURL(outputFormat);
    callback(dataURL);
  };
  img.src = src;
  if (img.complete || img.complete === undefined) {
    img.src = "data:image/png;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
    img.src = src;
  }
}

// Save image - Creating dynamic link that automatically click
function downloadURI(uri, name) {
  var link = document.createElement("a");
  link.download = name;
  link.href = uri;
  link.click();
  //after creating link you should delete dynamic link
  clearDynamicLink(link); 
}

// readURL
function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      $('#get-image').attr('src', e.target.result);
    }

    reader.readAsDataURL(input.files[0]);
  }
}

// getUrlParameter
var getUrlParameter = function getUrlParameter(sParam) {
  var sPageURL = decodeURIComponent(window.location.search.substring(1)),
      sURLVariables = sPageURL.split('&'),
      sParameterName,
      i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? true : sParameterName[1];
    }
  }
};