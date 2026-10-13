import { useState } from "react";

import {
  sendContactMessage
} from "../lib/api/api";

function Contact() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [status, setStatus] = useState("");

  const [sending, setSending] = useState(false);


  const handleSubmit = async (event) => {

    event.preventDefault();

    setStatus("");


    if (!name || !email || !message) {

      setStatus(
        "Please fill in all fields."
      );

      return;
    }


    setSending(true);


    const result =
      await sendContactMessage({
        name,
        email,
        message
      });


    setSending(false);


    if (
      result &&
      result.message ===
      "Message sent successfully"
    ) {

      setStatus(
        "Your message has been sent successfully."
      );

      setName("");
      setEmail("");
      setMessage("");

    } else {

      setStatus(
        result.message ||
        "Failed to send message."
      );

    }
  };


  return (
    <section
      id="contact"
      className="min-h-screen
      bg-gray-50
      py-24"
    >

      <div
        className="max-w-6xl
        mx-auto
        px-6"
      >

        <h2
          className="text-4xl
          md:text-5xl
          font-bold
          text-gray-900
          mb-4"
        >
          Contact Me
        </h2>


        <p
          className="text-gray-600
          text-lg
          mb-10"
        >
          Feel free to send me a message.
        </p>


        <div
          className="max-w-2xl
          bg-white
          rounded-xl
          shadow-sm
          border
          border-gray-200
          p-8"
        >

          <form
            onSubmit={handleSubmit}
          >

            {/* Name */}

            <div className="mb-6">

              <label
                className="block
                text-gray-700
                font-semibold
                mb-2"
              >
                Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
                placeholder="Enter your name"
                className="w-full
                border
                border-gray-300
                rounded-lg
                px-4
                py-3
                outline-none
                focus:border-blue-600"
              />

            </div>


            {/* Email */}

            <div className="mb-6">

              <label
                className="block
                text-gray-700
                font-semibold
                mb-2"
              >
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                placeholder="Enter your email"
                className="w-full
                border
                border-gray-300
                rounded-lg
                px-4
                py-3
                outline-none
                focus:border-blue-600"
              />

            </div>


            {/* Message */}

            <div className="mb-6">

              <label
                className="block
                text-gray-700
                font-semibold
                mb-2"
              >
                Message
              </label>

              <textarea
                value={message}
                onChange={(event) =>
                  setMessage(event.target.value)
                }
                placeholder="Enter your message"
                rows="6"
                className="w-full
                border
                border-gray-300
                rounded-lg
                px-4
                py-3
                outline-none
                resize-none
                focus:border-blue-600"
              />

            </div>


            {/* Button */}

            <button
              type="submit"
              disabled={sending}
              className="px-6
              py-3
              bg-blue-600
              text-white
              rounded-lg
              font-semibold
              hover:bg-blue-700
              transition
              disabled:opacity-50"
            >

              {sending
                ? "Sending..."
                : "Send Message"}

            </button>


            {/* Status */}

            {status && (
              <p
                className="mt-5
                text-gray-700
                font-medium"
              >
                {status}
              </p>
            )}

          </form>

        </div>

      </div>

    </section>
  );
}

export default Contact;