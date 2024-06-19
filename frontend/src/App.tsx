import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Layout/Header/Header";
import Footer from "./Layout/Footer/Footer";
import Layout from "./Layout/Layout";
import Navigation from "./Layout/partials/Navigation/Navigation";
import GetTicket from "./Pages/GetTicket/GetTicket";
import PaymentPage from "./Pages/PaymentPage/PaymentPage";
import AdminPanel from "./Pages/AdminPanel/AdminPanel";
import OpenBarrierToOut from "./Pages/OpenBarrierToOut/OpenBarrierToOut";

export const API_URL = "http://localhost:3001/api/tickets";

function App() {
  const header = (
    <Header>
      <Navigation />
    </Header>
  );

  const content = (
    <>
      <Routes>
        <Route path="/" element={<GetTicket />} />
        <Route path="/platnosc/:id" element={<PaymentPage />} />
        <Route path="/panel-admina" element={<AdminPanel />} />
        <Route path="/otworz-szlaban/:id" element={<OpenBarrierToOut />} />
      </Routes>
    </>
  );

  const footer = <Footer />;

  return (
    <Router>
      <Layout header={header} content={content} footer={footer} />
    </Router>
  );
}

export default App;
