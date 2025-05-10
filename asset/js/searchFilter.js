document.addEventListener("DOMContentLoaded", () => {
  const data = [
    { title: "JavaScript Fundamentals", category: "development", startTime: "2025-05-05T09:00", deadline: "2025-05-07T17:00" },
    { title: "Figma Design Basics", category: "design", startTime: "2025-05-06T10:00", deadline: "2025-05-08T16:30" },
    { title: "SEO for Beginners", category: "marketing", startTime: "2025-05-05T14:00", deadline: "2025-05-09T11:00" },
    { title: "React Framework Deep Dive", category: "development", startTime: "2025-05-07T08:30", deadline: "2025-05-10T18:00" },
    { title: "Color Theory 101", category: "design", startTime: "2025-05-06T13:00", deadline: "2025-05-10T15:00" },
    { title: "Email Campaign Tips", category: "marketing", startTime: "2025-05-08T09:00", deadline: "2025-05-11T12:00" },
    { title: "Database Optimization", category: "development", startTime: "2025-05-09T11:00", deadline: "2025-05-12T16:00" },
    { title: "UX Review Meeting", category: "design", startTime: "2025-05-09T10:00", deadline: "2025-05-09T11:00" },
    { title: "Social Media Audit", category: "marketing", startTime: "2025-05-10T15:00", deadline: "2025-05-13T15:30" }
  ];

  const searchInput = document.getElementById("searchInput");
  const categoryFilter = document.getElementById("categoryFilter");
  const searchButton = document.getElementById("searchButton");
  const resultsList = document.getElementById("resultsList");

  function renderResults(filteredData) {
    resultsList.innerHTML = "";

    if (filteredData.length === 0) {
      resultsList.innerHTML = "<p>No results found.</p>";
      return;
    }

    filteredData.forEach(item => {
      const start = new Date(item.startTime);
      const end = new Date(item.deadline);

      const div = document.createElement("div");
      div.classList.add("result-item");

      div.innerHTML = `
        <div>
          <strong>${item.title}</strong><br/>
          <span class="category">Category: ${item.category}</span><br/>
          <span class="datetime">Start: ${start.toLocaleString()}</span><br/>
          <span class="datetime">Deadline: ${end.toLocaleString()}</span>
        </div>
      `;
      resultsList.appendChild(div);
    });
  }

  function filterData() {
    const keyword = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;

    const filtered = data.filter(item => {
      const matchesKeyword = item.title.toLowerCase().includes(keyword);
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
      return matchesKeyword && matchesCategory;
    });

    renderResults(filtered);
  }

  renderResults(data);

  searchButton.addEventListener("click", filterData);
  searchInput.addEventListener("keypress", e => {
    if (e.key === "Enter") filterData();
  });
  categoryFilter.addEventListener("change", filterData);
});
