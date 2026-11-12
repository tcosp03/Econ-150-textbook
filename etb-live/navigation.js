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

  function init() {
    if (!document.body || document.querySelector(".etb-nav")) return;

    var style = document.createElement("style");
    style.textContent = [
      ".etb-nav{position:fixed;left:0;right:0;bottom:0;z-index:1000;background:rgba(255,255,255,.97);border-top:1px solid #dce3ea;box-shadow:0 -1px 5px rgba(26,58,92,.12);backdrop-filter:blur(8px);font-family:Arial,sans-serif}",
      "body{padding-bottom:60px!important}",
      "body:has(.etb-nav) .etb-ap{bottom:51px}",
      ".etb-nav-inner{width:100%;max-width:740px;margin:0 auto;display:flex;align-items:center;justify-content:center;flex-wrap:nowrap;gap:10px;padding:8px 12px}",
      ".etb-nav a{display:inline-flex;align-items:center;justify-content:center;min-height:34px;padding:0 11px;border:1px solid #d6e0e8;border-radius:6px;color:#1a3a5c;background:#fff;font-size:12px;font-weight:700;text-decoration:none;white-space:nowrap}",
      ".etb-nav a:hover,.etb-nav a:focus{background:#eef4fb;border-color:#9aaebe;outline:none}",
      ".etb-nav .etb-nav-disabled{color:#aab4bd;background:#f7f9fb;border-color:#e5eaee}",
      ".etb-nav-jump{display:flex;align-items:center;gap:8px;flex:1;min-width:0}",
      ".etb-nav-jump-label{color:#4f5f72;font-size:12px;font-weight:400;white-space:nowrap}",
      ".etb-nav-jump select{height:34px;width:230px;min-width:230px;max-width:230px;flex:0 0 230px;padding:0 8px;border:1px solid #cfd8e2;border-radius:6px;background:#fff;color:#111820;font:12px Arial,sans-serif}",
      ".etb-nav-jump select:focus-visible{outline:3px solid #b9d0df;outline-offset:2px}",
      ".etb-nav-jump button{height:34px;min-width:42px;padding:0 9px;border:1px solid #172436;border-radius:6px;background:#fff;color:#111820;font:700 12px Arial,sans-serif;cursor:pointer}",
      ".etb-nav-jump button:hover,.etb-nav-jump button:focus-visible{background:#f1f5f8;outline:none}",
      "@media(max-width:760px){.etb-nav-inner{gap:6px;padding:7px 8px}.etb-nav a{padding:0 7px;font-size:11px}.etb-nav-jump-label{display:none}.etb-nav-jump select{height:32px;width:180px;min-width:180px;max-width:180px;font-size:11px;padding:0 6px}.etb-nav-jump button{height:32px;min-width:38px;font-size:11px;padding:0 7px}}"
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
      '<form class="etb-nav-jump" aria-label="Jump to a chapter" onsubmit="if(this.chapter.value) location.href=this.chapter.value; return false;">' +
      '' +
      '<select id="etb-nav-chapter" name="chapter" required><option value="">Jump to a Chapter</option>' + makeOptions() + '</select>' +
      '<button type="submit">Go</button>' +
      '</form>' + next + '<button class="etb-nav-dashboard" type="button">Dashboard</button></div>';
    var dashboardButton = nav.querySelector(".etb-nav-dashboard");
    if (dashboardButton) dashboardButton.addEventListener("click", function () {
      if (typeof window.__etbCh17DashboardToggle === "function") window.__etbCh17DashboardToggle();
    });
    document.body.insertBefore(nav, document.body.firstChild);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
