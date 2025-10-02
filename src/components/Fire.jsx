import { ParallaxLayer } from '@react-spring/parallax'
import '../App.css'

function Fire() {
  return (
    <>
      <ParallaxLayer offset={0} speed={0.25}>
        <div className="animation_layer parallax" id="artback"></div>
      </ParallaxLayer>
      <ParallaxLayer offset={0} speed={0.3}>
        <div className="animation_layer parallax" id="mountain"></div>
      </ParallaxLayer>
      <ParallaxLayer offset={0} speed={-0.1}>
        <div className="animation_layer parallax" id="logoland"></div>
      </ParallaxLayer>
      <ParallaxLayer offset={0} speed={0.3}>
        <div className="animation_layer parallax" id="jungle1"></div>
      </ParallaxLayer>
      <ParallaxLayer offset={0} speed={0.35}>
        <div className="animation_layer parallax" id="jungle2"></div>
      </ParallaxLayer>
      <ParallaxLayer offset={0} speed={0.5}>
        <div className="animation_layer parallax" id="jungle3"></div>
      </ParallaxLayer>
      <ParallaxLayer offset={0} speed={0.45}>
        <div className="animation_layer parallax" id="jungle4"></div>
      </ParallaxLayer>
      <ParallaxLayer offset={0} speed={0.40}>
        <div className="animation_layer parallax" id="manonmountain"></div>
      </ParallaxLayer>
      <ParallaxLayer offset={0} speed={0.35}>
        <div className="animation_layer parallax" id="jungle5"></div>
      </ParallaxLayer>
    </>
  )
}

export default Fire
