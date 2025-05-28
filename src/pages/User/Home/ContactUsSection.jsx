import { useEffect, useRef, useState } from "react";
import { useSendMessageMutation } from "../../../redux/services/contactApi.js";
import InputField from "../../../components/InputField.jsx";
import { FaUser } from "react-icons/fa";
import { FaMessage, FaPaperPlane } from "react-icons/fa6";
import { FaReact } from "react-icons/fa";
import { toast } from "react-toastify";
import { Button } from "../../../components/Button.jsx";
import Spinner from "../../../components/Spinner.jsx";
import gsap from "gsap";

const ContactUsSection = () => {
  const [sendMessage, { isLoading }] = useSendMessageMutation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const reactIconRef = useRef(null);

  useEffect(() => {
    gsap.to(reactIconRef.current, {
      y: -20,
      rotateY: 360,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      duration: 3,
      transformOrigin: "center center",
      perspective: 800,
    });
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    try {
      await sendMessage(formData).unwrap();
      toast.success("Message sent successfully");
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };

  return (
    <section className="bg-primary py-24 lg:py-28">
      <div className="max-width">
        <h1 className="text-end text-secondary heading-4 font-bold mb-6">
          Contact Us
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Contact Form */}
          <div>
            <form
              onSubmit={handleSendMessage}
              className="bg-secondary p-6 rounded-xl shadow-xl space-y-4"
            >
              <InputField
                leftIcon={<FaUser className="text-white" />}
                label="Full Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="p-4 w-full rounded-lg border border-white bg-transparent text-white placeholder-white"
              />

              <InputField
                leftIcon={<FaMessage className="text-white" />}
                label="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="p-4 w-full rounded-lg border border-white bg-transparent text-white placeholder-white"
              />

              <textarea
                placeholder="Message"
                className="p-4 w-full rounded-lg border border-white bg-transparent text-white placeholder-white"
                rows={4}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              />

              {isLoading ? (
                <Spinner />
              ) : (
                <Button
                  type="submit"
                  className="bg-primary text-secondary w-full my-4"
                  iconLeft={<FaPaperPlane />}
                >
                  Send Message
                </Button>
              )}
            </form>
          </div>

          {/* Animated React Icon */}
          <div className="hidden md:flex justify-center items-center">
            <FaPaperPlane
              ref={reactIconRef}
              className="text-secondary drop-shadow-lg"
              size={200}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUsSection;
