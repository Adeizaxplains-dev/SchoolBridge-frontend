import { useEffect, useState } from "react";
import axios from "axios";

import { API_BASE_URL } from "../../services/api";

const API = `${API_BASE_URL}/teacher`;

export default function TeacherMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const fetchMessages = async () => {
    try {
      const { data } = await axios.get(
        `${API}/messages`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessages(data.data || []);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">
          Messages
        </h1>

        <p className="text-gray-500">
          Messages from school administration.
        </p>

      </div>

      <div className="bg-white rounded-xl shadow">

        <div className="p-5 border-b">

          <h2 className="font-semibold">
            Recent Messages
          </h2>

        </div>

        {loading ? (

          <div className="p-6">
            Loading messages...
          </div>

        ) : messages.length === 0 ? (

          <div className="p-10 text-center text-gray-500">

            No messages available.

          </div>

        ) : (

          <div className="divide-y">

            {messages.map((message) => (

              <div
                key={message._id}
                className="p-5 hover:bg-gray-50 transition"
              >

                <div className="flex justify-between items-start">

                  <div>

                    <h3 className="font-semibold text-lg">

                      {message.subject}

                    </h3>

                    <p className="text-gray-600 mt-2 whitespace-pre-wrap">

                      {message.message}

                    </p>

                  </div>

                  <span className="text-sm text-gray-500">

                    {new Date(
                      message.createdAt
                    ).toLocaleDateString()}

                  </span>

                </div>

                {message.sender && (

                  <div className="mt-4 text-sm text-gray-500">

                    From:
                    {" "}
                    <span className="font-medium">

                      {message.sender.fullName ||
                        message.sender.name ||
                        "School Admin"}

                    </span>

                  </div>

                )}

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}