new WOW().init();

//forms

const formErrorMessage = form => {
  const errorBox = `<div class="alertWrap">
  <div class="alert">
    <div class="icon"></div>
    <span>Something went wrong</span>
  </div>
</div>`;
  $(".formGroupWithAlert").append(errorBox);

  setTimeout(() => {
    $("form")
      .find(".alertWrap")
      .addClass("show");
  }, 100);

  setTimeout(() => {
    $("form")
      .find(".alertWrap")
      .remove();
  }, 7000);
};

$("form").submit(function(event) {
  event.preventDefault();
  const data = $(this).serialize();
  const button = $(this).find("[type=submit]");
  const buttontext = button.html();
  const form = $(this);

  const url = "./forms/mail.php";
  $.ajax({
    url: url,
    type: "POST",
    data: data,
    cache: false,
    beforeSend: function() {
      $(button).attr("disabled", "disabled");
      $(button).html("<span>Sending...</span>");
      form.find(".alertWrap").remove();
    },
    success: function(responseData) {
      if (responseData.resultCode === 1) {
        window.location.href = "./success-page.html";
      } else {
        formErrorMessage(form);
      }
    },
    error: function() {
      formErrorMessage(form);
    },
    complete: function() {
      $("form").each(function() {
        $(this).trigger("reset");
      });
      $(button).html(buttontext);
      $(button).removeAttr("disabled");
    }
  });
});
//end forms

$('a[href*="#"]').on("click", function(e) {
  e.preventDefault();

  $("html, body").animate(
    {
      scrollTop: $($(this).attr("href")).offset().top
    },
    500,
    "linear"
  );
});

$("#mobile-nav__toggle").on("click", function() {
  if ($(window).width() < 575 && $("#mobile-nav__toggle").is(":checked")) {
    $(".mobile-nav__btn").css({ position: "fixed" });
  } else {
    $(".mobile-nav__btn").css({ position: "absolute" });
  }
});

$(".mobile-nav__list--item").on("click", function() {
  $(".mobile-nav__btn").css({ position: "absolute" });
  $("#mobile-nav__toggle").prop("checked", false);
});

$(".mobile-nav__button").on("click", function() {
  $(".mobile-nav__btn").css({ position: "absolute" });
  $("#mobile-nav__toggle").prop("checked", false);
});

$(document).ready(function() {
  var preloaderPromise = new Promise(function(resolve, reject) {
    if ($("html, body").scrollTop() !== 0) {
      window.scrollTo(0, 0);
      $("*").removeClass("visible");
      $("*").removeClass("loaded");
      $("#preload").addClass("hidden");
      resolve();
    } else {
      $("#preload").addClass("hidden");
      resolve();
    }
  });
  preloaderPromise.then(function() {
    $("#main").addClass("loaded");
    $("body").removeClass("loader");
    $("#preload").css("visibility", "hidden");
  });
});

$(document).ready(function() {
  $(window).scroll(function() {
    if ($(this).scrollTop() < 50) {
      $(".content").hide();
    } else {
      $(".content").show();
    }
  });
});

$(document).ready(function() {
  if ($(window).width() > 575) {
    $(window).scroll(function() {
      if ($(this).scrollTop() < 2000) {
        $(".img-reveal").hide();
      } else {
        $(".img-reveal").show();
        $(this).off();
      }
    });
  }
});

(function(w, d, s, l) {
  w[l] = w[l] || [];
  w[l].push({
    "gtm.start": new Date().getTime(),
    event: "gtm.js"
  });
  var f = d.getElementsByTagName(s)[0],
    j = d.createElement(s);
  j.async = true;
  f.parentNode.insertBefore(j, f);
})(window, document, "script", "dataLayer", "GTM-PV9LGPL");
