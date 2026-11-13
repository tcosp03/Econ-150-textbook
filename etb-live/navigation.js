/* Approval prototype: chapter navigation with the landing-page chapter picker. */
(function () {
  "use strict";

  var chapters = [
    { file: "introduction.html", label: "Introduction: The Wealth of Nations" },
    { file: "how-to-get-the-most-out-of-this-book.html", label: "How to Get the Most Out of This Book" },
    { file: "Chapter0.html", label: "Algebra Review" },
    { file: "Chapter1.html", label: "Thinking Like an Economist" },
    { file: "Chapter2.html", label: "Consumer Choice" },
    { file: "Chapter3.html", label: "Supply and Demand I: The Price System" },
    { file: "Chapter4.html", label: "Supply and Demand II: Shifts, Shocks, and Price Controls" },
    { file: "Chapter5.html", label: "Trade, Specialization, and Efficiency" },
    { file: "Chapter6.html", label: "Welfare Analysis" },
    { file: "Chapter7.html", label: "Intervention Distortions I: Taxes, Subsidies, and Incidence" },
    { file: "Chapter8.html", label: "Gains from Trade: The Case for International Cooperation" },
    { file: "Chapter9.html", label: "Firm Model I: Costs" },
    { file: "Chapter10.html", label: "Firm Model II: Short-Run Decisions" },
    { file: "Chapter11.html", label: "Firm Model III: Long-Run Decisions" },
    { file: "Chapter12.html", label: "Factor Markets" },
    { file: "Chapter13.html", label: "Labor Markets and Discrimination" },
    { file: "Chapter14.html", label: "Unit Capstone: The Free Market Prescription for Poverty" },
    { file: "Chapter15.html", label: "Elasticity" },
    { file: "Chapter16.html", label: "Institutions" },
    { file: "Chapter17.html", label: "Market Failures I: Externalities" },
    { file: "Chapter18.html", label: "Market Failures II: The Tragedy of the Commons" },
    { file: "Chapter19.html", label: "Market Failures III: Taxes, Subsidies, and Incentives" },
    { file: "Chapter20.html", label: "Unit Capstone: The Economics of Healthcare" },
    { file: "Chapter21.html", label: "Market Power I: Monopoly" },
    { file: "Chapter22.html", label: "Market Power II: Addressing Market Power" },
    { file: "Chapter23.html", label: "Imperfect Competition I: Monopolistic Competition" },
    { file: "Chapter24.html", label: "Imperfect Competition II: Oligopoly, Cartels, and Collusion" },
    { file: "Chapter25.html", label: "Behavioral Economics" },
    { file: "Chapter26.html", label: "The Case for (and Limits of) Markets" }
  ];

  var groups = [
    { label: "The Opening Pages", start: 0, end: 2, prefix: ["i", "ii", "iii"] },
    { label: "Unit 1 · The Case for the Market", start: 3, end: 10 },
    { label: "Unit 2 · The Logic of Competition", start: 11, end: 16 },
    { label: "Unit 3 · The Critique of the Market", start: 17, end: 22 },
    { label: "Unit 4 · When Competition Breaks Down", start: 23, end: 28 }
  ];

  function pageName(name) { return (name || "index.html").toLowerCase().replace(/\.html$/, ""); }
  var current = pageName(window.location.pathname.split("/").pop());
  var index = -1;
  chapters.forEach(function (chapter, i) {
    if (pageName(chapter.file) === current) index = i;
  });
  if (index < 0) return;

  function optionLabel(item, i) {
    if (i === 0) return "i. " + item.label;
    if (i === 1) return "ii. " + item.label;
    if (i === 2) return "iii. " + item.label;
    if (i === 3) return "1. " + item.label;
    return (i - 2) + ". " + item.label;
  }

  function makeOptions() {
    return groups.map(function (group) {
      var html = '<optgroup label="' + group.label + '">';
      for (var i = group.start; i <= group.end; i++) {
        html += '<option value="' + chapters[i].file + '">' + optionLabel(chapters[i], i) + '</option>';
      }
      return html + "</optgroup>";
    }).join("");
  }

  function makeCustomOptions() {
    return groups.map(function (group) {
      var html = '<div class="etb-nav-unit" role="presentation">' + group.label + '</div>';
      for (var i = group.start; i <= group.end; i++) {
        html += '<button type="button" class="etb-nav-option" data-value="' + chapters[i].file + '">' + optionLabel(chapters[i], i) + '</button>';
      }
      return html;
    }).join("");
  }

  function init() {
    if (!document.body || document.querySelector(".etb-nav")) return;

    var style = document.createElement("style");
    style.textContent = [
      ".etb-nav{position:fixed;left:0;right:0;bottom:0;z-index:1000;background:rgba(255,255,255,.97);border-top:1px solid #dce3ea;box-shadow:0 -1px 5px rgba(26,58,92,.12);backdrop-filter:blur(8px);font-family:Arial,sans-serif}",
      "body{padding-bottom:60px!important}",
      "body:has(.etb-nav) .etb-ap{bottom:51px}",
      ".etb-nav-inner{width:100%;max-width:740px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;flex-wrap:nowrap;gap:8px;padding:8px 12px}",
      ".etb-nav a{display:inline-flex;align-items:center;justify-content:center;min-height:34px;padding:0 11px;border:1px solid #d6e0e8;border-radius:6px;color:#1a3a5c;background:#fff;font-size:12px;font-weight:700;text-decoration:none;white-space:nowrap}",
      ".etb-nav a:hover,.etb-nav a:focus{background:#eef4fb;border-color:#9aaebe;outline:none}",
      ".etb-nav .etb-nav-disabled{color:#aab4bd;background:#f7f9fb;border-color:#e5eaee}",
      ".etb-nav-jump{display:flex;align-items:center;gap:8px;flex:0 1 230px;min-width:0}",
      ".etb-nav-jump-label{color:#4f5f72;font-size:12px;font-weight:400;white-space:nowrap}",
      ".etb-nav-jump select{height:34px;width:230px;min-width:230px;max-width:230px;flex:0 0 230px;padding:0 8px;border:1px solid #cfd8e2;border-radius:6px;background:#fff;color:#111820;font:400 12px Arial,sans-serif}.etb-nav-jump select.placeholder{color:#1a3a5c}.etb-nav-jump select option,.etb-nav-jump select optgroup{font-family:Arial,sans-serif;font-size:12px;line-height:1.2}.etb-nav-jump select option{font-weight:400}.etb-nav-jump select optgroup{font-weight:700}",
      ".etb-nav-jump select:focus-visible{outline:3px solid #b9d0df;outline-offset:2px}",
      ".etb-nav-jump button{height:34px;min-width:42px;padding:0 9px;border:1px solid #172436;border-radius:6px;background:#1a3a5c;color:#fff;font:700 12px Arial,sans-serif;cursor:pointer}",
      ".etb-nav-jump button:hover,.etb-nav-jump button:focus-visible{background:#294e72;outline:none}",
      "@media(max-width:760px){.etb-nav-inner{justify-content:flex-start;gap:6px;padding:7px 8px;overflow-x:auto}.etb-nav a{padding:0 7px;font-size:11px}.etb-nav-jump-label{display:none}.etb-nav-jump select{height:32px;width:180px;min-width:180px;max-width:180px;font:400 11px Arial,sans-serif;padding:0 6px;background:#fff;color:#111820}.etb-nav-jump button{height:32px;min-width:38px;font-size:11px;padding:0 7px}}",
      ".etb-nav-custom{position:relative;flex:0 1 230px;min-width:0}",
      ".etb-nav-select-button{display:flex;align-items:center;justify-content:space-between;width:230px;height:34px;padding:0 8px;border:1px solid #cfd8e2;border-radius:6px;background:#fff;color:#1a3a5c;font:700 12px Arial,sans-serif;cursor:pointer;text-align:left}",
      ".etb-nav-select-button.placeholder{color:#1a3a5c}",
      ".etb-nav-select-chevron{display:flex;align-items:center;height:100%;font-size:15px;line-height:1;margin-left:auto}",
      ".etb-nav-select-menu{display:none;position:absolute;left:0;bottom:calc(100% + 6px);width:230px;max-height:420px;overflow-y:auto;padding:4px 0;background:#fff;border:1px solid #cfd8e2;border-radius:6px;box-shadow:0 8px 22px rgba(26,58,92,.22);z-index:1100}",
      ".etb-nav-custom.open .etb-nav-select-menu{display:block}",
      ".etb-nav-unit{padding:7px 12px 4px;color:#1a3a5c;font:700 12px/1.2 Arial,sans-serif}",
      ".etb-nav-option{display:block;width:100%;padding:5px 12px;border:0;background:#fff;color:#1a3a5c;font:400 12px/1.2 Arial,sans-serif;text-align:left;cursor:pointer}",
      ".etb-nav-option:hover,.etb-nav-option:focus{background:#eef4fb;outline:none}",
      "@media(max-width:760px){.etb-nav-custom{flex:0 0 180px}.etb-nav-select-button{width:180px;height:32px;font-size:11px}.etb-nav-select-menu{width:180px}.etb-nav-unit{font-size:11px}.etb-nav-option{font-size:11px;padding:5px 8px}}"
    ].join("");
    document.head.appendChild(style);

    var previous = index > 0
      ? '<a href="' + chapters[index - 1].file + '" aria-label="Go to ' + chapters[index - 1].label + '">← Previous</a>'
      : '<span class="etb-nav etb-nav-disabled" aria-disabled="true">← Previous</span>';
    var next = index < chapters.length - 1
      ? '<a href="' + chapters[index + 1].file + '" aria-label="Go to ' + chapters[index + 1].label + '">Next →</a>'
      : '<span class="etb-nav-disabled" aria-disabled="true">Next →</span>';

    var nav = document.createElement("nav");
    nav.className = "etb-nav";
    nav.setAttribute("aria-label", "Textbook chapter navigation");
    nav.innerHTML = '<div class="etb-nav-inner">' + previous +
      '<div class="etb-nav-custom" aria-label="Jump to a chapter">' +
      '<button type="button" class="etb-nav-select-button placeholder" aria-expanded="false" aria-controls="etb-nav-menu">Jump to a Chapter <span class="etb-nav-select-chevron" aria-hidden="true">⌄</span></button>' +
      '<div id="etb-nav-menu" class="etb-nav-select-menu" role="menu">' + makeCustomOptions() + '</div>' +
      '</div>' + next + '</div>';
    var picker = nav.querySelector(".etb-nav-custom");
    var trigger = nav.querySelector(".etb-nav-select-button");
    var menu = nav.querySelector(".etb-nav-select-menu");
    function setMenu(open) {
      picker.classList.toggle("open", open);
      trigger.classList.toggle("open", open);
      trigger.setAttribute("aria-expanded", String(open));
    }
    trigger.addEventListener("click", function (event) {
      event.stopPropagation();
      setMenu(!picker.classList.contains("open"));
    });
    menu.querySelectorAll(".etb-nav-option").forEach(function (option) {
      option.addEventListener("click", function () {
        window.location.href = option.getAttribute("data-value");
      });
    });
    document.addEventListener("click", function () { setMenu(false); });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") setMenu(false);
    });
    document.body.insertBefore(nav, document.body.firstChild);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
