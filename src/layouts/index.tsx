import { Outlet } from 'umi';

export default function Layout() {
  return (
    <div className="w-screen">
      <Outlet />
    </div>
  );
}
