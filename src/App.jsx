import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./pages/ProtectedRoute";
import { FullPageLoader } from "./components/FullPageLoader";
import { PageNotFound } from "./pages/PageNotFound";

const Map = lazy(() => import("./pages/Map"));
const SignInPage = lazy(() => import("./pages/SignInPage"));


function App() {
  return (
    <Suspense fallback={<FullPageLoader />}>
      <Routes>
        <Route index path="/" element={<SignInPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="*" element={<PageNotFound/>} />
        <Route
          path="/map"
          element={
            <ProtectedRoute>
              <Map />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Suspense>
  );
}

export default App;
