const list = document.querySelector("#starred");

fetch("events.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("events.json yüklenemedi");
    }
    return response.json();
  })
  .then((events) => {
    events.forEach((event) => {
      const item = document.createElement("li");
      const repository = document.createElement("a");
      const date = document.createElement("time");

      repository.href = `https://github.com/${event.name}`;
      repository.target = "_blank";
      repository.rel = "noreferrer";
      repository.textContent = event.name;
      date.dateTime = event.starred;
      date.textContent = new Date(`${event.starred}T00:00:00`).toLocaleDateString("tr-TR");

      item.append(repository, date);
      list.appendChild(item);
    });
  })
  .catch((error) => {
    const message = document.createElement("li");
    message.className = "message";
    message.textContent = error.message;
    list.appendChild(message);
  });
