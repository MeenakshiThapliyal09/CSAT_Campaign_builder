import { NavLink, Outlet } from 'react-router-dom';
import MobilePreview from '../components/preview/MobilePreview';

function MainLayout() {
  return (
    <div className="app-shell">
      <aside className="app-shell__nav" aria-label="Primary navigation">
        <h1>CSAT Builder</h1>
        <nav>
          <NavLink
            to="/content"
            className={({ isActive }) =>
              isActive ? 'app-shell__nav-link app-shell__nav-link--active' : 'app-shell__nav-link'
            }
          >
            Content
          </NavLink>
          <NavLink
            to="/styling"
            className={({ isActive }) =>
              isActive ? 'app-shell__nav-link app-shell__nav-link--active' : 'app-shell__nav-link'
            }
          >
            Styling
          </NavLink>
        </nav>
      </aside>

      <main className="app-shell__content">
        <Outlet />
      </main>

      <aside className="app-shell__preview">
        <MobilePreview />
      </aside>
    </div>
  );
}

export default MainLayout;
