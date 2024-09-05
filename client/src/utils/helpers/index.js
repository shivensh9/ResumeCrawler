const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();

  const daySuffix = (day) => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return `${day}${daySuffix(day)} ${month} ${year}`;
};

export const techStackColors = {
  php: "#787CB5",
  python: "#3572A5",
  javascript: "#F0DB4F",
  java: "#E05151",
  ruby: "#CC342D",
  go: "#00ADD8",
  csharp: "#178600",
  html: "#E34C26",
  css: "#264DE4",
  react: "#61DAFB",
  nodejs: "#83CD29",
  angular: "#DD1B16",
  vue: "#41B883",
  swift: "#FA7343",
  kotlin: "#A97BFF",
  typescript: "#007ACC",
  sql: "#CC2927",
  mongodb: "#47A248",
  postgresql: "#336791",
  mysql: "#4479A1",
  docker: "#2496ED",
  kubernetes: "#326CE5",
  aws: "#FF9900",
  azure: "#0089D6",
  gcp: "#4285F4",
  flutter: "#02569B",
  dart: "#0175C2",
  rust: "#DEA584",
  perl: "#39457E",
  r: "#276DC3",
  matlab: "#FF8C00",
  scala: "#DC322F",
  hadoop: "#FFCC00",
  tensorflow: "#FF6F00",
  pytorch: "#EE4C2C",
  nginx: "#269539",
  apache: "#D22128",
  wordpress: "#21759B",
  drupal: "#0678BE",
  laravel: "#FF2D20",
  symfony: "#000000",
  bootstrap: "#7952B3",
  jquery: "#0769AD",
  svelte: "#FF3E00",
  express: "#000000",
  django: "#092E20",
  flask: "#000000",
  graphql: "#E10098",
  redis: "#DC382D",
  elasticsearch: "#005571",
};

export { formatDate };
