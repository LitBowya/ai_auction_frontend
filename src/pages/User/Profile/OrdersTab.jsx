import {Link} from "react-router-dom";
import {FiDownload, FiEye, FiClock, FiCalendar} from "react-icons/fi";
import {FaCediSign} from "react-icons/fa6";

const OrdersTab = ({orders}) => {
    const handleDownload = (url, title) => {
        if (!url) return;

        fetch(url)
            .then((response) => response.blob())
            .then((blob) => {
                const blobUrl = window.URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = blobUrl;
                link.setAttribute("download", `${title || "artwork"}.zip`);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
            .catch((error) => console.error("Download failed:", error));
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md max_width">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
                Your Orders
            </h2>

            {orders && orders.length > 0 ? (
                <div className="grid gap-6">
                    {orders.map((order) => {
                        const artwork = order?.auction?.artwork || {};
                        const imageUrl =
                            artwork.imageUrl?.[0]?.url || "/placeholder-art.jpg";
                        const title = artwork.title || "Untitled Artwork";
                        const artist = artwork.owner?.name || "Unknown Artist";
                        const zipUrl = artwork.pptxFile?.url;
                        const pin = artwork.pptxFile?.pin;
                        const orderDate = order.createdAt
                            ? new Date(order.createdAt).toLocaleDateString()
                            : "N/A";
                        const price = order.payment?.amount
                            ? Number(order.payment.amount).toFixed(2)
                            : "N/A";

                        return (
                            <div
                                key={order._id}
                                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                            >
                                <div className="flex flex-col md:flex-row gap-4">
                                    <div className="flex-shrink-0">
                                        <img
                                            src={imageUrl}
                                            alt={title}
                                            className="rounded-lg object-cover w-full h-[150px]"
                                        />
                                    </div>

                                    <div className="flex-grow">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-lg font-normal text-gray-800">
                                                    Order Id: {order._id}
                                                </h3>
                                                <h3 className="text-xl font-bold text-gray-800">
                                                    {title}
                                                </h3>
                                                <p className="text-gray-600">by {artist}</p>
                                            </div>
                                            <span
                                                className={`px-3 py-1 rounded-full text-sm font-medium ${
                                                    order.status === "shipped"
                                                        ? "bg-green-100 text-green-800"
                                                        : "bg-yellow-100 text-yellow-800"
                                                }`}
                                            >
                        {order.status || "Pending"}
                      </span>
                                        </div>

                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-sm">
                                            <div className="flex items-center text-gray-600">
                                                <FaCediSign className="mr-2"/>
                                                <span>Price: {price}</span>
                                            </div>
                                            <div className="flex items-center text-gray-600">
                                                <FiCalendar className="mr-2"/>
                                                <span>Ordered: {orderDate}</span>
                                            </div>
                                            <div className="flex items-center text-gray-600">
                                                <FiClock className="mr-2"/>
                                                <span>Delivery: Instant</span>
                                            </div>
                                        </div>

                                        {zipUrl && (
                                            <div className="mt-4">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="font-medium">Download:</span>
                                                    <button
                                                        onClick={() => handleDownload(zipUrl, title)}
                                                        className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm transition-colors cursor-pointer"
                                                    >
                                                        <FiDownload size={14}/>
                                                        Zip
                                                    </button>
                                                </div>
                                                <div className="bg-yellow-50 p-2 rounded-md text-sm">
                                                    <span className="font-medium">Unlock PIN:</span>
                                                    <span className="ml-2 font-mono bg-yellow-100 px-2 py-1 rounded">
                            {pin || "Not provided"}
                          </span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="text-center py-12">
                    <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <FiEye size={32} className="text-gray-400"/>
                    </div>
                    <h3 className="text-lg font-medium text-gray-700">No orders yet</h3>
                    <p className="text-gray-500 mt-1">
                        Your purchased artworks will appear here
                    </p>
                    <Link
                        to="/auctions"
                        className="mt-4 inline-block text-blue-600 hover:text-blue-800"
                    >
                        Browse auctions →
                    </Link>
                </div>
            )}
        </div>
    );
};

export default OrdersTab;
