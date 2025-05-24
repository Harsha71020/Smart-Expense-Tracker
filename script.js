
let expenses = [];
let theme = "light";

function addExpense() {
    const desc = document.getElementById('desc').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const category = document.getElementById('category').value;
    if (desc && amount && category) {
        expenses.push({ desc, amount, category });
        renderChart();
        renderAlerts();
    }
}

function renderChart() {
    const ctx = document.getElementById('categoryChart').getContext('2d');
    const categoryMap = {};
    expenses.forEach(e => {
        categoryMap[e.category] = (categoryMap[e.category] || 0) + e.amount;
    });
    const categories = Object.keys(categoryMap);
    const data = Object.values(categoryMap);

    if (window.expenseChart) window.expenseChart.destroy();
    window.expenseChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: categories,
            datasets: [{
                label: 'Spending by Category',
                data: data,
                backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0']
            }]
        }
    });
}

function renderAlerts() {
    const alertBox = document.getElementById("alerts");
    alertBox.innerHTML = "";
    const categoryMap = {};
    expenses.forEach(e => {
        categoryMap[e.category] = (categoryMap[e.category] || 0) + e.amount;
    });

    for (let category in categoryMap) {
        if (categoryMap[category] > 100) {
            const div = document.createElement("div");
            div.className = "col-md-4";
            div.innerHTML = `<div class="card text-white bg-danger p-3">⚠️ High spending on ${category} ($${categoryMap[category]})</div>`;
            alertBox.appendChild(div);
        }
    }
}

function toggleTheme() {
    const html = document.documentElement;
    theme = theme === "light" ? "dark" : "light";
    html.setAttribute("data-theme", theme);
    document.body.className = theme === "dark" ? "bg-dark text-light" : "";
}
