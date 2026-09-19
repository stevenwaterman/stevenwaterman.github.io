<script lang="ts">
	import BlogPost from "$lib/blog/BlogPost.svelte";
import YoutubeEmbed from "$lib/blog/YoutubeEmbed.svelte";
</script>

<BlogPost id="introducing-sharpshot">
  <p>
    In a group of three, we wrote <a href="https://github.com/stevenwaterman/SharpShot/releases/tag/0.1">v0.1 of SharpShot</a> in 24 hours.
    The first commit was 2 hours after the hackathon started, and by hour 5 it was fully usable - which I know thanks to a commit optimistically titled "<a href="https://github.com/stevenwaterman/SharpShot/commit/158d76c4ee01c7ccc2c50a855bb216d669a1361e">Hackathon done!</a>" at 4:45pm.
  </p>

  <p>
    The remaining 17 hours contained more playing with the program than developing it.
    It is incredibly addictive - when taking the Github screenshot I accidentally spent 5 hours playing around with it instead.
    SharpShot won the "Github prize for best developer tool", and placed second overall in the hackathon.
  </p>


  <h2>What is Sharpshot?</h2>

  <p>
    Sharpshot is a game where players attempt to solve a series of challenges by combining simple components.
    They place <em>nodes</em> on a rectangular grid known as a <em>board</em>.
    Its size is configurable by the user.
    Each node performs a pre-determined function on <em>bullets</em>, which carry data around the board.
    When a bullet leaves the board, it is written to the output.
    When two bullets collide, they annhilate each other, which is the main way of performing boolean logic!
  </p>

  <YoutubeEmbed code="rmkditieXoE"/>

  <p>
    A solution is scored on three metrics:
  </p>

  <ul>
    <li><em>Speed</em> - The total number of ticks taken for the test suite</li>
    <li><em>Cost</em> - Each node placed increases the cost, with more complex nodes costing more</li>
    <li><em>Size</em> - The total number of squares on the board</li>
  </ul>

  <p>
    Faster, cheaper, and smaller solutions are better.
    The solution will be given a percentile grading for each of these metrics, relative to all other players.
    It is almost impossible to optimise all three metrics at once, so most solutions will optimise for just one.
    To pass the level, a solution does not need to be optimal - it just has to pass the test suite.
  </p>

  <h2>Current State & Roadmap</h2>

  <p>
    The current version of the game does not have set levels and does not provide a score.
    It is still a sandbox while development continues.
    The core gameplay is quite stable and fun to play around with, which you can do by downloading it <a href="https://github.com/motherlymuppet/SharpShot/releases">via GitHub</a>.
  </p>

  <p>
    The game is currently in version 0.4.1, and there's a lot left to do before v1.0. In it's current state, the roadmap is as follows:
  </p>

  <ul>
    <li><strong>v0.5</strong> - Move, rotate, and delete large sections of a board. Save these extracts as components to allow for reuse.</li>
    <li><strong>v0.6</strong> - Create infrastructure for challenges, allowing boards to be ran against a test suite. Populate the game with levels in many categories of various difficulties.</li>
    <li><strong>v0.7</strong> - Add online component and accompanying server code to score solutions on the 3 metrics. Add leaderboards and ability to browse top solutions to each level.</li>
    <li><strong>v1.0</strong> - Graphical and sound overhaul. Increase general polish of game and make it look less like enterprise software.</li>
    <li><strong>v1.1</strong> - Support user-made levels.</li>
  </ul>

  <p>I'll let you know how that goes!</p>

  <p>If you have any suggestions or comments, definitely get in touch. PRs are always welcome, it's open-source for a reason!</p>
</BlogPost>
