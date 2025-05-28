
import { FaMoneyBillWave, FaDollarSign } from "react-icons/fa";
import ErrorMessage from "../../../components/ErrorMessage.jsx";
import StatCard from "../../../components/Admin/StatCard.jsx";

const PaymentInsights = ({ data }) => {
  if (!data) {
    <ErrorMessage />;
  }
  const earnings = data.reduce((acc, item) => acc + (item.amount || 0), 0);

  return (
    <div className="grid grid-cols-2 gap-5">
      <StatCard
        title="Total Payments"
        value={data.length || 0}
        icon={<FaMoneyBillWave className="text-green-500" />}
      />
      <StatCard
        title="Total Earnings"
        value={`GHS ${earnings || 0}`}
        icon={<FaDollarSign className="text-yellow-500" />}
      />
    </div>
  );
};

export default PaymentInsights;
