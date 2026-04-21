import Balatro from "@/components/Balatro";
import Plasma from "@/components/Plasma";
import Lightning from "@/components/Lightning";
import Hyperspeed from "@/components/Hyperspeed";

export const SCENES = [
  {
    id: 1,
    title: "THE FIRST STRIKE",
    roman: "I",
    sub: "Precision over panic",
    desc: "Hesitation is death. Tanjiro's first true slash is a baptism of fire and water. Precision over panic. A single breath determines who walks away.",
    color: "sky",
    videoSrc: "/videos/tanjiro_slash.mp4",
    bg: <Balatro isRotate={false} mouseInteraction={true} pixelFilter={745} color1="#DE443B" color2="#162325" color3="#006BB4" />,
    glow: "#0ea5e9",
  },
  {
    id: 2,
    title: "PRECISION OVER POWER",
    roman: "II",
    sub: "Awaken the slayer",
    desc: "Cornered beasts bite hardest. Awakening the true spirit of a slayer means transforming panic into unrelenting fury. Blood spills, but the attack never stops.",
    color: "red",
    videoSrc: "/videos/attack.mp4",
    bg: <Plasma color="#ff6b35" speed={0.6} direction="forward" scale={1.2} opacity={1} />,
    glow: "#d71f27",
  },
  {
    id: 3,
    title: "CONTROL THE FLOW",
    roman: "III",
    sub: "Absolute focus",
    desc: "A trance between absolute terror and lethal focus. Thunder Breathing strikes before the sound arrives. One perfected form, repeated a thousand times.",
    color: "yellow",
    videoSrc: "/videos/genetuse_fan_moment.mp4",
    bg: <Lightning hue={55} xOffset={0} speed={1.5} intensity={1.5} size={1} />,
    glow: "#facc15",
  },
  {
    id: 4,
    title: "EXECUTE WITH SPEED",
    roman: "IV",
    sub: "Unstoppable crusade",
    desc: "Beyond the blood, laughter echoes. The bonds forged in the darkest times transform a lonely path of vengeance into an unstoppable crusade.",
    color: "purple",
    videoSrc: "/videos/fan_moment.mp4",
    bg: (
      <Hyperspeed
        effectOptions={{
          distortion: "turbulentDistortion",
          length: 400,
          roadWidth: 12,
          islandWidth: 2,
          lanesPerRoad: 3,
          fov: 90,
          fovSpeedUp: 150,
          speedUp: 2,
          carLightsFade: 0.4,
          totalSideLightSticks: 20,
          lightPairsPerRoadWay: 40,
          shoulderLinesWidthPercentage: 0.05,
          brokenLinesWidthPercentage: 0.1,
          brokenLinesLengthPercentage: 0.5,
          lightStickWidth: [0.12, 0.5],
          lightStickHeight: [1.3, 1.7],
          movingAwaySpeed: [60, 80],
          movingCloserSpeed: [-120, -160],
          carLightsLength: [12, 80],
          carLightsRadius: [0.05, 0.14],
          carWidthPercentage: [0.3, 0.5],
          carShiftX: [-0.8, 0.8],
          carFloorSeparation: [0, 5],
          colors: {
            roadColor: 0x000000,
            islandColor: 0x111111,
            background: 0x000000,
            shoulderLines: 0xa855f7,
            brokenLines: 0xa855f7,
            leftCars: [0xd71f27, 0xa855f7, 0xffffff],
            rightCars: [0x0ea5e9, 0xfacc15, 0xa855f7],
            sticks: 0xa855f7,
          },
        }}
      />
    ),
    glow: "#a855f7",
  },
];
