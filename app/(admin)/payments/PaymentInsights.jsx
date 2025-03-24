import Error from "@/components/Error";
import Card from "../components/Card";
import { FaMoneyBillWave, FaDollarSign } from "react-icons/fa";

const PaymentInsights = ({ data }) => {
  if (!data) {
    <Error />;
  }
  const earnings = data.reduce((acc, item) => acc + (item.amount || 0), 0);

  return (
    <div className="grid grid-cols-2 gap-5">
      <Card
        title="Total Payments"
        value={data.length || 0}
        icon={<FaMoneyBillWave className="text-green-500" />}
      />
      <Card
        title="Total Earnings"
        value={`GHS ${earnings || 0}`}
        icon={<FaDollarSign className="text-yellow-500" />}
      />
    </div>
  );
};

export default PaymentInsights;
