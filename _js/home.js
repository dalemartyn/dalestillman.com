function init() {
  const sections = Array.from(document.querySelectorAll(".js-section"));
  // const colors = [
  //   [199, 228, 235],
  //   [189, 219, 195],
  //   [253, 229, 155]
  // ];

  const colors = [
    [55, 68, 93],
    [50, 93, 59],
    [119, 49, 74],
  ];
  const wrap = document.getElementById("wrap");

  function setBackground(i) {
    const hsl = colors[i].join(",");
    console.log(hsl);
    wrap.style.backgroundColor = `rgb(${hsl})`;
  }

  function onScroll() {
    const y = window.scrollY;
    const h = window.innerHeight;
    const rects = getRects();

    const res = rects.map(function(rect, i) {
      const below = (h - rect.bottom) < 0 ? Math.round((h - rect.bottom) * -100 / rect.height) : 0;
      const above = rect.top < 0 ? Math.round(rect.top * -100 / rect.height) : 0;
      let onscreen = 100 - above - below;
      onscreen = onscreen > 0 ? onscreen : 0;
      if (onscreen === 100) {
        setBackground(i);
      }
      console.log(rect);
      return {
        i,
        h,
        above,
        below,
        onscreen
      };
    });

    // console.table(res);

  }

  function getRects() {
    return sections.map(function(section) {
      return section.getBoundingClientRect();
    });
  }

  window.addEventListener("scroll", onScroll)
}



document.addEventListener("DOMContentLoaded", init);
