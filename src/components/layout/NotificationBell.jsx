export default function NotificationBell() {
  const notifications = [
    "42 students owe fees",
    "PTA meeting tomorrow",
    "Results ready for SS2"
  ];

  return (
    <div
      className="
      absolute
      right-0
      top-12
      bg-white
      shadow-xl
      rounded-xl
      w-80
      p-4"
    >
      <h3 className="font-bold mb-3">
        Notifications
      </h3>

      {notifications.map((item, index) => (
        <div
          key={index}
          className="border-b py-2"
        >
          {item}
        </div>
      ))}
    </div>
  );
}