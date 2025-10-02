import { ParallaxLayer } from "@react-spring/parallax";
import TextBlock from "./TextBlock";

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

      <ParallaxLayer offset={0} speed={0.25} factor={1.75}>
        <div className="animation_layer parallax" id="cloud2"></div>
      </ParallaxLayer>

      <ParallaxLayer offset={0} speed={0.70} factor={1.9}>
        <div className="animation_layer parallax" id="cloudmix"></div>
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

      <ParallaxLayer offset={2.3} speed={0.4}>
        <TextBlock />
      </ParallaxLayer>

      <ParallaxLayer offset={1} speed={0.4} factor={1.58}>
        <div className="animation_layer parallax" id="city4"></div>
      </ParallaxLayer>
    </>
  );
}

export default City;
