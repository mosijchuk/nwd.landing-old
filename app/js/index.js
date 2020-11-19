new WOW().init();

//forms

const formErrorMessage = (form) => {
  const errorBox = `<div class="alertWrap">
  <div class="alert">
    <div class="icon"></div>
    <span>Something went wrong</span>
  </div>
</div>`;
  $(".formGroupWithAlert").append(errorBox);

  setTimeout(() => {
    $("form").find(".alertWrap").addClass("show");
  }, 100);

  setTimeout(() => {
    $("form").find(".alertWrap").remove();
  }, 7000);
};

$("form").submit(function (event) {
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
    beforeSend: function () {
      $(button).attr("disabled", "disabled");
      $(button).html("<span>Sending...</span>");
      form.find(".alertWrap").remove();
    },
    success: function (responseData) {
      if (responseData.resultCode === 1) {
        window.location.href = "./success-page.html";
      } else {
        formErrorMessage(form);
      }
    },
    error: function () {
      formErrorMessage(form);
    },
    complete: function () {
      $("form").each(function () {
        $(this).trigger("reset");
      });
      $(button).html(buttontext);
      $(button).removeAttr("disabled");
    },
  });
});
//end forms

$('a[href*="#"]').on("click", function (e) {
  e.preventDefault();

  $("html, body").animate(
    {
      scrollTop: $($(this).attr("href")).offset().top,
    },
    500,
    "linear"
  );
});

$("#mobile-nav__toggle").on("click", function () {
  if ($(window).width() < 575 && $("#mobile-nav__toggle").is(":checked")) {
    $(".mobile-nav__btn").css({ position: "fixed" });
  } else {
    $(".mobile-nav__btn").css({ position: "absolute" });
  }
});

$(".mobile-nav__list--item").on("click", function () {
  $(".mobile-nav__btn").css({ position: "absolute" });
  $("#mobile-nav__toggle").prop("checked", false);
});

$(".mobile-nav__button").on("click", function () {
  $(".mobile-nav__btn").css({ position: "absolute" });
  $("#mobile-nav__toggle").prop("checked", false);
});

