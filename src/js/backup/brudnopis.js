const xs = [];
const ys = [];

async function chartIt() {
  const data = await getData();
  const ctx = document.getElementById("chart");

  new Chart(ctx, {
    type: "line",
    data: {
      labels: data.xs,
      datasets: [
        {
          label: "# of Votes",
          data: data.ys,
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: false,
        },
      },
    },
  });
}

async function getData() {
  const response = await fetch("/data.csv");
  const data = await response.text();
  // console.log(data);

  const table = data.split("\n").slice(1);
  table.forEach((row) => {
    const columns = row.split(",");
    const year = columns[0];
    xs.push(year);
    const temp = columns[1];
    ys.push(parseFloat(temp) + 14);
    console.log(year, temp);
  });
  return { xs, ys };
}

// getData();
chartIt();
