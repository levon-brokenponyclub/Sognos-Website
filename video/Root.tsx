import { Composition, Still } from "remotion";
import { CareHero, FRAMES, FPS } from "./CareHero";

// SognosCare hero video — 10s, 30fps, silent loop. Desktop is the hero
// panel's 16:7; the mobile cut (16:10) comes once the desktop cut is signed
// off. The Still entries are review frames, one per scene.
export function Root() {
  return (
    <>
      <Composition
        id="CareHero"
        component={CareHero}
        durationInFrames={FRAMES}
        fps={FPS}
        width={1920}
        height={840}
      />
      <Still id="CareHeroFrame1" component={CareHero} width={1920} height={840} defaultProps={{ at: 36 }} />
      <Still id="CareHeroFrame2" component={CareHero} width={1920} height={840} defaultProps={{ at: 102 }} />
      <Still id="CareHeroFrame3" component={CareHero} width={1920} height={840} defaultProps={{ at: 160 }} />
      <Still id="CareHeroFrame4" component={CareHero} width={1920} height={840} defaultProps={{ at: 220 }} />
      <Still id="CareHeroFrame5" component={CareHero} width={1920} height={840} defaultProps={{ at: 262 }} />
      <Still id="CareHeroFrame6" component={CareHero} width={1920} height={840} defaultProps={{ at: 286 }} />
    </>
  );
}
