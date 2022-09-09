import { useState, ReactElement } from "react";
import DashboardNavbar from "../components/Navigation/DashboardNavbar";
import DashboardSidebar from "../components/Navigation/DashboardSidebar";

interface Props {
  children: any;
}

function DashboardLayout({ children }: Props): ReactElement {
  const [sidebarOpen, setSidebarOpen] = useState<any>(false);
  return (
    // <>

    //     <div className="relative h-screen flex overflow-hidden bg-gray-100">
    //         <div className="h-full">
    //             <DashboardSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
    //         </div>

    //         {/* // the body of the dashboard */}

    //         <div className="flex-1 overflow-auto focus:outline-none">
    //             <main className="flex-1 relative pb-8 z-0 overflow-y-auto">
    //                 {/* Page header */}
    //                 <DashboardNavbar setSidebarOpen={setSidebarOpen} />

    //                 {/* // the rest of the dashboard */}
    //                 {children}
    //             </main>
    //         </div>
    //     </div>
    // </>
    <main className="flex flex-col h-screen">
      <div className="flex flex-1 overflow-hidden bg-gray-100">
        <div className="flex">
          <DashboardSidebar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
        </div>
        <div className="flex flex-1 flex-col">
          <div className="flex w-full flex-col">
            <DashboardNavbar setSidebarOpen={setSidebarOpen} />
          </div>
          <div className="flex flex-1 bg-blue-300 overflow-y-auto paragraph px-4">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}

export default DashboardLayout;