$(document).ready(function () {
  var preloaderPromise = new Promise(function (resolve, reject) {
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
  preloaderPromise.then(function () {
    $("#main").addClass("loaded");
    $("body").removeClass("loader");
    $("#preload").css("visibility", "hidden");
  });
});

$(document).ready(function () {
  $(window).scroll(function () {
    if ($(this).scrollTop() < 50) {
      $(".content").hide();
    } else {
      $(".content").show();
    }
  });
});

$(document).ready(function () {
  if ($(window).width() > 575) {
    $(window).scroll(function () {
      if ($(this).scrollTop() < 2000) {
        $(".img-reveal").hide();
      } else {
        $(".img-reveal").show();
        $(this).off();
      }
    });
  }
});

(function (w, d, s, l) {
  w[l] = w[l] || [];
  w[l].push({
    "gtm.start": new Date().getTime(),
    event: "gtm.js",
  });
  var f = d.getElementsByTagName(s)[0],
    j = d.createElement(s);
  j.async = true;
  f.parentNode.insertBefore(j, f);
})(window, document, "script", "dataLayer", "GTM-PV9LGPL");

function animateValue(id, start, end, duration) {
  // assumes integer values for start and end

  var obj = document.getElementById(id);
  var range = end - start;
  // no timer shorter than 50ms (not really visible any way)
  var minTimer = 50;
  // calc step time to show all interediate values
  var stepTime = Math.abs(Math.floor(duration / range));

  // never go below minTimer
  stepTime = Math.max(stepTime, minTimer);

  // get current time and calculate desired end time
  var startTime = new Date().getTime();
  var endTime = startTime + duration;
  var timer;

  function run() {
    var now = new Date().getTime();
    var remaining = Math.max((endTime - now) / duration, 0);
    var value = Math.round(end - remaining * range);
    obj.innerHTML = value;
    if (value == end) {
      clearInterval(timer);
    }
  }

  timer = setInterval(run, stepTime);
  run();
}

const calcBase = [
  [
    //front
    [13, 13, 12, 12],
    [32, 30, 29, 29],
    [50, 48, 46, 46],
  ],
  [
    //back
    [13, 13, 12, 12],
    [32, 30, 29, 29],
    [50, 48, 46, 46],
  ],
  [
    //mob
    [13, 13, 12, 12],
    [32, 30, 29, 29],
    [50, 48, 46, 46],
  ],
  [
    //uix
    [13, 13, 12, 12],
    [19, 19, 18, 18],
    [25, 25, 23, 23],
  ],
];

const formCalcVal = () => {
  const rate = $("#calcRate").text();
  if (!$("input[name=calcrate]").length) {
    $("#estimate-project form").append(
      `<input type="hidden" name="calcrate" value="${rate}$">`
    );
  } else {
    $("input[name=calcrate]").val(rate + "$");
  }
};

const calculateRate = () => {
  const calculator = $("#calculator .tabsWrap");

  const s = [];
  calculator.find(".tabsLine").each(function () {
    const target = $(this).data("target");
    const item = $(this).find(".item.active").data("item");

    s.push(target, item);
  });
  const startRate = Number($("#calcRate").text());
  const rate = calcBase[s[1]][s[3]][s[5]];

  animateValue("calcRate", startRate, rate, 500);

  setTimeout(function () {
    formCalcVal();
  }, 700);
};

$("#calculator .tabsLine a.item").click(function (e) {
  e.preventDefault();
  if (!$(this).hasClass("active")) {
    $(this).parent().find("a").removeClass("active");
    $(this).addClass("active");

    calculateRate();
  }
});

$("#calculator .rateButton").click(function () {
  formCalcVal();
});

// fb
$(document).on("click", ".close-btn", function (e) {
  e.preventDefault();
  javascript: parent.$.fancybox.close();
});
$.fancybox.defaults.hideScrollbar = false;

$("a[data-fancybox]").fancybox({
  padding: 0,
  buttons: [],
  animationEffect: "slide-in-out",
  clickSlide: "false",
  touch: false,
  backFocus: false,
  iframe: {
    preload: true,
  },
  helpers: {
    overlay: {
      locked: false,
    },
  },
  defaults: {
    hideScrollbar: false,
  },
});
// end fb

// sm
const getElemHeight = (elem) => $(elem).height();

let scrollMagicController = new ScrollMagic.Controller();

window.onresize = () => {
  if ($(window).width() > 1024) {
    document.location.reload();
  }
};

const sm = () => {
  const w = $(window).width();

  if (w > 1024) {
    const projectInfo = document.getElementsByClassName("portfolio__list-item");
    const portfolioPreview = $(".portfolio__preview");
    const coverItemSel = "portfolio__preview-list-item";
    const worksWrapSel = "#worksWrap";
    const covers = document.getElementsByClassName(coverItemSel);

    const fixCovrs = new ScrollMagic.Scene({
      triggerElement: worksWrapSel,
      triggerHook: 0,
      duration:
        getElemHeight(worksWrapSel) - getElemHeight(".portfolio__preview-list"),
    })
      .on("start", function (ev) {
        if (ev.scrollDirection == "FORWARD") {
          !portfolioPreview.hasClass("coversFixed") &&
            portfolioPreview.addClass("coversFixed");
        }
        if (ev.scrollDirection == "REVERSE") {
          portfolioPreview.hasClass("coversFixed") &&
            portfolioPreview.removeClass("coversFixed");
        }
      })
      .on("end", function (ev) {
        if (ev.scrollDirection == "FORWARD") {
          !portfolioPreview.hasClass("coversBottom") &&
            portfolioPreview.addClass("coversBottom");
        }
        if (ev.scrollDirection == "REVERSE") {
          portfolioPreview.hasClass("coversBottom") &&
            portfolioPreview.removeClass("coversBottom");
        }
      })
      .addTo(scrollMagicController);

    for (let i = 0; i < covers.length; i++) {
      let cover = covers[i];
      cover.style.zIndex = i + 100;
    }

    const coverProgress = (val, i) => {
      TweenMax.to($(`.${coverItemSel}:nth-child(${i})`), 0.5, {
        transform: "translate3d(" + (100 - val * 100) + "%,0,0)",
      });
    };

    for (let i = 0; i < projectInfo.length; i++) {
      var project = projectInfo[i],
        projectFadeIn = TweenMax.to(project, 0.5, {
          css: { opacity: 1 },
        }),
        projectFadeOut = TweenMax.to(project, 0.5, {
          css: { opacity: 0 },
        });

      project.setAttribute("num", i);

      const fadeIn = new ScrollMagic.Scene({
        triggerElement: project,
        triggerHook: 0.8,
        duration: 300,
      })
        .setTween(projectFadeIn)
        .on("progress", function (ev) {
          coverProgress(
            ev.progress,
            +$(ev.target.triggerElement()).attr("num") + 1
          );
        })
        .addTo(scrollMagicController);

      const fadeOut = new ScrollMagic.Scene({
        triggerElement: project,
        triggerHook: 0.2,
        duration: 300,
      })
        .setTween(projectFadeOut)
        .addTo(scrollMagicController);
    }
  }
};

$(document).ready(sm);
//end sm
