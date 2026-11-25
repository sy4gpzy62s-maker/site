/* ==========================================================
   ყველა ტექსტი ამ ფაილშია. ჩაწერე ტექსტი ბრჭყალებს შორის.
   All site text lives here. Fill the empty "" strings.
   showPlaceholders: true  -> empty areas show soft grey bars
   showPlaceholders: false -> empty areas are hidden (use when finished)
   ========================================================== */
window.SITE = {
  showPlaceholders: true,

  name: "",          // site name (shown in header, footer, browser tab)
  logo: "",          // optional logo path, e.g. "assets/logo.svg"

  nav: { home: "მთავარი გვერდი", submissions: "მოსწავლეთა ნამუშევრები" },

  hero: { title: "", subtitle: "", cta: "" },

  intro: {
    title: "",
    p: ["", "", ""],
    values: [
      { title: "", text: "" },
      { title: "", text: "" },
      { title: "", text: "" },
      { title: "", text: "" }
    ]
  },

  cta: { title: "", text: "" },

  submissions: { title: "", subtitle: "", noResults: "" },

  ui: {
    searchPlaceholder: "",   // search box hint
    all: "",                 // "all" filter label
    open: "",                // card button label
    back: "",                // back button on article page
    menu: "",                // accessible label of the mobile menu button
    notFound: ""             // shown when an article id is not found
  },

  footer: { about: "", contactTitle: "", contact: ["", "", ""], bottom: "" }
};
