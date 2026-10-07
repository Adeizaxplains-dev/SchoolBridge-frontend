import { useEffect, useState } from "react";
import API from "../../../services/api";

export default function Messages() {
  const [messages, setMessages] =
    useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const user = JSON.parse(
        localStorage.getItem("user")
      );

      const res = await API.get(
        "/messages",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      setMessages(res.data.data || []);
    };

    fetchMessages();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        Messages & Notices
      </h1>

      {messages.length === 0 ? (
        <p>No messages</p>
      ) : (
        messages.map((m, i) => (
          <div
            key={i}
            className="p-4 bg-gray-100 mb-2 rounded"
          >
            <p>{m.message}</p>
            <small>
              {new Date(
                m.createdAt
              ).toDateString()}
            </small>
          </div>
        ))
      )}
    </div>
  );
}