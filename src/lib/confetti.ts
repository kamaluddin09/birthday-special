import confetti from "canvas-confetti";

export function triggerRomanticConfetti() {
  if (typeof window === "undefined") return;

  // Custom heart shape
  const heartShape = confetti.shapeFromPath({
    path: "M167 72c19,-38 37,-56 75,-56 42,0 76,33 76,75 0,76 -76,151 -151,227 -76,-76 -151,-151 -151,-227 0,-42 33,-75 75,-75 38,0 57,18 76,56z",
  });

  const colors = ["#FF4F8B", "#E91E63", "#E63946", "#FFB3C6", "#F9D976", "#FFFFFF"];

  // Side burst 1
  confetti({
    particleCount: 40,
    angle: 60,
    spread: 65,
    origin: { x: 0, y: 0.7 },
    colors,
    shapes: [heartShape, "circle"],
    scalar: 1.2,
  });

  // Side burst 2
  confetti({
    particleCount: 40,
    angle: 120,
    spread: 65,
    origin: { x: 1, y: 0.7 },
    colors,
    shapes: [heartShape, "circle"],
    scalar: 1.2,
  });

  // Center celebration fountain
  setTimeout(() => {
    confetti({
      particleCount: 50,
      spread: 100,
      origin: { y: 0.6 },
      colors,
      shapes: [heartShape, "circle"],
      scalar: 1.3,
    });
  }, 200);
}

export function triggerCandleBlowConfetti() {
  if (typeof window === "undefined") return;

  const heartShape = confetti.shapeFromPath({
    path: "M167 72c19,-38 37,-56 75,-56 42,0 76,33 76,75 0,76 -76,151 -151,227 -76,-76 -151,-151 -151,-227 0,-42 33,-75 75,-75 38,0 57,18 76,56z",
  });

  confetti({
    particleCount: 65,
    spread: 80,
    startVelocity: 45,
    origin: { x: 0.5, y: 0.5 },
    colors: ["#F9D976", "#FF4F8B", "#FFE4EF", "#FFF8F5", "#E63946"],
    shapes: [heartShape, "circle"],
    scalar: 1.2,
  });
}

export function triggerGrandFinaleConfetti() {
  if (typeof window === "undefined") return;

  const end = Date.now() + 2500;
  const colors = ["#FF4F8B", "#E63946", "#F9D976", "#FFE4EF", "#FFFFFF"];

  const interval = window.setInterval(() => {
    if (Date.now() > end) {
      clearInterval(interval);
      return;
    }

    confetti({
      startVelocity: 30,
      spread: 360,
      ticks: 60,
      origin: {
        x: Math.random(),
        y: Math.random() * 0.5 + 0.1,
      },
      colors,
      scalar: Math.random() * 0.8 + 0.6,
      shapes: ["circle"],
    });
  }, 250);
}
