<script>
  import Calendly from "$lib/components/Calendly.svelte";
  import LinkButton from "$lib/components/LinkButton.svelte";
  import { faBars } from "@fortawesome/free-solid-svg-icons";
  import Fa from "svelte-fa/src/fa.svelte";
  import DropdownLabel from "./DropdownLabel.svelte";
</script>

<style>
  nav {
    display: grid;

    grid-template-columns: 1fr repeat(4, auto) 1fr;
    grid-template-rows: 3em;

    justify-items: center;
    align-items: center;
    
    padding-left: var(--col-margin);
    padding-right: var(--col-margin);
    padding-bottom: 3em;
    padding-top: 0.5em;

    width: 100%;

    /* font-size: 1.3em; */
    font-weight: 500;
    color: var(--page-background);

    z-index: 1;
  }

  .burgerMenuContainer {
    display: contents;
  }

  .burgerMenuOpen {
    display: none;
    justify-self: flex-end;
    /* background-color: red; */
    line-height: 3em;
    padding-left: 2em;
    padding-right: 2em;
    transform: translateX(2em);
  }

  .menu {
    display: contents;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .logoLink {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    text-decoration: none;
  }
  
  .logo {
    height: 100%;
    max-height: 100%;
    max-width: 100%;
  }

  .logoText {
    padding-left: 0.5em;
    font-size: 1.75em;
    color: var(--grey-4);
    text-decoration: none;
  }

  .chat {
    justify-self: flex-end;
  }

  nav :global(.LinkButton) {
    --bgColor: rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 1199px) {
    nav {
      grid-template-columns: 1fr 1fr;
    }

    .burgerMenuContainer {
      display: contents;
    }

    .burgerMenuOpen {
      display: unset;
    }

    .menu {
      display: grid;
      grid-template-columns: auto;
      grid-template-rows: repeat(5, auto);
      justify-items: center;
      align-items: center;
      gap: 1em;

      position: absolute;
      top: 0;
      right: 0;

      max-width: 80vw;


      background-color: var(--blue-0);

      padding: 1em;
      box-sizing: content-box;

      border-color: var(--blue-1);
      border-left-style: solid;
      border-bottom-style: solid;
      border-bottom-left-radius: 1em;

      transform-origin: 0% 0%;
      transform: scaleY(0);
      transition: 200ms transform;
    }

    .burgerMenuContainer:focus-within .menu {
      transform: scaleY(100%);
    }

    nav :global(.LinkButton) {
      --bgColor: unset;
    }

    .chat {
      justify-self: unset;
    }

    li {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
    }
  }
</style>

<nav>
  <a class="logoLink" href="/">
    <img class="logo" src="/assets/logoWhite.svg" alt="Logo"/>
    <span class="logoText">SW</span>
  </a>

  <div class="burgerMenuContainer">
    <span tabindex="0" class="burgerMenuOpen">
      <Fa icon={faBars} />
    </span>

    <ul class="menu">
      <li>
        <DropdownLabel
          topEntry={{label: "Blog", link: "/"}}
        />
      </li>

      <li>
        <DropdownLabel
          topEntry={{label: "CV", link: "/assets/cv.pdf"}}
        />
      </li>

      <li>
        <DropdownLabel
          topEntry={{label: "Socials"}}
          menuEntries={[
            { label: "Twitter", link: "https://twitter.com/SteWaterman/" },
            { label: "GitHub", link: "https://github.com/StevenWaterman/", },
            { label: "LinkedIn", link: "https://www.linkedin.com/in/steven-waterman/" },
            { label: "Twitch", link: "https://twitch.tv/SteWaterman/" },
            { label: "Email", link: "mailto:website@stevenwaterman.uk" },
            { label: "Calendly", link: "https://calendly.com/stewaterman/30min" },
          ]}
        />
      </li>
      
      <li>
        <DropdownLabel
          topEntry={{label: "Projects", link: "/#community"}}
          menuEntries={[
            {label: "Lexoral", link: "https://lexoral.com"},
            {label: "MuseTree", link: "https://stevenwaterman.uk/musetree/"},
            {label: "No Time to Stalk", link: "https://stevenwaterman.uk/NoTimeToStalk"},
            {label: "Narration.Studio", link: "https://github.com/stevenwaterman/narration.studio"},
            {label: "Spiro", link:"https://stevenwaterman.uk/Spiro/"},
            {label: "Art", link:"https://linktr.ee/prevoid_art"},
            {label: "Music", link:"https://soundcloud.com/user-872603169"},
          ]}
        />
      </li>
      
      <li class="chat">
        <Calendly/>
      </li>
    </ul>
  </div>
</nav>