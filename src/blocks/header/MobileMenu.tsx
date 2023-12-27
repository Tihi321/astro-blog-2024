import { createSignal } from "solid-js";
import { styled } from "solid-styled-components";
import { HeaderSearch } from "./HeaderSearch";
import { getTheme, toggleTheme } from "../../utils/theme";

const Button = styled("button")`
  background: none;
  padding: 2px;
  border: 2px solid var(--primary);
  border-radius: 5px;
  cursor: pointer;
  display: flex;
`;

const MobileButton = styled("button")`
  background: none;
  padding: 2px;
  border: 2px solid var(--primary);
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const ThemeSwitch = styled("button")`
  background: var(--primary);
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  color: var(--focus);
  font-size: 16px;
  line-height: 1.2;
  font-weight: 700;
  flex: 1;
`;

const MenuSvg = styled("svg")`
  fill: none;
  stroke: var(--primary);
`;

const MobileSvg = styled("svg")`
  fill: none;
  stroke: var(--primary);
`;

const FixedContainer = styled("div")`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: var(--focus);
  color: var(--primary);

  a {
    color: var(--primary);
  }
`;

const MenuContent = styled("div")`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const Title = styled("div")`
  display: flex;
  justify-content: space-between;
  gap: 14px;
`;

const HeaderLinks = styled("div")`
  margin: 10px 0;
  font-size: 18px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  text-transform: uppercase;
`;

export const MobileMenu = () => {
  const [showMenu, setShowMenu] = createSignal<boolean>(false);

  return (
    <>
      <Button onClick={() => setShowMenu(true)} role="button" title="open menu">
        <MenuSvg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </MenuSvg>
      </Button>
      {showMenu() && (
        <FixedContainer>
          <MenuContent>
            <Title>
              <ThemeSwitch onClick={toggleTheme}>{getTheme()}</ThemeSwitch>
              <MobileButton onClick={() => setShowMenu(false)} role="button" title="close menu">
                <MobileSvg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </MobileSvg>
              </MobileButton>
            </Title>
            <HeaderLinks>
              <a href="/blog">Blog</a>
              <a href="/projects">Projects</a>
            </HeaderLinks>
            <HeaderSearch />
          </MenuContent>
        </FixedContainer>
      )}
    </>
  );
};
