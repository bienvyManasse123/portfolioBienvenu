// WaveDivider — vraie vague ondulée animée entre deux sections
// La vague défile en continu grâce à un path SVG dupliqué et une animation CSS
// colorFrom = fond de la section du haut
// colorTo   = fond de la section du bas (fill du SVG)
 
interface WaveDividerProps {
    colorFrom?: string
    colorTo?: string
    height?: number
    flip?: boolean
  }
   
  export default function WaveDivider({
    colorFrom = "#0d1117",
    colorTo = "#161b22",
    height = 80,
    flip = false,
  }: WaveDividerProps) {
    return (
      <div style={{
        background: colorFrom,
        lineHeight: 0,
        overflow: "hidden",
        // On double la hauteur pour que la vague soit bien visible
        height: height,
        position: "relative",
        transform: flip ? "scaleY(-1)" : "none",
      }}>
        {/* SVG vague animée
            Principe : le path est dessiné 2x (largeur 200%) et on le translate
            de 0% à -50% en boucle → effet de défilement continu */}
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "200%",       // double largeur pour l'animation
            height: "100%",
            // Animation de défilement horizontal
            animation: "waveScroll 8s linear infinite",
          }}
        >
          {/* Path de la vague — une sinusoïde douce sur 1440px puis répétée */}
          <path
            d="
              M0,40
              C120,70 240,10 360,40
              C480,70 600,10 720,40
              C840,70 960,10 1080,40
              C1200,70 1320,10 1440,40
              C1560,70 1680,10 1800,40
              C1920,70 2040,10 2160,40
              C2280,70 2400,10 2520,40
              C2640,70 2760,10 2880,40
              L2880,80 L0,80 Z
            "
            fill={colorTo}
          />
        </svg>
   
        {/* Style de l'animation injecté en inline pour éviter les conflits globals */}
        <style>{`
          @keyframes waveScroll {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </div>
    )
  }