import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

import ProtectedCustomer from "./pages/ProtectedCustomer";
import { FullPageLoader } from "./components/FullPageLoader";
import { PageNotFound } from "./pages/PageNotFound";
import HomePage from "./pages/HomePage";
import ScrollToTop from "./components/ScrollToTop";
import Meter from "./Meter";
import AdminSignIn from "./pages/AdminSignIn";
import ProtectedAdmin from "./pages/ProtectedAdmin";
import { useMap } from "./context/MapProvider";

const Map = lazy(() => import("./pages/Map"));
const SignInPage = lazy(() => import("./pages/SignInPage"));
const CustomerDetail = lazy(() => import("./pages/CustomerDetail"));
const Admin = lazy(() => import("./pages/Admin"));

function App() {
  const { adminPassword } = useMap();
  return (
    <Suspense fallback={<FullPageLoader />}>
      <ScrollToTop>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin_customer" element={<SignInPage />} />
          <Route
            path="/customerInfo"
            element={
              <ProtectedCustomer>
                <CustomerDetail />
              </ProtectedCustomer>
            }
          />
          <Route path="/signin_admin" element={<AdminSignIn />} />

          <Route
            path="/admin"
            element={
              <ProtectedAdmin>
                <Admin />
              </ProtectedAdmin>
            }
          />
          {[85974652, 73993753, 51746285, 18903649].includes(adminPassword) && (
            <Route path="/admin" element={<Admin />}>
              <Route
                index
                element={
                  <Meter
                    keep={true}
                    url={
                      "https://getpantry.cloud/apiv1/pantry/3b1cf39b-ed0e-4b07-94ce-8c14c403d365/basket/ne"
                    }
                  />
                }
              />
              <Route
                path="metered"
                element={
                  <Meter
                    keep={true}
                    url={
                      "https://getpantry.cloud/apiv1/pantry/3b1cf39b-ed0e-4b07-94ce-8c14c403d365/basket/ne"
                    }
                  />
                }
              />
              <Route
                path="unmetered"
                element={
                  <Meter
                    keep={false}
                    url={
                      "https://getpantry.cloud/apiv1/pantry/55562e85-634a-452a-8869-083dd6f47cd4/basket/unmeteredData"
                    }
                  />
                }
              />
              <Route
                path="non_access"
                element={
                  <Meter
                    keep={false}
                    url={
                      "https://getpantry.cloud/apiv1/pantry/6f738295-ab9b-4571-b3c8-b067cf11716a/basket/non_access"
                    }
                  />
                }
              />
            </Route>
          )}
          <Route path="/map" element={<Map />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </ScrollToTop>
    </Suspense>
  );
}

export default App;
