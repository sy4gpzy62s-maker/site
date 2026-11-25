/* ==========================================================
   მოსწავლეთა ნამუშევრები / Student submissions
   ----------------------------------------------------------
   1) Fill the "label" of each type (used for filter buttons).
   2) To add a work: copy the template below, paste it inside
      the SUBMISSIONS list, fill it in, save. That's all.

   TEMPLATE (copy this object, add a comma between objects):
   {
     id: "",          // unique, latin letters/numbers/dashes, e.g. "work-1"
     type: "",        // one of: research | essay | presentation | poster | info
     title: "",
     student: "",
     class: "",       // optional (grade/class)
     date: "",        // optional
     cover: "",       // e.g. "assets/covers/work-1.jpg" (optional)
     summary: "",     // optional, used by search
     tags: [],        // optional, used by search
     content: "",     // full text, HTML allowed: "<p>...</p><h2>...</h2>"
     embed: "",       // optional: iframe URL (Google Slides, PDF viewer, YouTube...)
     files: [         // optional downloads
       { label: "", url: "assets/files/work-1.pdf" }
     ]
   }
   ========================================================== */
window.SUBMISSION_TYPES = [
  { id: "research",     icon: "research",     label: "" },
  { id: "essay",        icon: "essay",        label: "" },
  { id: "presentation", icon: "presentation", label: "" },
  { id: "poster",       icon: "poster",       label: "" },
  { id: "info",         icon: "info",         label: "" }
];

window.SUBMISSIONS = [
  // add works here
];
