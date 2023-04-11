import { useEffect } from "react";

function Animation({isDarkMode}) {
  useEffect(() => {
    const animationContainer = document.querySelectorAll(".animationContainer li");
    const contentContainers = document.querySelectorAll("div");

    animationContainer.forEach((container) => {
      const randomDelay = Math.floor(Math.random() * 25) + 1;
      const randomLeft = Math.floor(Math.random() * 100) + 1;
      const randomHeight = Math.floor(Math.random() * 100) + 1;
      const randomDuration = Math.floor(Math.random() * 30) + 1;
      container.style.animationDelay = `${randomDelay}s`;
      container.style.left = `${randomLeft}%`;
      container.style.height = `${randomHeight}px`;
      container.style.width = `${randomHeight}px`;
      container.style.animationDuration = `${randomDuration}s`;
    });

    if (isDarkMode) {
      animationContainer.forEach((container) => container.classList.add("darkMode"));
      contentContainers.forEach((container) => container.classList.add("darkmode"));
    } else {
      animationContainer.forEach((container) => container.classList.remove("darkMode"));
      contentContainers.forEach((container) => container.classList.remove("darkmode"));
    }
  }, []);

  return (
    <ul className="animationContainer">
      <li className=""> </li>
      <li className=""> </li>
      <li className=""> </li>
      <li className=""> </li>
      <li className=""> </li>
      <li className=""> </li>
      <li className=""> </li>
      <li className=""> </li>
      <li className=""> </li>
      <li className=""> </li>
      <li className=""> </li>
      <li className=""> </li>
      <li className=""> </li>
      <li className=""> </li>
      <li className=""> </li>
      <li className=""> </li>
      <li className=""> </li>
      <li className=""> </li>
      <li className=""> </li>
      <li className=""> </li>
      <li className=""> </li>
      <li className=""> </li>
      <li className=""> </li>
      <li className=""> </li>
      <li className=""> </li>
      <li className=""> </li>
      <li className=""> </li>
      <li className=""> </li>
      <li className=""> </li>
      <li className=""> </li>
      <li className=""> </li>
      <li className=""> </li>
      <li className=""> </li>
      <li className=""> </li>
      <li className=""> </li>
      <li className=""> </li>
    </ul>
  );
}

export default Animation;
