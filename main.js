let register;
let testH1 = document.querySelector(".test");
let timeAndGithubValue = document.querySelector(".test2");
let timeStamp = document.querySelector(".timestamp");

let btn = document.querySelector(".check-btn");

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./service_worker.js").then((reg) => {
    console.log(reg);
  });
}
btn.addEventListener("click", showNotification);

function showNotification() {
  console.log();

  setTimeout(() => {
    Notification.requestPermission(function (result) {
      if (result === "granted") {
        navigator.serviceWorker.ready.then((registration) => {
          registration.showNotification("Something from Statsperform", {
            body: "Notify me if you can",
            icon: "https://pbs.twimg.com/profile_images/1392386133032587264/R_8kcRAL_400x400.png",
          });
        });
      }
    });
  }, timeStamp.value * 1000);
}
// }

setInterval(async () => {
  await fetch("https://raw.githubusercontent.com/Deyso/test/master/try.json")
    .then((data) => data.json())
    .then((res) => {
      timeAndGithubValue.innerHTML = `${
        res.set
      } ${new Date().getMinutes()}:${new Date().getSeconds()}`;
      if (res.set === true) {
        if (Notification.permission === "granted") {
          showNotification();
        } else if (Notification.permission !== "denied") {
          Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
              showNotification();
            }
          });
        }
      }
    });
}, 3000);

// setInterval(() => {
//   let date = new Date();

//   testH1.innerHTML = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
// }, 3000);
