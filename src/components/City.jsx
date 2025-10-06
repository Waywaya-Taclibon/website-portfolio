import { ParallaxLayer } from "@react-spring/parallax";
import TextBlock from "./TextBlock";
import { ArrowDown } from "lucide-react";

function City() {
  return (
    <>
      {/* Sky - Extended to cover pages 0, 1, and 2 */}
      <ParallaxLayer offset={0} speed={0.5} factor={3.25}>
        <div className="animation_layer parallax" id="sky"></div>
      </ParallaxLayer>

      {/* Clouds - Page 0 */}
      <ParallaxLayer offset={0} speed={0.1} factor={1.75}>
        <div className="animation_layer parallax" id="cloud1"></div>
      </ParallaxLayer>

      <ParallaxLayer offset={0.3} speed={-0.1} factor={1}>
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-center">
          <span className="block opacity-0 animate-fade-in">Welcome!</span>
        </h2>
      </ParallaxLayer>

      <ParallaxLayer offset={0} speed={0.25} factor={1.75}>
        <div className="animation_layer parallax" id="cloud2"></div>
      </ParallaxLayer>

      {/* Header */}
      <ParallaxLayer offset={0.4} speed={-0.1} factor={1}>
        <h2 className="text-4xl md:text-2xl font-bold tracking-tight text-center">
          <span className="inline-block opacity-0 animate-fade-in-delay-1">
            Please&nbsp;
          </span>
          <span className="inline-block text-primary opacity-0 animate-fade-in-delay-2">
            Scroll&nbsp;
          </span>
          <span className="inline-block opacity-0 animate-fade-in-delay-3">
            Down
          </span>
        </h2>
        <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center opacity-0 animate-fade-in-delay-4">
          <div className="animate-bounce">
            <ArrowDown className="h-5 w-5 text-primary" />
          </div>
        </div>
      </ParallaxLayer>

      <ParallaxLayer offset={0} speed={0.7} factor={1.3}>
        <div className="animation_layer parallax" id="cloudmix"></div>
      </ParallaxLayer>

      <ParallaxLayer offset={0.9} speed={0.05} factor={1.5}>
        <div className="flex justify-center items-center h-screen">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-center">
            “Turning code into experiences that connect people.”
          </h2>
        </div>
      </ParallaxLayer>

      <ParallaxLayer offset={0.98} speed={0.05} factor={1.5}>
        <div className="flex justify-center items-center h-screen">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-right">
            - Sun Tzu
          </h2>
        </div>
      </ParallaxLayer>

      {/* City Layers - Starting at Page 1 */}
      <ParallaxLayer offset={1} speed={0.1} factor={1.58}>
        <div className="animation_layer parallax" id="city1"></div>
      </ParallaxLayer>

      <ParallaxLayer offset={1} speed={0.2} factor={1.58}>
        <div className="animation_layer parallax" id="city2"></div>
      </ParallaxLayer>

      <ParallaxLayer offset={1} speed={0.3} factor={1.58}>
        <div className="animation_layer parallax" id="city3"></div>
      </ParallaxLayer>

      <ParallaxLayer offset={2.35} speed={0.4}>
        <TextBlock />
      </ParallaxLayer>

      <ParallaxLayer offset={1} speed={0.4} factor={1.58}>
        <div className="animation_layer parallax" id="city4"></div>
      </ParallaxLayer>
    </>
  );
}

export default City;
